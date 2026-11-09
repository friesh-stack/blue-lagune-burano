/*!
 * dv-voice.js – Sprachassistent für dünenvilla.de (OpenAI GPT-Live, wie ChatGPT Voice)
 * --------------------------------------------------------------------------------
 * Einbau: Datei neben die index.html ins Repo legen und direkt vor </body> einfügen:
 *     <script src="dv-voice.js"></script>
 * Der Baustein bringt Knopf, Fenster und Gestaltung selbst mit. Er liest beim Start
 * des Gesprächs die aktuellen Texte, Preise und – falls vorhanden – die Belegung
 * deiner Seite aus. Was du auf der Seite änderst, weiß der Assistent automatisch.
 */
(function () {
  "use strict";

  /* =========================== EINSTELLUNGEN =========================== */
  var CFG = {
    endpoint: "https://blue-lagune-proxy.friesh.workers.dev/live",
    brand: "Dünenvilla & Strandvilla Thiessow",
    greeting: "Moin und herzlich willkommen bei der Dünenvilla und Strandvilla in Thiessow! Wie kann ich Ihnen helfen?",
    maxMinutes: 5,                // Gespräch endet automatisch (Kostenbremse, 0,05 $ pro Minute)
    formAnchor: "#anfrage",       // Sprungziel für den Knopf „Anfrageformular“ (wird sonst automatisch gesucht)
    skipSections: ["belegung"]    // Abschnitte, deren Text NICHT ausgelesen wird (Kalender ist zu lang)
  };

  /* Grundwissen – falls die Seite etwas anderes sagt, gilt die Seite. */
  var FACTS = [
    "GASTGEBER: Familie Fries, private Vermietung ohne Portalgebühren. Unterkünfte in Thiessow (Ostseebad Mönchgut, Rügen): Dünenvilla 3, Dünenvilla 5, Strandvilla 8a, Strandvilla 8b.",
    "LAGE: Die Dünenvilla liegt in erster Reihe hinter dem Küstenwald; der Weg zum Strand führt durch den Garten und den Dünenwald. Die Strandvillen 8a und 8b sind die beiden Hälften eines Doppelhauses in der Straße „Am Strandpark“ in Thiessow, ca. 100 m zum weißen Sandstrand.",
    "DÜNENVILLA 3: ca. 70 m², max. 4 Personen. Großer Wohnraum mit Ledercouch, Ledersesseln und Kaminofen, Schlafzimmer mit Doppelbett und eingebauter Wärmekabine (Infrarot), Bad, zweites Schlafzimmer oben über eine Treppe, überdachte Dachterrasse, Garten mit Grillkamin und Pavillon, in dem Hunde frei laufen dürfen, eigener Parkplatz (vom Parkplatz geht es durch den Garten zur Wohnung).",
    "DÜNENVILLA 5: ca. 46 m², max. 3 Personen.",
    "STRANDVILLA 8a und 8b: je ca. 170 m², spiegelgleiche Grundrisse, fast gleich eingerichtet. Je eigener Garten mit zwei Terrassen (Küchenterrasse und Wohnzimmerterrasse am ca. 30 m² großen Wohnraum), eigene Sauna für 6 Personen, Spitzboden mit ausziehbarem Bett (2 Schlafplätze), 2–3 Stellplätze. Strandvilla 8a: große Küche mit Küchenzeile und Geschirrspüler. Nur die Strandvilla 8b hat eine Wallbox zum Laden von E-Autos (22 kW), 8a nicht.",
    "PREISE PRO NACHT für 2 Personen (Nebensaison II / Nebensaison / Hauptsaison): Dünenvilla 3: 95 / 110 / 130 €. Dünenvilla 5: 85 / 95 / 110 €. Strandvilla 8a und 8b: je 165 / 195 / 220 €.",
    "SAISONZEITEN MIETE (je Nacht nach Datum): Nebensaison II = November bis April (außer rund um Feiertage und den Jahreswechsel). Nebensaison = 1.5.–15.6. und 15.9.–31.10. Hauptsaison = 16.6.–14.9., 23.12.–5.1. sowie rund um Feiertage (3 Tage vorher bis 1 Tag danach).",
    "NEBENKOSTEN: Weitere Person ab der 3. Person 5 € pro Nacht. Hund (max. 2) 5 € pro Nacht. Kinder bis 2 Jahre frei. Babybett & Hochstuhl 5 € einmalig. Wäschepaket (Bettwäsche + Handtücher) 25 € pro Person. Endreinigung: Dünenvilla 3 und 5 je 85 €, Strandvilla 8a und 8b je 180 €. Strandkorb am Hausstrand 12 € pro Tag oder 60 € pro Woche. Nachträgliche Geschirrreinigung 15 €.",
    "ZAHLUNG: 50 % Anzahlung bei Buchung, Restzahlung 7 Tage vor Anreise. Gäste können über das Anfrageformular auf der Seite anfragen und erhalten sofort ein unverbindliches Angebot; verbindlich ist die Buchung erst nach Bestätigung.",
    "KURABGABE OSTSEEBAD MÖNCHGUT 2026 pro Tag (An- und Abreisetag zählen je als ein Tag): Erwachsene 3,37 € (Hauptsaison) / 2,54 € (Nebensaison); Kinder 7–14 Jahre 1,69 € / 1,27 €; Kinder unter 7 frei; Schwerbehinderte ab 80 % 1,69 € / 1,27 €; Hund 1,00 €. Kurabgabe-Hauptsaison: 1.5.–31.10. und 20.12.–6.1. (andere Saisonzeiten als bei der Miete!). Die Kurabgabe ist nicht im Mietpreis enthalten. Gäste werden per Meldeschein angemeldet und erhalten ihre Kurkarte über den Gastgeber.",
    "KURKARTE – VORTEILE: Viele Veranstaltungen der Kurverwaltung sind mit Kurkarte kostenlos oder ermäßigt, z. B. geführte Natur- und Sagenwanderungen rund um Klein Zicker und die Sommerkonzerte „Mönchguter Lauschrausch“ am Hafen Thiessow. Tageskurkarten gibt es in der Kurverwaltung und an Automaten.",
    "KURVERWALTUNG MÖNCHGUT: Dorfstraße 4, Middelhagen, 18586 Ostseebad Mönchgut. Telefon 038308 66010. E-Mail info@ostseebad-moenchgut.de. Website ostseebad-moenchgut.de. Tourist-Information im Kursaal Thiessow, Hauptstraße 36, 18586 Thiessow.",
    "TERMINE: Mönchguter Adventszauber am 1. Adventswochenende, 28./29. November 2026. Rügenmarkt am Hafen Thiessow dienstags und donnerstags (Saison). Führungen im Rookhus in Göhren zu alten Mönchguter Bräuchen.",
    "REGION: Thiessow liegt ganz im Südosten Rügens auf der Halbinsel Mönchgut, UNESCO-Biosphärenreservat Südost-Rügen, Wasser auf drei Seiten (Ostsee und Greifswalder Bodden). Feiner weißer Sandstrand bis Göhren, bekanntes Kite- und Windsurfrevier, Lotsenberg mit Aussicht, Zickersche Berge mit Bakenberg, Hafen mit Fischräuchereien, Radwege nach Gager, Middelhagen, Göhren und Sellin. Anreise mit dem Auto über B96/B196 Richtung Mönchgut/Thiessow, Bus ab Sellin oder Bergen (RPNV)."
  ];
  /* ===================================================================== */

  var MAX_PAGE = 16000, MAX_KB = 29000;
  function clean(t) { return (t || "").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim(); }

  function readUnits() {
    var u = null;
    try { /* global UNITS */ u = typeof UNITS !== "undefined" ? UNITS : null; } catch (e) {}
    if (!u) u = window.UNITS || null;
    if (!Array.isArray(u)) return "";
    try {
      return JSON.stringify(u, function (k, v) {
        if (typeof v === "string" && (v.length > 400 || v.indexOf("data:") === 0)) return undefined;
        if (/^(img|imgs|photos|fotos|media|galerie|video)$/i.test(k)) return undefined;
        return v;
      }).slice(0, 6000);
    } catch (e) { return ""; }
  }
  function readBelegung() {
    var b = null;
    try { /* global BELEGT */ b = typeof BELEGT !== "undefined" ? BELEGT : null; } catch (e) {}
    if (!b) b = window.BELEGT || window.belegt || null;
    if (!b || typeof b !== "object") return "";
    try { var s = JSON.stringify(b); return s.length > 2 ? s.slice(0, 6000) : ""; } catch (e) { return ""; }
  }
  function readPage() {
    var parts = [], seen = [];
    var nodes = document.querySelectorAll("header, section, main > div, footer");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.closest(".dvv-root")) continue;
      if (CFG.skipSections.indexOf(n.id) >= 0) continue;
      if (seen.some(function (p) { return p.contains(n); })) continue;
      seen.push(n);
      var t = clean(n.innerText);
      if (t.length > 30) parts.push(t);
    }
    return parts.join("\n---\n").slice(0, MAX_PAGE);
  }

  function buildKB() {
    var today = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var kb = "HEUTE: " + today + ".\n\nGRUNDWISSEN:\n- " + FACTS.join("\n- ");
    var units = readUnits();
    if (units) kb += "\n\nDATEN DER UNTERKÜNFTE AUS DER SEITE (JSON, preise: off = Nebensaison II, ns = Nebensaison, hs = Hauptsaison):\n" + units;
    var bel = readBelegung();
    kb += bel ? "\n\nBELEGUNG AUS DER SEITE (JSON; belegte Nächte bzw. Zeiträume je Unterkunft):\n" + bel
              : "\n\nBELEGUNG: Liegt dem Assistenten nicht vor. Freie Termine zeigt der Belegungsplan auf der Seite; sonst bitte über das Anfrageformular anfragen. Nie behaupten, dass ein Termin sicher frei ist.";
    kb += "\n\nAKTUELLER TEXT DER WEBSEITE (hat Vorrang vor dem Grundwissen):\n" + readPage();
    return kb.slice(0, MAX_KB);
  }
  window.DV_VOICE = { config: CFG, facts: FACTS, buildKB: buildKB };

  /* ------------------------------- Gestaltung ------------------------------- */
  var css = "" +
    ".dvv-root{--dvv-a:var(--navy,#0f3550);--dvv-b:var(--teal,#2fa39a);--dvv-s:#f5efe4;font-family:inherit}" +
    ".dvv-fab{position:fixed;left:16px;bottom:max(16px,env(safe-area-inset-bottom));z-index:9998;display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:12px 18px;background:var(--dvv-a);color:#fff;font:600 15px/1.2 inherit;font-family:inherit;box-shadow:0 6px 18px rgba(0,0,0,.28);cursor:pointer}" +
    ".dvv-dot{width:9px;height:9px;border-radius:50%;background:#46d6c4;animation:dvvp 2s infinite}" +
    "@keyframes dvvp{0%{box-shadow:0 0 0 0 rgba(70,214,196,.7)}70%{box-shadow:0 0 0 10px rgba(70,214,196,0)}100%{box-shadow:0 0 0 0 rgba(70,214,196,0)}}" +
    "@media(max-width:420px){.dvv-fab .dvv-lbl{display:none}.dvv-fab{padding:14px 16px}}" +
    ".dvv-panel{position:fixed;left:12px;right:12px;bottom:12px;max-width:420px;max-height:min(640px,86vh);z-index:9999;background:#fff;color:#1d2a33;border-radius:20px;box-shadow:0 18px 50px rgba(5,20,30,.35);display:none;flex-direction:column;overflow:hidden;font-size:15px;line-height:1.45}" +
    ".dvv-panel.on{display:flex}@media(min-width:600px){.dvv-panel{left:20px;right:auto;width:400px;bottom:20px}}" +
    ".dvv-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:linear-gradient(135deg,#1b6f8f,var(--dvv-a));color:#fff}" +
    ".dvv-head small{display:block;color:#cfe3ec;font-size:12px}.dvv-x{background:none;border:0;color:#fff;font-size:28px;cursor:pointer;line-height:1}" +
    ".dvv-orb{display:flex;justify-content:center;gap:6px;height:0;overflow:hidden;transition:height .3s;background:#f2f8fa}.dvv-orb.on{height:46px;align-items:center}" +
    ".dvv-orb span{width:8px;height:14px;border-radius:6px;background:var(--dvv-b);animation:dvvb 1s ease-in-out infinite}.dvv-orb span:nth-child(2){animation-delay:.15s}.dvv-orb span:nth-child(3){animation-delay:.3s}.dvv-orb.talk span{background:var(--dvv-a)}" +
    "@keyframes dvvb{50%{height:30px}}" +
    ".dvv-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;min-height:140px}" +
    ".dvv-msg{max-width:86%;padding:9px 13px;border-radius:14px;white-space:pre-wrap;overflow-wrap:break-word}" +
    ".dvv-msg.a{background:var(--dvv-s);align-self:flex-start;border-bottom-left-radius:4px}.dvv-msg.u{background:var(--dvv-b);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}" +
    ".dvv-msg.sys{align-self:center;background:none;color:#5d6b75;font-size:13px;text-align:center}" +
    ".dvv-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 8px}.dvv-chips small{width:100%;color:#5d6b75;font-size:12px}" +
    ".dvv-chips span{border:1px solid #cfe0e6;border-radius:999px;padding:5px 11px;font-size:13px;color:#1b6f8f}" +
    ".dvv-bar{display:flex;gap:8px;padding:10px 14px;border-top:1px solid #ebe2d2;flex-wrap:wrap}" +
    ".dvv-btn{border:0;border-radius:999px;padding:10px 16px;font:600 15px inherit;font-family:inherit;cursor:pointer;background:var(--dvv-b);color:#fff;text-decoration:none;display:inline-block}" +
    ".dvv-btn.stop{background:#c0533f}.dvv-btn.ghost{background:transparent;color:#1b6f8f;border:1.5px solid #1b6f8f}" +
    ".dvv-note{font-size:11.5px;color:#5d6b75;padding:0 14px 12px;margin:0}";

  var html = '' +
    '<button class="dvv-fab" id="dvvOpen" aria-label="Sprachassistent öffnen"><span class="dvv-dot"></span>🎙️ <span class="dvv-lbl">Fragen Sie uns</span></button>' +
    '<div class="dvv-panel" id="dvvPanel" role="dialog" aria-label="Sprachassistent">' +
      '<div class="dvv-head"><div><b>Ihr Dünenvilla-Assistent</b><small id="dvvStatus">Bereit – tippen Sie auf „Gespräch starten“</small></div><button class="dvv-x" id="dvvClose" aria-label="schließen">×</button></div>' +
      '<div class="dvv-orb" id="dvvOrb"><span></span><span></span><span></span></div>' +
      '<div class="dvv-log" id="dvvLog"><div class="dvv-msg a">Moin! Fragen Sie mich einfach nach Preisen, freien Terminen, der Lage der Dünenvilla und der Strandvillen, Hunden, Kurkarte oder der Kurverwaltung.</div></div>' +
      '<div class="dvv-chips" id="dvvChips"><small>Zum Beispiel:</small><span>„Was kostet die Strandvilla im Juli?“</span><span>„Wie weit ist es zum Strand?“</span><span>„Was kostet die Kurkarte?“</span></div>' +
      '<div class="dvv-bar"><button class="dvv-btn" id="dvvStart">🎙️ Gespräch starten</button><button class="dvv-btn stop" id="dvvStop" style="display:none">■ Beenden <span id="dvvTime"></span></button><a class="dvv-btn ghost" id="dvvForm" href="#">Anfrageformular</a></div>' +
      '<p class="dvv-note">Das Gespräch nutzt Ihr Mikrofon und wird über OpenAI verarbeitet. Auskünfte sind unverbindlich – verbindlich ist erst unsere Buchungsbestätigung.</p>' +
    '</div><audio id="dvvAudio" autoplay playsinline></audio>';

  function mount() {
    if (document.getElementById("dvvOpen")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var root = document.createElement("div"); root.className = "dvv-root"; root.innerHTML = html; document.body.appendChild(root);
    wire();
  }

  /* ------------------------------- Ablauf ------------------------------- */
  function wire() {
    var $ = function (id) { return document.getElementById(id); };
    var panel = $("dvvPanel"), log = $("dvvLog"), orb = $("dvvOrb");
    var pc = null, dc = null, stream = null, timer = null, t0 = 0, lastRole = null, lastEl = null;

    function formTarget() {
      var sel = [CFG.formAnchor, "#anfrage", "#buchen", "#buchung", "#kontakt", "form"];
      for (var i = 0; i < sel.length; i++) { try { var el = document.querySelector(sel[i]); if (el) return el; } catch (e) {} }
      return null;
    }
    function say(role, text) {
      if (role === lastRole && lastEl && role !== "sys") lastEl.textContent += text;
      else { lastEl = document.createElement("div"); lastEl.className = "dvv-msg " + role; lastEl.textContent = text; log.appendChild(lastEl); lastRole = role; }
      log.scrollTop = log.scrollHeight;
    }
    function status(t) { $("dvvStatus").textContent = t; }
    function ui(on) {
      $("dvvStart").style.display = on ? "none" : ""; $("dvvStop").style.display = on ? "" : "none";
      $("dvvChips").style.display = on ? "none" : ""; orb.classList.toggle("on", on);
    }
    $("dvvOpen").onclick = function () { panel.classList.add("on"); $("dvvOpen").style.display = "none"; };
    $("dvvClose").onclick = function () { stop(); panel.classList.remove("on"); $("dvvOpen").style.display = ""; };
    $("dvvForm").onclick = function (e) {
      e.preventDefault(); panel.classList.remove("on"); $("dvvOpen").style.display = "";
      var f = formTarget(); if (f) f.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    $("dvvStart").onclick = start;
    $("dvvStop").onclick = function () { stop("Gespräch beendet."); };

    function start() {
      if (!CFG.endpoint) { say("sys", "Hinweis für den Betreiber: Bitte in dv-voice.js unter endpoint die Adresse des Workers eintragen."); return; }
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.RTCPeerConnection) { say("sys", "Ihr Browser unterstützt leider keine Sprachgespräche. Bitte nutzen Sie das Anfrageformular."); return; }
      status("Mikrofon wird freigegeben …");
      navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } })
        .then(function (s) {
          stream = s; ui(true); status("Verbinde …");
          pc = new RTCPeerConnection();
          pc.ontrack = function (e) { $("dvvAudio").srcObject = e.streams[0]; };
          stream.getTracks().forEach(function (t) { pc.addTrack(t, stream); });
          dc = pc.createDataChannel("oai-events");
          dc.onmessage = function (e) { try { onEvent(JSON.parse(e.data)); } catch (_) {} };
          pc.onconnectionstatechange = function () { if (pc && (pc.connectionState === "failed" || pc.connectionState === "disconnected")) stop("Verbindung unterbrochen."); };
          return pc.createOffer();
        })
        .then(function (offer) { return pc.setLocalDescription(offer).then(function () { return offer; }); })
        .then(function (offer) {
          return fetch(CFG.endpoint, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sdp: offer.sdp, kb: buildKB(), greeting: CFG.greeting, brand: CFG.brand }) });
        })
        .then(function (r) { if (!r.ok) throw new Error("Server " + r.status); return r.json(); })
        .then(function (j) {
          if (!j.sdp) throw new Error(j.error || "keine Antwort");
          return pc.setRemoteDescription({ type: "answer", sdp: j.sdp });
        })
        .then(function () {
          t0 = Date.now();
          timer = setInterval(function () {
            var s = Math.floor((Date.now() - t0) / 1000), left = CFG.maxMinutes * 60 - s;
            $("dvvTime").textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
            if (left === 30) say("sys", "Noch 30 Sekunden – danach endet das Gespräch automatisch.");
            if (left <= 0) stop("Gespräch nach " + CFG.maxMinutes + " Minuten automatisch beendet. Für Ihre Buchung nutzen Sie gern das Anfrageformular.");
          }, 1000);
          status("Verbunden – sprechen Sie einfach los");
        })
        .catch(function (err) {
          if (window.console) console.error(err);
          stop(err && err.name === "NotAllowedError" ? "Ohne Mikrofon-Freigabe ist kein Gespräch möglich." : "Der Assistent ist gerade nicht erreichbar. Bitte nutzen Sie das Anfrageformular.");
        });
    }
    function onEvent(ev) {
      switch (ev.type) {
        case "session.started": status("Verbunden – sprechen Sie einfach los"); break;
        case "session.input_transcript.delta": say("u", ev.delta || ""); orb.classList.remove("talk"); break;
        case "session.output_transcript.delta": say("a", ev.delta || ""); orb.classList.add("talk"); status("Assistent spricht …"); break;
        case "session.delegation.created": status("Schaut nach …"); break;
        case "session.closed": stop(); break;
      }
    }
    function stop(msg) {
      try { if (dc && dc.readyState === "open") dc.send(JSON.stringify({ type: "session.close" })); } catch (_) {}
      var p = pc; setTimeout(function () { try { p && p.close(); } catch (_) {} }, 300); pc = null;
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; dc = null;
      clearInterval(timer); timer = null; $("dvvTime").textContent = "";
      ui(false); lastRole = null;
      if (msg) say("sys", msg);
      status("Bereit – tippen Sie auf „Gespräch starten“");
    }
    window.addEventListener("pagehide", function () { stop(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
