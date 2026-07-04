/* ==========================================================================
   Configuration Firebase — REMPLACE ces valeurs par celles de TON projet
   (Console Firebase > Paramètres du projet > Tes applications > SDK config).
   Ces clés "web" ne sont pas secrètes en soi : c'est firestore.rules qui
   protège réellement tes données, pas cette config. Voir README.md.
   ========================================================================== */

export const firebaseConfig = {
  apiKey: "REMPLACE_MOI",
  authDomain: "REMPLACE_MOI.firebaseapp.com",
  projectId: "REMPLACE_MOI",
  storageBucket: "REMPLACE_MOI.appspot.com",
  messagingSenderId: "REMPLACE_MOI",
  appId: "REMPLACE_MOI"
};

// UID Firebase Auth du/des compte(s) admin autorisés (voir firestore.rules)
export const ADMIN_UIDS = ["REMPLACE_MOI_PAR_TON_UID_ADMIN"];

// Portefeuilles crypto utilisés pour encaisser les commandes
export const WALLETS = {
  BTC:  { label: "Bitcoin (BTC)",        address: "bc1qREMPLACE_MOI_PAR_TON_ADRESSE" },
  ETH:  { label: "Ethereum (ETH)",       address: "0xREMPLACE_MOI_PAR_TON_ADRESSE" },
  USDT: { label: "USDT (réseau TRC20)",  address: "TREMPLACE_MOI_PAR_TON_ADRESSE" }
};

// Taux indicatifs EUR -> crypto, à défaut d'API de cours en direct.
// Pense à les mettre à jour régulièrement (ou brancher une API de cours).
export const RATES_EUR = {
  BTC: 0.0000155,
  ETH: 0.00034,
  USDT: 1.08
};
