/* ==========================================================================
   Données produits — servent de graine (seed) pour Firestore.
   Si Firestore n'est pas configuré, l'app tourne quand même sur ces données
   locales : tu peux tester tout le site avant de brancher Firebase.

   Chaque produit n'a pas de "photo" figée : GRAMME. génère un visuel
   d'étiquette de labo propre à chaque référence (3 vues glissables :
   étiquette, fiche de dosage, tampon de lot). Tu pourras remplacer
   `renderSlide()` par de vraies photos plus tard (voir README).
   ========================================================================== */

export const SEED_PRODUCTS = [
  {
    id: "whey-isolate",
    name: "Whey Isolate 90",
    cat: "Protéine",
    tagline: "Isolat filtré à froid, 23g de protéines / dose, digestion rapide.",
    price: 39.90,
    stock: 42,
    maxStock: 60,
    servings: "30 doses",
    dosage: "25g / shaker 300ml",
    accent: "#C8FF3D",
    lot: "GR-WI90"
  },
  {
    id: "creatine-mono",
    name: "Créatine Monohydrate",
    cat: "Force",
    tagline: "Créapure, granulométrie fine, zéro additif, protocole simple.",
    price: 19.90,
    stock: 8,
    maxStock: 50,
    servings: "100 doses",
    dosage: "5g / jour",
    accent: "#8FD1FF",
    lot: "GR-CRM5"
  },
  {
    id: "bcaa-211",
    name: "BCAA 2:1:1",
    cat: "Récupération",
    tagline: "Leucine dominante, anti-catabolisme pendant l'effort.",
    price: 24.90,
    stock: 27,
    maxStock: 50,
    servings: "45 doses",
    dosage: "8g / entraînement",
    accent: "#FFC24B",
    lot: "GR-BC21"
  },
  {
    id: "pre-workout",
    name: "Pre-Workout Ignite",
    cat: "Énergie",
    tagline: "Caféine 200mg, citrulline, béta-alanine. Montée en 15 min.",
    price: 29.90,
    stock: 0,
    maxStock: 40,
    servings: "25 doses",
    dosage: "1 dose / séance",
    accent: "#FF6B6B",
    lot: "GR-PWI2"
  },
  {
    id: "omega-3",
    name: "Oméga-3 EPA/DHA",
    cat: "Santé",
    tagline: "Huile de poisson concentrée, capsules sans reflux.",
    price: 17.90,
    stock: 55,
    maxStock: 60,
    servings: "90 capsules",
    dosage: "2 capsules / jour",
    accent: "#7BE0C8",
    lot: "GR-OM3E"
  },
  {
    id: "mass-gainer",
    name: "Mass Gainer XL",
    cat: "Prise de masse",
    tagline: "750 kcal / dose, ratio glucides-protéines pensé pour la prise de masse propre.",
    price: 44.90,
    stock: 14,
    maxStock: 40,
    servings: "16 doses",
    dosage: "150g / shaker 500ml",
    accent: "#C8FF3D",
    lot: "GR-MGX7"
  },
  {
    id: "zma",
    name: "ZMA Nuit",
    cat: "Récupération",
    tagline: "Zinc, magnésium, B6 — sommeil profond et récupération hormonale.",
    price: 15.90,
    stock: 33,
    maxStock: 50,
    servings: "60 caps",
    dosage: "2 caps avant coucher",
    accent: "#B99CFF",
    lot: "GR-ZMA6"
  },
  {
    id: "collagene",
    name: "Collagène Marin",
    cat: "Articulations",
    tagline: "Peptides de collagène hydrolysé, soutien tendons et articulations.",
    price: 27.90,
    stock: 4,
    maxStock: 30,
    servings: "20 doses",
    dosage: "10g / jour",
    accent: "#FF9E6B",
    lot: "GR-COLM"
  }
];

/* Génère 3 visuels SVG par produit : étiquette / fiche dosage / tampon de lot */
export function productSlides(p){
  const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const label = `
    <svg viewBox="0 0 220 260" width="100%" height="100%">
      <rect x="6" y="6" width="208" height="248" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
      <rect x="6" y="6" width="208" height="46" fill="${p.accent}"/>
      <text x="18" y="34" font-family="Archivo Black, sans-serif" font-size="15" fill="#0B0B0C">GRAMME.</text>
      <line x1="6" y1="70" x2="214" y2="70" stroke="#2C2E31"/>
      <text x="18" y="100" font-family="Archivo Black, sans-serif" font-size="14" fill="#EDEAE2">${esc(p.name).toUpperCase()}</text>
      <text x="18" y="122" font-family="monospace" font-size="9" fill="#B9B6AC">${esc(p.cat)}</text>
      <text x="18" y="150" font-family="monospace" font-size="9" fill="#B9B6AC">${esc(p.dosage)}</text>
      <text x="18" y="166" font-family="monospace" font-size="9" fill="#B9B6AC">${esc(p.servings)}</text>
      <circle cx="188" cy="220" r="18" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
      <text x="188" y="224" font-family="monospace" font-size="8" fill="${p.accent}" text-anchor="middle">LOT</text>
    </svg>`;
  const spec = `
    <svg viewBox="0 0 220 260" width="100%" height="100%">
      <rect x="6" y="6" width="208" height="248" fill="none" stroke="#2C2E31" stroke-width="1.5"/>
      <text x="18" y="30" font-family="monospace" font-size="9" fill="${p.accent}">FICHE DE DOSAGE</text>
      <line x1="18" y1="40" x2="202" y2="40" stroke="#2C2E31"/>
      ${["Portion","Fréquence","Format","Réf. lot"].map((k,i)=>`
        <text x="18" y="${68+i*34}" font-family="monospace" font-size="8" fill="#B9B6AC">${k}</text>
        <text x="18" y="${68+i*34+14}" font-family="monospace" font-size="10" fill="#EDEAE2">${
          [p.dosage, "Quotidien", p.servings, p.lot][i]
        }</text>`).join("")}
    </svg>`;
  const stamp = `
    <svg viewBox="0 0 220 260" width="100%" height="100%">
      <rect x="6" y="6" width="208" height="248" fill="none" stroke="#2C2E31" stroke-width="1.5" stroke-dasharray="4 3"/>
      <g transform="translate(110,130) rotate(-14)">
        <circle r="52" fill="none" stroke="${p.accent}" stroke-width="2"/>
        <text y="-6" font-family="Archivo Black, sans-serif" font-size="11" fill="${p.accent}" text-anchor="middle">CONTRÔLÉ</text>
        <text y="12" font-family="monospace" font-size="9" fill="${p.accent}" text-anchor="middle">${p.lot}</text>
      </g>
      <text x="18" y="240" font-family="monospace" font-size="7" fill="#4A4E52">GRAMME LABS — usage sportif</text>
    </svg>`;
  return [label, spec, stamp];
}
