/* ════════════════════════════════════════════════════════════════
   BLUE LAGUNE BURANO – Belegung & Preise
   Diese Datei ist die einzige Stelle, an der Preise und belegte
   Tage gepflegt werden. Buchungsseite UND KI-Concierge lesen sie.

   Bequemer: buchen.html?admin=1 öffnen → Tage antippen, Preise
   setzen → „belegung.js herunterladen“ → hier hochladen.
   ════════════════════════════════════════════════════════════════ */
window.BURANO_CONFIG = {

  unterkunft: {
    name: "Blue Lagune",
    ort: "Burano · Venezia",
    maxGaeste: 4,              // ← bitte prüfen
    schlafzimmer: null,        // z. B. 2  (null = wird nicht angezeigt)
    badezimmer: null,          // z. B. 1
    qm: null                   // z. B. 70
  },

  // false = auf der Seite steht „Vorläufige Preise – verbindliches Angebot von Marco“
  preiseBestaetigt: false,

  waehrung: "€",
  endreinigung: 60,            // € einmalig pro Aufenthalt ← bitte prüfen
  // Ortstaxe (imposta di soggiorno) wird separat vor Ort berechnet

  /* Saisons: Datum im Format MM-TT, gilt jedes Jahr.
     Die ERSTE passende Saison gewinnt – Sonderzeiten daher oben. */
  saisons: [
    { id: "haupt",  name: { de: "Hauptsaison",  it: "Alta stagione",  en: "High season",  fr: "Haute saison",    es: "Temporada alta"  }, von: "12-22", bis: "01-06", preis: 190, minNaechte: 5 },
    { id: "haupt",  name: { de: "Hauptsaison",  it: "Alta stagione",  en: "High season",  fr: "Haute saison",    es: "Temporada alta"  }, von: "06-01", bis: "09-15", preis: 180, minNaechte: 4 },
    { id: "zwisch", name: { de: "Zwischensaison", it: "Media stagione", en: "Mid season", fr: "Moyenne saison",  es: "Temporada media" }, von: "04-01", bis: "05-31", preis: 140, minNaechte: 3 },
    { id: "zwisch", name: { de: "Zwischensaison", it: "Media stagione", en: "Mid season", fr: "Moyenne saison",  es: "Temporada media" }, von: "09-16", bis: "10-31", preis: 140, minNaechte: 3 },
    { id: "neben",  name: { de: "Nebensaison",  it: "Bassa stagione", en: "Low season",   fr: "Basse saison",    es: "Temporada baja"  }, von: "01-01", bis: "12-31", preis: 110, minNaechte: 2 }
  ],

  // Freitag + Samstag Aufschlag in € pro Nacht (0 = aus)
  wochenendAufschlag: 15,

  // Einzelne Tage mit eigenem Preis (Karneval, Redentore, Regata Storica …)
  // Format "JJJJ-MM-TT": Preis
  sonderpreise: {
    "2026-12-31": 260
  },

  // Belegte Zeiträume: von = Anreisetag, bis = Abreisetag (Abreisetag ist wieder frei)
  belegt: [
    // { von: "2026-12-26", bis: "2027-01-02", notiz: "Familie M." }
  ],

  kontakt: {
    name: "Marco",
    whatsapp: "393774128760",  // ohne + und ohne 00
    telefon: "+39 377 412 8760",
    email: null                // optional: "marco@…"
  }
};
