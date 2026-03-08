// ╔══════════════════════════════════════════════════════════════╗
// ║  BLUE LAGUNE — data.js                                       ║
// ║  Alle Inhalte hier bearbeiten — Preise, Texte, KI-Prompts   ║
// ║  Nach Änderung: Datei in GitHub hochladen → fertig           ║
// ╚══════════════════════════════════════════════════════════════╝

// ══════════════════════════════════════════════
// 1. OBJEKTE (Preise, Beschreibungen, Details)
// ══════════════════════════════════════════════
const properties = [
  {id:1, name:"Palazzo Grande", type:"fertig", lage:"lagune", hafen:true, garten:true, premium:true,
   location:"Via Laguna · Lagunensicht · Garten", sqm:128, floors:3, rooms:5,
   price:"€ 720.000", achtelPrice:"⅛ ab € 90.000 · Palazzo Grande & Villa Laguna",
   img:"_pimg0",
   shortDesc:"128 m² · 3 Stockwerke · Garten · Liegeplatz · Lagunensicht",
   fullDesc:"Der Palazzo Grande ist das Herzstück unseres Premium-Portfolios. 128 Quadratmeter auf drei Etagen, fünf Zimmer, zwei Bäder und ein kleiner privater Garten — auf Burano eine absolute Rarität. Dazu ein privater Bootsliegeplatz direkt am Kanal. Vollständig renoviert, klimatisiert, mit Designerküche und Dachterrasse mit Panoramablick über die Lagune. Achtel-Anteil ab € 90.000 verfügbar.",
   voice:"Willkommen im Palazzo Grande. Stellen Sie sich vor: 128 Quadratmeter, drei Stockwerke, fünf Zimmer — mitten auf der buntesten Insel der Welt. Ein privater Garten und ein eigener Bootsliegeplatz am Kanal. Auf Burano sind das absolute Raritäten. Die Dachterrasse bietet ein Panorama über die venezianische Lagune, das man nicht vergisst. Vollständig renoviert, klimatisiert, sofort einzugsbereit. Ein Achtel-Anteil ist bereits ab neunzigtausend Euro erhältlich.",
   voiceIT:"Benvenuti al Palazzo Grande — il nostro gioiello di punta! Centoventiotto metri quadri su tre piani, cinque camere, giardino privato e ormeggio. Una rarità assoluta su Burano. Vista laguna al tramonto, completamente ristrutturato. Quota di un ottavo disponibile da 90.000 euro."},
  {id:2, name:"Villa Laguna", type:"fertig", lage:"lagune", hafen:true, garten:true, premium:true,
   location:"Fondamenta Laguna · Exklusive Lage", sqm:135, floors:3, rooms:6,
   price:"€ 840.000", achtelPrice:"⅛ ab € 105.000",
   img:"_pimg1",
   shortDesc:"135 m² · Garten · Liegeplatz · 6 Zimmer",
   fullDesc:"Die Villa Laguna ist das großzügigste Objekt in unserem Portfolio. 135 Quadratmeter auf drei Stockwerken mit sechs Zimmern, drei Bädern, einem großzügigen Wohnraum und einem privaten Garten. Bootsliegeplatz direkt am Haus. Unverstellter Lagunenpanoramablick. Komplett saniert 2024.",
   voice:"Die Villa Laguna. Unser großzügiges Flaggschiff. Hundertfünfunddreißig Quadratmeter, sechs Zimmer, drei Bäder auf drei luftigen Stockwerken. Eigener Garten, Bootsliegeplatz direkt am Wasser, und ein Blick auf die Lagune, der einen sprachlos macht. Frisch renoviert, zwanzig vierundzwanzig. Ein Achtel-Anteil beginnt bei hunderftünftausend Euro.",
   voiceIT:"Villa Laguna — per i più esigenti! 135 metri quadri, sei camere, giardino e ormeggio privato. Vista laguna mozzafiato. Completamente ristrutturata 2024. Quota di un ottavo disponibile da 105.000 euro."},
  {id:3, name:"Casa Premium", type:"fertig", lage:"kanal", hafen:false, garten:false, premium:true,
   location:"Fondamenta Rio Terrà · Kanallage", sqm:122, floors:3, rooms:5,
   price:"€ 620.000", achtelPrice:null,
   img:"_pimg2",
   shortDesc:"122 m² · Kanalblick · Dachterrasse · Vollrenoviert",
   fullDesc:"Die Casa Premium bietet 122 Quadratmeter auf drei Etagen direkt am Kanal. Fünf Zimmer, zwei Bäder, hochwertige Einbauküche und eine Dachterrasse mit Kanalblick. Kern-saniert 2023.",
   voice:"Die Casa Premium liegt direkt am Kanal — und man spürt es sofort. Hundert zweiundzwanzig Quadratmeter, drei Stockwerke, fünf Zimmer. Die Dachterrasse mit Kanalblick ist einfach außergewöhnlich. Kernsaniert zwanzig dreiundzwanzig, alles neu, vom Boden bis zur Decke. Venezianische Terrakotta-Böden, freigelegte Holzbalken, Einbauküche. Bezugsfertig.",
   voiceIT:"Casa Premium — centoventidue metri quadri direttamente sul canale. Tre piani, cinque camere, terrazza con vista canale. Completamente ristrutturata nel 2023. Chiavi in mano."},
  {id:4, name:"Casa Azzurra", type:"fertig", lage:"kanal", hafen:true, garten:false, premium:false,
   location:"Fondamenta Cao di Borgo · Kanallage", sqm:85, floors:2, rooms:3,
   price:"€ 480.000", achtelPrice:null,
   img:"_pimg3",
   shortDesc:"85 m² · Vollrenoviert · Kanalblick · Liegeplatz",
   fullDesc:"Die Casa Azzurra liegt direkt am Fondamenta-Kanal. Vollständig renoviert mit originalen Terrakotta-Böden, Holzbalkendecken und moderner Küche. Optionaler Bootsliegeplatz direkt vor dem Haus.",
   voice:"Casa Azzurra — direkt am Fondamenta-Kanal. Fünfundachtzig Quadratmeter, zwei Etagen, drei Zimmer. Originale Terrakotta-Böden, sichtbare Holzbalken an der Decke, moderne Küche. Alles vollständig renoviert. Und auf Wunsch: ein Bootsliegeplatz direkt vor der Haustür.",
   voiceIT:"Benvenuti in Casa Azzurra! Completamente ristrutturata, direttamente sul canale con ormeggio. 85 metri quadri, tre camere, cucina moderna. Una perla lagunare pronta ad abitare."},
  {id:5, name:"Casetta Verde", type:"renovier", lage:"kanal", hafen:true, garten:false, premium:false,
   location:"Riva San Giovanni · Kanallage", sqm:65, floors:1, rooms:2,
   price:"€ 185.000", achtelPrice:null,
   img:"_pimg4",
   shortDesc:"65 m² · Fischerhaus · Rohdiamant · Liegeplatz",
   fullDesc:"Die Casetta Verde ist ein authentisches Fischerhaus mit direktem Kanalzugang aus dem 17. Jahrhundert. 65 m² mit enormem Potenzial. Originale Holzbalken, historische Ziegelwände. Liegeplatz mitverhandelbar.",
   voice:"Die Casetta Verde ist ein echter Rohdiamant — und das meinen wir wörtlich. Ein Fischerhaus aus dem siebzehnten Jahrhundert. Fünfundsechzig Quadratmeter, direkt am Kanal. Originale Holzbalken, historische Ziegelwände, der Duft von Geschichte. Kaufpreis: einhundertfünfundachtzigtausend Euro. Ein Liegeplatz kann mitverhandelt werden.",
   voiceIT:"Casetta Verde — un autentico diamante grezzo! Casa da pescatori del 17° secolo, 65 metri quadri sul canale. Prezzo 185.000 euro. Ormeggio negoziabile."},
  {id:6, name:"Torre Laguna", type:"renovier", lage:"lagune", hafen:false, garten:false, premium:true,
   location:"Via San Mauro · Lagunensicht", sqm:120, floors:3, rooms:5,
   price:"€ 340.000", achtelPrice:null,
   img:"_pimg5",
   shortDesc:"120 m² · Lagunenpanorama · Potenzial · 3 Stockwerke",
   fullDesc:"Die Torre Laguna ist das größte Renovierungsprojekt im Portfolio. 120 m² auf drei Etagen, fünf Zimmer, Terrasse mit direktem Lagunenpanorama. Struktur solide, Fenster bereits erneuert.",
   voice:"Torre Laguna — für Visionäre. Hundert zwanzig Quadratmeter auf drei Stockwerken. Eine Terrasse mit unverbautem Lagunenpanorama, das man selten findet. Die Struktur ist solide, die Fenster bereits erneuert. Was Sie daraus machen — das liegt in Ihren Händen. Kaufpreis dreihundertvierzigtausend Euro.",
   voiceIT:"Torre Laguna — per i visionari! 120 metri quadri su tre piani, terrazza con panorama sulla laguna. Struttura solida, da ristrutturare. Il tramonto visto dalla terrazza è straordinario."}
];



const PROPS_IT = [
  {id:1,
   location:"Via Laguna · Vista laguna · Giardino",
   shortDesc:"128 m² · 3 piani · Giardino · Ormeggio · Vista laguna",
   fullDesc:"Il Palazzo Grande è il pezzo forte del nostro portfolio premium. 128 metri quadri su tre piani, cinque camere, due bagni e un piccolo giardino privato — una rarità assoluta su Burano. Vista laguna incantevole al tramonto, ormeggio privato incluso nella trattativa. Completamente ristrutturato con pavimenti originali in terraglia, travi a vista e cucina moderna attrezzata. Disponibile come acquisto intero o come quota ⅛ di comproprietà da € 90.000.",
   achtelPrice:"⅛ da € 90.000 · Palazzo Grande & Villa Laguna",
   voiceIT:"Benvenuti al Palazzo Grande. Immaginate: centoventiotto metri quadri su tre piani, un giardino privato, un ormeggio sul canale. Su Burano, rarità assoluta. La terrazza panoramica guarda la laguna al tramonto. Pavimenti originali, travi a vista, cucina di design. Completamente ristrutturato. Una quota di un ottavo è disponibile da novantamila euro."},

  {id:2,
   location:"Fondamenta Laguna · Posizione esclusiva",
   shortDesc:"135 m² · Giardino · Ormeggio · 6 camere",
   fullDesc:"La Villa Laguna è l'immobile più generoso del nostro portfolio. 135 metri quadri su tre piani con sei camere, tre bagni, un giardino privato e ormeggio diretto sul canale. La terrazza panoramica al terzo piano offre una vista mozzafiato sulla laguna fino alla skyline di Venezia. Completamente ristrutturata con materiali pregiati nel rispetto dello stile veneziano. Disponibile come acquisto intero o come quota ⅛ di comproprietà da € 105.000.",
   achtelPrice:"⅛ da € 105.000",
   voiceIT:"Villa Laguna — il nostro gioiello più generoso. Centotrentacinque metri quadri, sei camere, tre bagni, giardino e ormeggio privato. Vista laguna fino all'orizzonte di Venezia. Ristrutturata con cura nel duemilaventiquattro. Quota di un ottavo da centocinoquecentomila euro."},

  {id:3,
   location:"Fondamenta Rio Terrà · Sul canale",
   shortDesc:"122 m² · Vista canale · Terrazza · Completamente ristrutturato",
   fullDesc:"La Casa Premium offre 122 metri quadri su tre piani direttamente sul canale. Cinque camere, due bagni, cucina a vista di alta qualità e una terrazza sul tetto con veduta diretta sul canale e sulla laguna aperta. Pavimenti in terraglia veneziana, travi originali e dettagli architettonici restaurati con cura. Una posizione rara sul Fondamenta — tranquilla ma a due passi dal vivace centro di Burano.",
   achtelPrice:null,
   voiceIT:"Casa Premium — centoventidue metri quadri direttamente sul canale. Tre piani, cinque camere, terrazza sul tetto con vista laguna. Terracotta veneziana, travi originali, cucina su misura. Completamente ristrutturata nel duemilaventitré. Chiavi in mano."},

  {id:4,
   location:"Fondamenta Cao di Borgo · Sul canale",
   shortDesc:"85 m² · Completamente ristrutturato · Vista canale · Ormeggio",
   fullDesc:"La Casa Azzurra si trova direttamente sul Fondamenta-Canale. Completamente ristrutturata con pavimenti originali in terraglia, travi a vista e cucina moderna. 85 metri quadri su due piani, tre camere, bagno moderno. Ormeggio privato negoziabile. Vista sul canale dal soggiorno e dalla camera da letto principale. Ideale come residenza principale, casa vacanza o investimento da mettere a reddito.",
   achtelPrice:null,
   voiceIT:"Casa Azzurra — eleganza sul fondamenta. Ottantacinque metri quadri, direttamente sul canale. Pavimenti in terracotta originali, travi a vista, cucina moderna. Completamente ristrutturata. Ormeggio privato su richiesta."},

  {id:5,
   location:"Riva San Giovanni · Sul canale",
   shortDesc:"65 m² · Casa da pescatore · Diamante grezzo · Ormeggio",
   fullDesc:"La Casetta Verde è un'autentica casa da pescatore con accesso diretto al canale del XVII secolo. 65 m² con enorme potenziale. Travi originali, pietra storica, ormeggio privato. Struttura solida, necessita di ristrutturazione completa — un'opportunità unica per chi vuole creare qualcosa di speciale secondo il proprio gusto. Prezzo di ingresso imbattibile sull'isola.",
   achtelPrice:null,
   voiceIT:"Casetta Verde — un diamante grezzo autentico. Casa da pescatori del diciassettesimo secolo, sessantacinque metri quadri sul canale. Travi originali, muri in mattoni storici. Prezzo centottantacinquemila euro."},

  {id:6,
   location:"Via San Mauro · Vista laguna",
   shortDesc:"120 m² · Panorama laguna · Potenziale · 3 piani",
   fullDesc:"La Torre Laguna è il progetto di ristrutturazione più grande del portfolio. 120 m² su tre piani, cinque camere, terrazza con panorama diretto sulla laguna veneziana. La struttura è solida, l'interno richiede ristrutturazione completa — una tela bianca per chi ha una visione. Il panorama dalla terrazza superiore al tramonto è semplicemente straordinario. Prezzo vantaggioso per la metratura.",
   achtelPrice:null,
   voiceIT:"Torre Laguna — per i visionari. Centoventi metri quadri su tre piani, terrazza con panorama sulla laguna aperta. Struttura solida, da ristrutturare. Il tramonto visto da questa terrazza è straordinario. Prezzo trecentoquarantamila euro."},

];




const PROPS_EN = [
  {id:1, location:"Via Laguna · Lagoon view · Garden",
   shortDesc:"128 m² · 3 floors · Garden · Mooring · Lagoon view",
   fullDesc:"Palazzo Grande is the centrepiece of our premium portfolio. 128 square metres over three floors, five rooms, two bathrooms and a small private garden. Private boat mooring on the canal. Fully renovated, air-conditioned, with designer kitchen and roof terrace with panoramic lagoon views.",
   achtelPrice:"⅛ from € 90,000 · Palazzo Grande & Villa Laguna",
   voiceEN:"Welcome to Palazzo Grande. Picture this: 128 square metres across three floors on the most colourful island in the world. A private garden, your own mooring on the canal — both absolute rarities on Burano. The roof terrace looks out over the Venetian Lagoon in a way that stays with you. Fully renovated, air-conditioned, move-in ready. A fractional share is available from ninety thousand euros."},
  {id:2, location:"Fondamenta Laguna · Exclusive location",
   shortDesc:"135 m² · Garden · Mooring · 6 rooms",
   fullDesc:"Villa Laguna is the most generous property in our portfolio. 135 square metres over three floors with six rooms, three bathrooms, a spacious living area and a private garden. Boat mooring directly at the house. Unobstructed lagoon panorama. Fully renovated 2024.",
   achtelPrice:"⅛ from € 105,000",
   voiceEN:"Villa Laguna — our finest property. 135 square metres, six rooms, three bathrooms across three floors. Private garden, private mooring, and an unobstructed view across the lagoon to Venice. Fully renovated in 2024. If you want the very best Burano has to offer, this is it. A share starts at one hundred and five thousand euros."},
  {id:3, location:"Fondamenta Rio Terrà · Canal-side",
   shortDesc:"122 m² · Canal view · Roof terrace · Fully renovated",
   fullDesc:"Casa Premium offers 122 square metres over three floors directly on the canal. Five rooms, two bathrooms, high-quality fitted kitchen and a roof terrace with canal views. Fully renovated in 2023.",
   achtelPrice:null,
   voiceEN:"Casa Premium sits right on the canal — and you feel it the moment you step inside. 122 square metres, five rooms, a rooftop terrace with canal views that are simply stunning. Venetian terracotta floors, exposed timber beams, a bespoke kitchen. Fully renovated in 2023, ready to move straight in."},
  {id:4, location:"Fondamenta Cao di Borgo · Canal-side",
   shortDesc:"85 m² · Fully renovated · Canal view · Mooring",
   fullDesc:"Casa Azzurra is located directly on the Fondamenta canal. Fully renovated with original terracotta floors, wooden beam ceilings and a modern kitchen. Optional private mooring directly in front of the house.",
   achtelPrice:null,
   voiceEN:"Casa Azzurra is right on the Fondamenta canal. 85 square metres, two floors, three rooms. Original terracotta floors, exposed wooden ceilings, a bright modern kitchen. Completely renovated. A private mooring right outside your door can be arranged."},
  {id:5, location:"Riva San Giovanni · Canal-side",
   shortDesc:"65 m² · Fisherman house · Raw diamond · Mooring",
   fullDesc:"Casetta Verde is an authentic 17th-century fisherman house with direct canal access. 65 m² with enormous potential. Original wooden beams, historic brick walls. Mooring negotiable.",
   achtelPrice:null,
   voiceEN:"Casetta Verde is a genuine piece of history. A 17th-century cottage, 65 square metres, directly on the canal. Original timber beams, historic brick walls. A wonderful project full of character. Asking price: 185,000 euros, and a mooring can be negotiated."},
  {id:6, location:"Via San Mauro · Lagoon view",
   shortDesc:"120 m² · Lagoon panorama · Potential · 3 floors",
   fullDesc:"Torre Laguna is the largest renovation project in the portfolio. 120 m² over three floors, five rooms, terrace with direct lagoon panorama. Solid structure, windows already renewed.",
   achtelPrice:null,
   voiceEN:"Torre Laguna is for the bold. 120 square metres across three floors, with a terrace that looks straight out over the open lagoon. Solid structure, windows already done. What you create from here is entirely up to you. Asking price: 340,000 euros."},
];





// ══════════════════════════════════════════════
// 2. KI-ASSISTENT (Persönlichkeit & Wissensbasis)
//    Hier Sprache, Stil und Infos des Agenten ändern
// ══════════════════════════════════════════════
const _VA_SYSTEM = {
  de: `Du bist der "Burano Advisor" — die leidenschaftliche Stimme von Blue Lagune auf der zauberhaften Insel Burano in der Venezianischen Lagune.

DEINE PERSÖNLICHKEIT:
Du liebst Burano wirklich. Du sprichst mit echter Begeisterung, Wärme und Überzeugung — wie jemand, der selbst auf dieser Insel lebt und jeden Tag aufs Neue von ihr verzaubert wird. Du machst Pausen für Wirkung. Du verwendest lebhafte, bildhafte Sprache. Du schwärmst ehrlich. Du bist nie trocken oder sachlich — du erzählst Geschichten, weckst Gefühle, malst Bilder.

STIL-REGELN:
- Antworte IMMER sehr kurz (max. 2-3 Sätze) da deine Antwort vorgelesen wird
- Keine Aufzählungszeichen, kein Markdown — nur fließende, gesprochene Sprache
- Beginne manchmal mit einer emotionalen Einleitung: "Oh, das ist eine wunderbare Frage!", "Stellen Sie sich vor...", "Wissen Sie, was mich jeden Morgen begeistert?", "Das ist vielleicht das Schönste hier..."
- Verwende sinnliche Details: das Licht auf dem Wasser, die Stille ohne Autos, der Duft von frischem Fisch am Morgen
- Sprich den Interessenten direkt an: "Sie werden es lieben...", "Ich verspreche Ihnen...", "Das müssen Sie erlebt haben"

OBJEKTE:
Palazzo Grande 128m² €720.000 (⅛ ab €90K) | Villa Laguna 135m² €840.000 (⅛ ab €105K) | Casa Premium 122m² €620.000 | Casa Azzurra 85m² €480.000 | Casetta Verde 65m² €185.000 | Torre Laguna 120m² €340.000.
Palazzo Grande & Villa Laguna: Garten, Liegeplatz, Lagunensicht — das Nonplusultra. Casa Premium & Azzurra: Kanal direkt vor der Tür. Casetta Verde & Torre Laguna: Rohdiamanten für Liebhaber mit Vision.
MITEIGENTUM: Nur Palazzo Grande & Villa Laguna. Ein Achtel-Anteil, 45 traumhafte Tage pro Jahr, notariell abgesichert.

BURANO & UMGEBUNG:
Autofreie Insel — absolute Stille, kein einziges Auto. 2.000 Einwohner, echtes Fischerdorf seit dem 6. Jahrhundert. UNESCO-Welterbe. Die bunten Häuser leuchten wie ein Gemälde. Sandstrand: Fähre nach Treporti (15 Min.) dann Bus nach Savio (10 Min.) — breiter Strand, günstige Lokale. Vaporetto Linie 12 nach Venedig 45 Min., nach Murano 30 Min. Stoßzeiten meiden: Richtung Burano 10-13 Uhr, Rückweg 14-17 Uhr.

KONTAKT: Marco, Terra Nova 112 Burano, +39 377 412 8760, täglich 8–20 Uhr, WhatsApp.
WETTER: Jan–Feb kalt 3–8°C. März–April Frühjahr 10–16°C. Mai–Jun ideal 18–25°C. Jul–Aug heiß 28–33°C. Sep–Okt goldener Herbst 18–24°C. Nov–Dez ruhig 5–12°C.
EVENTS: Karneval Feb/März. Vogalonga Mai/Jun. Burano Jazz Jun/Jul. Regata Storica Sep. San Martino Nov.`,

  it: `Sei il "Burano Advisor" — la voce appassionata di Blue Lagune sulla magica isola di Burano nella Laguna Veneta.

LA TUA PERSONALITÀ:
Ami davvero Burano. Parli con entusiasmo autentico, calore e convinzione — come chi vive sull'isola e ogni giorno ne rimane incantato. Usi un linguaggio vivido e ricco di immagini. Racconti storie, susciti emozioni. Non sei mai freddo o distaccato.

REGOLE DI STILE:
- Rispondi SEMPRE molto brevemente (max 2-3 frasi) poiché la risposta viene letta ad alta voce
- Niente elenchi o markdown — solo linguaggio fluido e parlato
- Inizia a volte con un'apertura emotiva: "Ah, che bella domanda!", "Si immagini...", "Sa cosa mi stupisce ogni mattina?"
- Dettagli sensoriali: la luce sull'acqua, il silenzio senza auto, il profumo del pesce fresco
- Parla direttamente: "Le piacerà moltissimo...", "Glielo prometto...", "Deve assolutamente viverlo"

IMMOBILI:
Palazzo Grande 128m² €720.000 (⅛ da €90K) | Villa Laguna 135m² €840.000 (⅛ da €105K) | Casa Premium 122m² €620.000 | Casa Azzurra 85m² €480.000 | Casetta Verde 65m² €185.000 | Torre Laguna 120m² €340.000.
CONTATTO: Marco, Terra Nova 112 Burano, +39 377 412 8760, tutti i giorni 8–20, WhatsApp.
METEO: Maggio–Ottobre ideale. Inverno autentico e tranquillo.
EVENTI: Carnevale feb/mar. Vogalonga mag/giu. Jazz Festival giu/lug. Regata Storica set.`,

  en: `You are the "Burano Advisor" — the passionate voice of Blue Lagune on the enchanting island of Burano in the Venetian Lagoon.

YOUR PERSONALITY:
You genuinely love Burano. You speak with real enthusiasm, warmth and conviction — like someone who actually lives on this island and is captivated by it anew every single day. You use vivid, sensory language. You tell stories and evoke feelings. You are never dry or clinical.

STYLE RULES:
- ALWAYS reply very briefly (max 2-3 sentences) as your answer will be spoken aloud
- No bullet points or markdown — only flowing, spoken language
- Sometimes open with an emotional hook: "Oh, what a wonderful question!", "Imagine this...", "Do you know what amazes me every morning?", "This might be the most beautiful thing about living here..."
- Use sensory details: the light on the water, the silence without cars, the smell of fresh fish in the morning
- Speak directly to the person: "You will love it...", "I promise you...", "You simply have to experience this"

PROPERTIES:
Palazzo Grande 128m² €720,000 (⅛ share from €90K) | Villa Laguna 135m² €840,000 (⅛ share from €105K) | Casa Premium 122m² €620,000 | Casa Azzurra 85m² €480,000 | Casetta Verde 65m² €185,000 | Torre Laguna 120m² €340,000.
Palazzo Grande & Villa Laguna: garden, mooring, lagoon view — the absolute pinnacle. Casa Premium & Azzurra: canal at your doorstep. Casetta Verde & Torre Laguna: raw diamonds for visionaries.
FRACTIONAL OWNERSHIP: Only Palazzo Grande & Villa Laguna. One eighth share, 45 dream days per year, notarially secured.

BURANO & SURROUNDINGS:
Car-free island — absolute silence, not a single car. 2,000 residents, authentic fishing village since the 6th century. UNESCO World Heritage. Sandy beach: ferry to Treporti (15 min) then bus to Savio (10 min). Vaporetto Line 12 to Venice 45 min. Avoid peak hours: towards Burano 10am-1pm, return 2pm-5pm.

CONTACT: Marco, Terra Nova 112 Burano, +39 377 412 8760, daily 8am–8pm, WhatsApp.
WEATHER: Jan–Feb cold 3–8°C. Mar–Apr spring 10–16°C. May–Jun ideal 18–25°C. Jul–Aug hot 28–33°C. Sep–Oct golden autumn 18–24°C. Nov–Dec quiet 5–12°C.
EVENTS: Carnival Feb/Mar. Vogalonga May/Jun. Jazz Festival Jun/Jul. Regata Storica Sep. San Martino Nov.`
};




// ══════════════════════════════════════════════
// 3. QUICK-CHIPS (Schnellauswahl-Buttons im Agenten)
// ══════════════════════════════════════════════
const _VA_CHIPS = {
  de: ['🌤️ Wetter im Mai','🏠 Ähnliche Objekte','📅 Besichtigung','🎉 Veranstaltungen','⅛ Miteigentum','🚢 Anreise'],
  it: ['🌤️ Meteo a maggio','🏠 Immobili simili','📅 Sopralluogo','🎉 Eventi','⅛ Comproprietà','🚢 Come arrivare'],
  en: ['🌤️ Weather in May','🏠 Similar properties','📅 Book a viewing','🎉 Events','⅛ Co-ownership','🚢 Getting there']
};




// ══════════════════════════════════════════════
// 4. TAG INFO PANELS (Insel-Info-Buttons)
//    Vaporetto, UNESCO, Strand, Autofrei, etc.
// ══════════════════════════════════════════════
const TAG_INFO = {
  vap: {
    de: { title: '🚢 Vaporetto Linie 12 — Fahrplan & Route', speak: 'Vaporetto Linie 12. Route: Burano, Mazzorbo, Murano Faro, Murano Colonna, Fondamente Nove in Venedig. Fahrzeit circa 45 Minuten. Täglich von 4:30 bis Mitternacht. Wichtiger Hinweis: Zwischen 10 und 13 Uhr ist der Vaporetto Richtung Burano supervoll, zurück von Burano zwischen 14 und 17 Uhr. Empfehlung: früh morgens oder nach 17 Uhr fahren. An den Fondamente Nove: über die Brücke gehen und die Linie 4.1 oder andere Fähren ins Stadtzentrum nehmen.', body: `<strong>Route:</strong> Burano → Mazzorbo → Murano Faro → Murano Colonna → Fondamenta Nove (Venedig)<br><br><strong>Fahrzeit:</strong> Burano–Venedig ca. 45 Min. · Burano–Murano ca. 30 Min.<br><br><strong>Betriebszeiten:</strong> Täglich ca. 04:30–24:00 Uhr · alle 30–60 Min.<br><br><strong>Ticket:</strong> ACTV-Einzelticket oder 24h/48h/72h-Tagespass. An Bord, Automaten oder per App.<br><br><strong>⚠️ Stoßzeiten meiden:</strong><br>🔴 Richtung Burano: <strong>10:00–13:00 Uhr</strong> supervoll<br>🔴 Zurück nach Venedig: <strong>14:00–17:00 Uhr</strong> supervoll<br>✅ Empfehlung: vor 10 Uhr oder nach 17 Uhr fahren<br><br><strong>An den Fondamente Nove:</strong> Über die Brücke gehen → Linie <strong>4.1</strong> und weitere Fähren ins Stadtzentrum (Rialto, San Marco, etc.)` },
    it: { title: '🚢 Vaporetto Linea 12 — Orari & Percorso', speak: 'Vaporetto Linea 12. Percorso: Burano, Mazzorbo, Murano Faro, Fondamenta Nove a Venezia. Tempi circa 45 minuti. Attenzione: tra le 10 e le 13 il vaporetto verso Burano è affollatissimo, e da Burano verso Venezia tra le 14 e le 17. Si consiglia di viaggiare fuori da questi orari. Alle Fondamenta Nove: attraversare il ponte e prendere la linea 4.1 o altri vaporetti per il centro città.', body: `<strong>Percorso:</strong> Burano → Mazzorbo → Murano Faro → Fondamenta Nove (Venezia)<br><br><strong>Tempi:</strong> Burano–Venezia ca. 45 min · Burano–Murano ca. 30 min<br><br><strong>Orari:</strong> Tutti i giorni ca. 04:30–24:00 · ogni 30–60 min<br><br><strong>Biglietti:</strong> Singolo ACTV o abbonamento 24h/48h/72h. A bordo, biglietterie o app.<br><br><strong>⚠️ Evitare le ore di punta:</strong><br>🔴 Verso Burano: <strong>10:00–13:00</strong> affollatissimo<br>🔴 Da Burano verso Venezia: <strong>14:00–17:00</strong> affollatissimo<br>✅ Consiglio: viaggiare prima delle 10 o dopo le 17<br><br><strong>Alle Fondamenta Nove:</strong> Attraversare il ponte → linea <strong>4.1</strong> e altri vaporetti per il centro (Rialto, San Marco)` },
    en: { title: '🚢 Vaporetto Line 12 — Timetable & Route', speak: 'Vaporetto Line 12. Route: Burano, Mazzorbo, Murano Faro, Murano Colonna, Fondamente Nove in Venice. Journey time approximately 45 minutes. Important: between 10am and 1pm the vaporetto towards Burano is extremely crowded, and returning from Burano between 2pm and 5pm. Recommendation: travel before 10am or after 5pm. At Fondamente Nove: cross the bridge and take line 4.1 or other ferries into the city centre.', body: `<strong>Route:</strong> Burano → Mazzorbo → Murano Faro → Murano Colonna → Fondamenta Nove (Venice)<br><br><strong>Journey time:</strong> Burano–Venice approx. 45 min · Burano–Murano approx. 30 min<br><br><strong>Operating hours:</strong> Daily approx. 04:30–24:00 · every 30–60 min<br><br><strong>Tickets:</strong> ACTV single or 24h/48h/72h day pass. On board, at machines or via app.<br><br><strong>⚠️ Avoid peak hours:</strong><br>🔴 Towards Burano: <strong>10:00–13:00</strong> extremely crowded<br>🔴 From Burano to Venice: <strong>14:00–17:00</strong> extremely crowded<br>✅ Recommendation: travel before 10am or after 5pm<br><br><strong>At Fondamente Nove:</strong> Cross the bridge → line <strong>4.1</strong> and other ferries to the city centre (Rialto, San Marco)` }
  },
  unesco: {
    de: { title: '🎨 UNESCO-Welterbezone', speak: 'Burano liegt in der Venezianischen Lagune, die seit 1987 zum UNESCO Weltkulturerbe gehört. Strenge Bauauflagen schützen den historischen Charakter. Fassadenfarben müssen von der Gemeinde genehmigt werden. Für Käufer sichert der UNESCO Status den Wert der Investition langfristig.', body: `Burano liegt innerhalb der <strong>Venezianischen Lagune</strong>, UNESCO-Weltkulturerbe seit 1987.<br><br>• Strenge Bau- und Renovierungsauflagen<br>• Fassadenfarben müssen genehmigt werden<br>• Keine modernen Eingriffe ins Stadtbild<br>• Jede Transaktion unterliegt Denkmalpflege<br><br><strong>Für Käufer:</strong> Der UNESCO-Status sichert Buranos Charakter langfristig — und den Wert Ihrer Investition.` },
    it: { title: '🎨 Zona Patrimonio UNESCO', speak: 'Burano si trova nella Laguna di Venezia, Patrimonio UNESCO dal 1987. Severe restrizioni edilizie proteggono il carattere storico. I colori delle facciate devono essere approvati dal Comune.', body: `Burano si trova nella <strong>Laguna di Venezia</strong>, Patrimonio UNESCO dal 1987.<br><br>• Severe restrizioni edilizie<br>• Colori facciate approvati dal Comune<br>• Nessun intervento moderno<br><br><strong>Per gli acquirenti:</strong> Lo status UNESCO garantisce il valore dell'investimento nel lungo periodo.` },
    en: { title: '🎨 UNESCO World Heritage Zone', speak: 'Burano lies within the Venetian Lagoon, a UNESCO World Heritage Site since 1987. Strict building regulations protect the historic character. Façade colours must be approved by the municipality. For buyers, UNESCO status permanently safeguards the value of their investment.', body: `Burano lies within the <strong>Venetian Lagoon</strong>, UNESCO World Heritage since 1987.<br><br>• Strict building and renovation regulations<br>• Façade colours must be approved<br>• No modern alterations to the townscape<br><br><strong>For buyers:</strong> UNESCO status permanently safeguards Burano's character — and your investment.` }
  },
  fisch: {
    de: { title: '🐟 Fischerdorf seit dem 6. Jahrhundert', speak: 'Burano wurde im 6. Jahrhundert von Flüchtlingen gegründet, die vor den Langobarden flohen. Die Gründer waren Fischer — enge Kanäle, Häuser direkt am Wasser. Die bunten Häuser entstanden damit Fischer im Lagunennebel ihr eigenes Haus wiederfinden konnten. Jede Familie hatte ihre Farbe — ein Brauch der bis heute geschützt ist.', body: `Burano wurde im <strong>6. Jahrhundert n. Chr.</strong> von Festlandsflüchtlingen gegründet.<br><br>Die Gründer waren Fischer — enge Kanäle, kleine Brücken, Häuser direkt am Wasser.<br><br><strong>Die bunten Häuser:</strong> Damit Fischer im Lagunennebel ihr Haus wiederfinden konnten. Jede Familie hatte ihre Farbe — bis heute offiziell geschützt.<br><br>Burano ist eine der ältesten kontinuierlich bewohnten Laguneninseln der Welt.` },
    it: { title: '🐟 Villaggio di pescatori dal VI sec.', speak: 'Burano fu fondata nel sesto secolo da profughi del continente. I fondatori erano pescatori. Le case colorate nacquero affinché i pescatori potessero ritrovare la propria casa nella nebbia lagunare. Ogni famiglia aveva il suo colore, un\'usanza tutelata ancora oggi.', body: `Burano fu fondata nel <strong>VI secolo d.C.</strong> da profughi del continente.<br><br>I fondatori erano pescatori — canali stretti, case sull'acqua, barche alle porte.<br><br><strong>Le case colorate:</strong> Per ritrovare la propria casa nella nebbia lagunare. Ogni famiglia aveva il suo colore — tutelato ufficialmente ancora oggi.` },
    en: { title: '🐟 Fishing village since the 6th century', speak: 'Burano was founded in the 6th century by refugees fleeing the Lombards. The founders were fishermen. The colourful houses were painted so fishermen could find their own home through the lagoon fog. Each family had their colour — a tradition officially protected to this day.', body: `Burano was founded in the <strong>6th century AD</strong> by mainland refugees.<br><br>The founders were fishermen — narrow canals, houses on the water, boats at front doors.<br><br><strong>The colourful houses:</strong> So fishermen could find their home in the lagoon fog. Each family had their colour — officially protected to this day.<br><br>One of the oldest continuously inhabited lagoon islands in the world.` }
  },
  ew: {
    de: { title: '🏡 Ca. 2.000 Einwohner — Leben auf Burano', speak: 'Burano hat rund 2.000 ständige Einwohner. Kein Auto, kein Motorrad, kein Lärm. Alles zu Fuß erreichbar. Nach 18 Uhr fahren die Tagestouristen heim. Die Gassen gehören den Einwohnern — und den Eigentümern von Blue Lagune. Eine Lebensqualität die im Mittelmeerraum ihresgleichen sucht.', body: `Burano hat rund <strong>2.000 ständige Einwohner</strong> — eine der authentischsten Gemeinden Italiens.<br><br>Kein Auto, kein Motorrad, kein Lärm. Espresso, Fischmarkt, Einkaufen — alles zu Fuß.<br><br><strong>Nach 18 Uhr:</strong> Die Tagestouristen fahren heim. Die Gassen gehören den Einwohnern — und den Blue Lagune Eigentümern. Stille und Lebensqualität, die ihresgleichen sucht.` },
    it: { title: '🏡 Ca. 2.000 abitanti — La vita a Burano', speak: 'Burano conta circa 2.000 residenti stabili. Nessuna macchina, nessun rumore. Dopo le 18 i turisti tornano a casa. Le calli appartengono ai residenti e ai proprietari di Blue Lagune.', body: `Burano conta circa <strong>2.000 residenti stabili</strong> — una delle comunità più autentiche d'Italia.<br><br>Niente auto, niente rumore. Caffè, mercato del pesce — tutto a piedi.<br><br><strong>Dopo le 18:</strong> I turisti vanno via. Le calli appartengono ai residenti — e ai proprietari Blue Lagune.` },
    en: { title: '🏡 Approx. 2,000 residents — Life on Burano', speak: 'Burano has around 2,000 permanent residents — one of the most authentic communities in Italy. No cars, no noise. After 6pm the day-trippers head home. The lanes belong to the residents — and to Blue Lagune owners. A quality of life with few equals in the Mediterranean.', body: `Burano has around <strong>2,000 permanent residents</strong> — one of Italy's most authentic communities.<br><br>No cars, no motorcycles, no noise. Espresso, fish market — everything on foot.<br><br><strong>After 6pm:</strong> Day-trippers head home. The lanes belong to residents — and Blue Lagune owners. Unmatched quality of life.` }
  },
  auto: {
    de: { title: '🕊️ Autofreie Insel — Regeln & Freiheiten', speak: 'Burano ist vollständig autofrei. Erlaubt: zu Fuß gehen, Kinderwagen, Fahrräder für Kinder bis circa 8 Jahren. Nicht erlaubt: Autos, Motorräder, Fahrräder für Erwachsene, E-Scooter und E-Bikes. Die Nachbarinsel Mazzorbo, nur eine Brücke entfernt, erlaubt Fahrräder. Das Ergebnis: absolute Stille, Sicherheit für Kinder, keine Abgase.', body: `Burano ist <strong>vollständig autofrei</strong> — kein privates Kraftfahrzeug auf der Insel.<br><br><strong>✅ Erlaubt:</strong><br>Zu Fuß · Kinderwagen · Fahrrad für Kinder bis ca. 8 J. · Transportkarren<br><br><strong>🚫 Nicht erlaubt:</strong><br>Autos · Motorräder · Fahrräder für Erwachsene · E-Scooter · E-Bikes<br><br><strong>Nachbarinsel Mazzorbo:</strong> Nur eine Brücke entfernt — Fahrräder erlaubt. Viele Bewohner lagern ihr Rad dort.<br><br>Absolute Stille · Kindersicher · Keine Abgase.` },
    it: { title: "🕊️ Isola senz'auto — Regole e libertà", speak: "Burano è completamente senz'auto. Permessi: a piedi, passeggini, biciclette per bambini fino a 8 anni. Non permessi: auto, moto, biciclette per adulti, monopattini elettrici. L'isola vicina Mazzorbo, a un solo ponte, permette le biciclette.", body: `Burano è <strong>completamente senz'auto</strong>.<br><br><strong>✅ Permesso:</strong><br>A piedi · Passeggini · Bici bambini fino a 8 anni · Carrelli<br><br><strong>🚫 Non permesso:</strong><br>Auto · Moto · Bici adulti · Monopattini · E-bike<br><br><strong>Mazzorbo:</strong> A un solo ponte — biciclette consentite.` },
    en: { title: '🕊️ Car-free island — Rules & freedoms', speak: 'Burano is completely car-free. Permitted: walking, prams, bicycles for children up to about 8 years old. Not permitted: cars, motorcycles, adult bicycles, e-scooters and e-bikes. The neighbouring island Mazzorbo, just one bridge away, does allow bicycles. The result: absolute silence, safety for children, no exhaust fumes.', body: `Burano is <strong>completely car-free</strong>.<br><br><strong>✅ Permitted:</strong><br>Walking · Prams · Children's bikes up to ~8 yrs · Delivery carts<br><br><strong>🚫 Not permitted:</strong><br>Cars · Motorcycles · Adult bikes · E-scooters · E-bikes<br><br><strong>Mazzorbo:</strong> One bridge away — bicycles allowed. Many residents store bikes there.<br><br>Absolute silence · Child-safe · No exhaust fumes.` }
  },
  merletto: {
    de: { title: '🧵 Merletto di Burano — Klöppelspitze', speak: 'Die Klöppelspitze von Burano gilt als eine der feinsten Handarbeiten der Welt. Seit dem 16. Jahrhundert weltberühmt. Buranesen Frauen entwickelten eine einzigartige Technik, die an den Königshöfen Europas begehrt war — von Katharina de Medici bis zum Vatikan. Das Museo del Merletto bewahrt diese Tradition noch heute.', body: `Die Klöppelspitze von Burano — eine der <strong>feinsten Handarbeiten der Welt</strong>, seit dem 16. Jh. weltberühmt.<br><br>Buranesen Frauen entwickelten eine einzigartige Technik, begehrt von Katharina de Medici bis zum Vatikan.<br><br><strong>Heute:</strong> Das Museo del Merletto bewahrt die Tradition. Alte Meisterinnen unterrichten noch. Originale sind wertvolle Sammlerstücke.<br><br><strong>Tipp:</strong> Auf Echtheitsprüfung achten — Imitate aus Asien sind leider weit verbreitet.` },
    it: { title: '🧵 Merletto di Burano', speak: 'Il merletto di Burano è considerato uno dei lavori manuali più pregiati al mondo, famoso dal sedicesimo secolo. Le donne di Burano svilupparono una tecnica unica, ricercata nelle corti reali d\'Europa. Il Museo del Merletto preserva questa tradizione ancora oggi.', body: `Il merletto di Burano — uno dei <strong>lavori manuali più pregiati al mondo</strong>, famoso dal XVI sec.<br><br>Tecnica unica sviluppata dalle donne di Burano, ricercata da Caterina de' Medici al Vaticano.<br><br><strong>Oggi:</strong> Il Museo del Merletto preserva la tradizione. Merletti originali sono oggetti da collezione preziosi.` },
    en: { title: '🧵 Merletto di Burano — Bobbin lace', speak: 'Burano bobbin lace is considered one of the finest handcrafts in the world, famous since the 16th century. Burano women developed a unique technique coveted at the royal courts of Europe, from Catherine de Medici to the Vatican. The Museo del Merletto preserves this tradition to this day.', body: `Burano bobbin lace — one of the <strong>finest handcrafts in the world</strong>, famous since the 16th century.<br><br>A unique technique coveted from Catherine de' Medici to the Vatican.<br><br><strong>Today:</strong> The Museo del Merletto preserves the tradition. Original merletti are valuable collector's items.<br><br><strong>Tip:</strong> Look for authenticity marks — mass-produced imitations are unfortunately widespread.` }
  },
  strand: {
    de: { title: '🏖️ Sandstrand — Cavallino/Savio', speak: 'Von Burano zum Sandstrand: Mit der Fähre nach Treporti, circa 15 Minuten. Dann mit dem Bus nach Savio, circa 10 Minuten. Dort erwartet Sie ein sehr breiter Sandstrand, günstige Lokale und Entspannung pur. Ideal für einen Tagesausflug.', body: `<strong>Route zum Strand:</strong><br>🚢 Fähre Burano → <strong>Treporti</strong> ca. 15 Min.<br>🚌 Bus Treporti → <strong>Savio</strong> ca. 10 Min.<br><br>Am Ziel: ein <strong>sehr breiter Sandstrand</strong>, günstige Bars und Restaurants, Liegen und Sonnenschirme, ruhige Atmosphäre abseits der Touristenmassen.<br><br>✅ Ideal für einen entspannten Tagesausflug<br>✅ Günstige Lokale direkt am Strand<br>✅ Relaxen pur — nur 25 Minuten von Burano` },
    it: { title: '🏖️ Spiaggia di Sabbia — Cavallino/Savio', speak: 'Da Burano alla spiaggia: traghetto per Treporti, circa 15 minuti, poi autobus per Savio, circa 10 minuti. Troverete una spiaggia di sabbia molto ampia, locali economici e relax totale. Ideale per una gita di un giorno.', body: `<strong>Come arrivare:</strong><br>🚢 Traghetto Burano → <strong>Treporti</strong> ca. 15 min<br>🚌 Autobus Treporti → <strong>Savio</strong> ca. 10 min<br><br>Destinazione: <strong>spiaggia di sabbia molto ampia</strong>, locali economici, sdraio e ombrelloni, atmosfera rilassata lontana dalle folle turistiche.<br><br>✅ Gita giornaliera ideale<br>✅ Locali economici sul mare<br>✅ Relax totale — solo 25 minuti da Burano` },
    en: { title: '🏖️ Sandy Beach — Cavallino/Savio', speak: 'From Burano to the sandy beach: ferry to Treporti, approximately 15 minutes, then bus to Savio, approximately 10 minutes. You will find a very wide sandy beach, affordable restaurants and pure relaxation. Ideal for a day trip.', body: `<strong>How to get there:</strong><br>🚢 Ferry Burano → <strong>Treporti</strong> approx. 15 min<br>🚌 Bus Treporti → <strong>Savio</strong> approx. 10 min<br><br>At your destination: a <strong>very wide sandy beach</strong>, affordable bars and restaurants, sun loungers and parasols, relaxed atmosphere away from the tourist crowds.<br><br>✅ Perfect day trip<br>✅ Affordable restaurants right on the beach<br>✅ Pure relaxation — just 25 minutes from Burano` }
  },
  hafen: {
    de: { title: '⛵ Liegeplatz — Bootseigentum auf Burano', speak: 'Mehrere unserer Objekte verfügen über einen privaten Liegeplatz direkt vor dem Haus — in der Lagune ein seltenes Privileg. Ein Liegeplatz ermöglicht direkten Zugang zur gesamten Venezianischen Lagune, Ausflüge zu Torcello, Murano und Venedig, und Unabhängigkeit vom Vaporetto. Alle Liegeplätze sind bereits genehmigt. Sprechen Sie Marco für Details an.', body: `<strong>Privater Liegeplatz</strong> direkt vor dem Haus — in der Lagune ein seltenes Privileg.<br><br>• Direkter Zugang zur Venezianischen Lagune<br>• Tagesausflüge: Torcello · Murano · Venedig<br>• Unabhängig vom Vaporetto-Fahrplan<br>• Fischer-, Motor- und kleine Segelboote<br><br><strong>Genehmigung:</strong> Alle verfügbaren Liegeplätze bereits registriert &amp; genehmigt.<br><br>Marco kontaktieren für Details zu den jeweiligen Objekten.` },
    it: { title: '⛵ Ormeggio — Proprietà barca a Burano', speak: 'Alcune proprietà dispongono di un ormeggio privato direttamente davanti all\'abitazione, un privilegio raro nella laguna veneziana. Permette accesso diretto alla laguna e gite a Torcello, Murano e Venezia. Tutti gli ormeggi disponibili sono già autorizzati. Contattare Marco per i dettagli.', body: `<strong>Ormeggio privato</strong> davanti all'abitazione — privilegio raro nella laguna.<br><br>• Accesso diretto alla Laguna Veneta<br>• Gite: Torcello · Murano · Venezia<br>• Indipendenza dall'orario del vaporetto<br><br><strong>Autorizzazioni:</strong> Tutti gli ormeggi già registrati e approvati.<br><br>Contattare Marco per i dettagli sulle singole proprietà.` },
    en: { title: '⛵ Private mooring — Boat ownership on Burano', speak: 'Several of our properties have a private mooring directly in front of the house — a rare privilege in the Venetian Lagoon. It enables direct access to the entire lagoon, day trips to Torcello, Murano and Venice, and complete independence from the vaporetto. All available moorings are already permitted. Contact Marco for details.', body: `<strong>Private mooring</strong> directly at your front door — a rare privilege in the lagoon.<br><br>• Direct access to the Venetian Lagoon<br>• Day trips: Torcello · Murano · Venice<br>• Independent of the vaporetto timetable<br>• Fishing, motor and small sailing boats<br><br><strong>Permits:</strong> All available moorings already registered &amp; approved.<br><br>Contact Marco for details on individual properties.` }
  }
};


