# GRAMME. — site e-commerce (compléments sportifs, paiement crypto)

Site statique (HTML/CSS/JS, aucun build nécessaire) prêt pour **GitHub Pages**,
avec backend **Firebase Firestore** pour les commandes et l'espace admin.

## Ce qui est déjà fait

- **Accueil** : identité de marque (voir plus bas), best-sellers.
- **Produits** : catalogue filtrable par catégorie, chaque carte a un visuel
  glissable (swipe tactile/souris + flèches + points) sans avoir besoin de
  cliquer sur le produit, la quantité restante et une jauge de stock.
- **Panier** : compteur dans la barre du haut, tiroir latéral, +/− par
  article, bouton "Retirer", total en direct (`localStorage`, persiste au
  rechargement).
- **Commande** : numéro unique généré côté client (format `GR-AAMM-XXXX`),
  vérifié contre les commandes existantes pour garantir l'unicité.
- **Paiement crypto** : choix BTC / ETH / USDT, adresse de wallet affichée,
  montant converti (taux indicatifs éditables), bouton "j'ai envoyé le
  paiement" qui crée la commande avec le statut `en_attente`.
- **Espace admin** (`admin.html`) : liste des commandes, filtre par statut,
  boutons "Marquer payé" / "Annuler" / "Remettre en attente" — c'est
  uniquement à ce moment que l'argent reçu est confirmé manuellement.
- **SAV** : suivi de commande par numéro + formulaire de contact fournisseur.
- **Mode démo intégré** : tant que `firebase-config.js` n'est pas rempli,
  tout le site tourne sur des données locales (`localStorage`), pour que tu
  puisses tester le parcours complet avant de brancher quoi que ce soit.

## Identité de marque (DA)

- **Palette** : encre `#0B0B0C`, béton `#17181A`, os `#EDEAE2`, lime acide
  `#C8FF3D` (accent signature), rouille `#B4431F` (alertes/stock bas).
- **Typo** : Archivo Black (titres, façon tampon/étiquette), JetBrains Mono
  (données, dosages, prix — lisibilité "fiche technique"), Inter (texte
  courant).
- **Élément signature** : chaque produit est présenté comme une **fiche de
  lot de laboratoire** — étiquette, fiche de dosage, tampon "contrôlé" — au
  lieu d'une photo produit classique. C'est un choix assumé de studio, pas
  un manque : ça évite aussi tout problème de droits d'image, et tu peux le
  remplacer par de vraies photos (voir plus bas).

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt GitHub, pousse tout le contenu de ce dossier à la racine.
2. Repo → **Settings → Pages** → Source : branche `main`, dossier `/root`.
3. Le site sera disponible sur `https://TON-COMPTE.github.io/TON-DEPOT/`.

Aucune information secrète ne doit jamais être commitée : ni mot de passe
admin, ni clé privée de wallet crypto (seule l'**adresse publique** doit
figurer dans `firebase-config.js`).

## Brancher Firebase (recommandé avant toute vraie commande)

1. Crée un projet sur [console.firebase.google.com](https://console.firebase.google.com).
2. Active **Firestore Database** (mode production) et **Authentication**
   (méthode Email/Mot de passe), crée ton propre compte admin dedans.
3. Récupère la config web (Paramètres du projet → Tes applications → `</>`)
   et colle-la dans `firebase-config.js`.
4. Récupère ton **UID** (Authentication → Users) et remplace
   `ADMIN_UIDS` dans `firebase-config.js` **et** l'UID dans
   `firestore.rules`.
5. Dans Firestore → Règles, colle le contenu de `firestore.rules` et publie.
6. Renseigne tes vraies adresses de wallets (`WALLETS`) et ajuste les taux
   indicatifs (`RATES_EUR`) dans `firebase-config.js`.
7. (Optionnel) Ajoute tes produits directement dans la collection
   `products` sur Firestore Console — reprends la structure de
   `products-data.js` (`name`, `cat`, `tagline`, `price`, `stock`,
   `maxStock`, `servings`, `dosage`, `accent`, `lot`).

Sans ces réglages, le site continue de fonctionner en mode démo local — ce
qui est très bien pour présenter la maquette, mais **aucune vraie commande
ne doit être prise en mode démo** : rien n'est vérifiable ni sécurisé.

## Pourquoi c'est pensé pour éviter les failles courantes

- Les commandes ne peuvent être **créées** que par le public ; seule
  l'admin authentifiée peut les **modifier** (empêche un client de
  s'auto-valider "payé").
- Le suivi de commande côté client ne permet de lire qu'**un seul document
  dont on connaît déjà l'ID exact** — jamais de lister toutes les commandes,
  donc pas de fuite de la base client complète.
- L'espace admin exige une authentification Firebase + vérification de
  l'UID, à la fois côté interface (`admin.js`) et côté base de données
  (`firestore.rules`) : même si quelqu'un contournait l'interface, les
  règles Firestore bloqueraient l'accès brut aux données.
- Aucune clé privée ni secret ne transite jamais dans le code : les wallets
  ne contiennent que des adresses publiques de réception.
- Le HTML échappe le contenu inséré dynamiquement dans les fiches produit
  (`esc()` dans `products-data.js`) pour éviter l'injection de balises.

## Remplacer les visuels "fiche de labo" par de vraies photos produit

Dans `products-data.js`, la fonction `productSlides(p)` retourne un
tableau de 3 blocs HTML (actuellement du SVG). Remplace simplement chaque
entrée par une balise `<img src="assets/mon-produit-1.jpg" alt="...">` en
gardant le même nombre de slides pour que le carrousel continue de
fonctionner sans autre modification.

## Limites connues à garder en tête

- Les taux de conversion crypto sont **statiques** (à éditer à la main ou à
  brancher sur une API de cours en direct type CoinGecko).
- La vérification du paiement reste **manuelle** par conception (c'est ce
  qui a été demandé) : personne n'automatise la lecture de blockchain ici.
- Le mode démo (`localStorage`) n'est **pas** un mode sécurisé : il sert
  uniquement à tester l'expérience avant de brancher Firebase.
