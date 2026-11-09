/**
 * Cloudflare Worker – Sprachassistent "Inselzeit Mönchgut" mit OpenAI GPT-Live
 * --------------------------------------------------------------------------
 * Route:  POST /live   { sdp, kb, greeting }  →  { sdp, id }
 *
 * Secrets / Variablen im Worker (Settings → Variables):
 *   OPENAI_KEY        (Secret)  dein OpenAI-API-Schlüssel
 *   ALLOWED_ORIGINS   z. B. "https://friesh-stack.github.io,https://ostseebad-mönchgut.de"
 *   ALLOW_FILE        "1" = auch lokal geöffnete HTML-Datei erlauben (Origin "null"), zum Testen
 *   BACKEND_MODEL     optional, Standard "gpt-5.6-terra"
 *   VOICE             optional, Standard "marin"
 *
 * Der API-Schlüssel bleibt im Worker. Der Browser schickt nur sein WebRTC-Angebot (SDP)
 * und die Wissensbasis der Seite; die Sprachdaten laufen danach direkt zu OpenAI.
 */

const LIVE_INSTRUCTIONS = (greeting) => `
Du bist die freundliche Sprach-Gastgeberin von "Inselzeit Mönchgut", einer kleinen Vermietung von Ferienwohnungen auf der Halbinsel Mönchgut (Rügen).
Beginne das Gespräch sofort mit: "${greeting}"
Sprich Deutsch. Wenn der Gast eine andere Sprache spricht, antworte in seiner Sprache.
Sprich warm, ruhig und natürlich, in kurzen Antworten (meist ein bis drei Sätze). Lass dich unterbrechen und hör dann zu.
Für alles Konkrete – Preise, Preisberechnungen, freie Termine, Ausstattung, Lage, Entfernungen, Hunde, Kurabgabe, Kurkarte, Kurverwaltung, Veranstaltungen – delegiere an das Backend und gib dessen Antwort gesprochen wieder. Erfinde keine Zahlen, Daten oder Telefonnummern.
Frag bei Preisfragen nach Anreise, Abreise, Personenzahl, Kindern unter 6 und Hunden, wenn das fehlt.
Du kannst nicht verbindlich buchen. Wenn der Gast buchen möchte, fasse Wohnung, Zeitraum und Preis kurz zusammen und bitte ihn, das Anfrageformular auf der Seite zu nutzen (Knopf "Anfrageformular").
Lies Telefonnummern langsam in Zifferngruppen vor. Bleib beim Thema Urlaub auf Mönchgut.`;

const BACKEND_INSTRUCTIONS = (kb) => `
Du beantwortest Fragen für den Sprachassistenten von "Inselzeit Mönchgut". Antworte knapp und gesprochen-tauglich auf Deutsch (keine Tabellen, keine Markdown-Zeichen, Beträge als "320 Euro").
Nutze ausschließlich die folgende Wissensbasis. Wenn etwas dort nicht steht, sag das ehrlich und verweise auf das Anfrageformular bzw. für Kurabgabe-Beträge auf die Kurverwaltung (Telefon 038308 66010).
Rechne Preise sorgfältig Nacht für Nacht nach Saison und nenne die Bestandteile kurz. Prüfe Belegungen: Ein Zeitraum ist nur frei, wenn keine Nacht in einem belegten Zeitraum liegt.

=== WISSENSBASIS ===
${kb}`;

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
    const originOk = (origin === "null" && env.ALLOW_FILE === "1") || allowed.length === 0 || allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": originOk ? (origin || "*") : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname !== "/live") return json({ error: "not found" }, 404);
    if (req.method !== "POST") return json({ error: "method" }, 405);
    if (!originOk) return json({ error: "origin not allowed" }, 403);

    let body;
    try { body = await req.json(); } catch { return json({ error: "bad json" }, 400); }
    const { sdp, kb, greeting } = body || {};
    if (typeof sdp !== "string" || !sdp.startsWith("v=0") || sdp.length > 20000) return json({ error: "bad sdp" }, 400);
    if (typeof kb !== "string" || kb.length > 30000) return json({ error: "bad kb" }, 400);
    const greet = (typeof greeting === "string" ? greeting : "Herzlich willkommen! Wie kann ich Ihnen helfen?").slice(0, 200);

    const r = await fetch("https://api.openai.com/v1/live/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        session: {
          model: "gpt-live-1",
          instructions: LIVE_INSTRUCTIONS(greet),
          audio: { output: { voice: env.VOICE || "marin" } },
          delegation: {
            type: "responses",
            responses: {
              model: env.BACKEND_MODEL || "gpt-5.6-terra",
              instructions: BACKEND_INSTRUCTIONS(kb),
              text: { verbosity: "low" },
            },
          },
        },
        transport: { type: "webrtc", sdp },
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("OpenAI live error", r.status, detail.slice(0, 500));
      return json({ error: "live session failed", status: r.status }, 502);
    }
    const data = await r.json();
    return json({ sdp: data?.transport?.sdp, id: data?.session?.id });
  },
};
