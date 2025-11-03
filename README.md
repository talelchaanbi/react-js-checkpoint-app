## React JS Checkpoint – Shoe Boutique

Application React (Create React App) avec UI moderne et ergonomique basée sur Bootstrap.

### Fonctionnalités clés

- Navbar fixe et transparente, effet glass; devient lisible/opaque au scroll.
- Thème clair/sombre (toggle), persistant via localStorage.
- Bascule de langue FR/EN (texte, labels UI).
- Hero Carousel avec images réelles (Unsplash) et captions.
- Grille de 3 cartes produit responsive.
- Formulaire de contact stylé (Bootstrap) avec champs utiles au thème.
- Effet “reveal on scroll”.
- Footer sobre et responsive avec liens + contact, compatible dark mode.

### Démarrer

Dans le dossier projet:

1) Installer les dépendances:
	- `npm install`
2) Lancer en développement:
	- `npm start`
3) Ouvrir http://localhost:3000

### Tests et build

- Lancer les tests:
  - `npm test`
  - Le test vérifie la présence du titre principal.
- Build production:
  - `npm run build`

### Images et crédits

Les images proviennent d’Unsplash. Un lien d’attribution est présent dans l’application. Vous pouvez changer les URLs dans `src/App.js` (constante `SHOES` et images du carousel).

### Nettoyage / Fichiers non utilisés

- `src/logo.svg` n’est pas utilisé par l’app.
- Les icônes par défaut `public/logo192.png` et `public/logo512.png` ne sont pas référencées (le projet utilise `public/logo.png`).

Vous pouvez supprimer ces fichiers pour alléger le dépôt. L’application n’en dépend pas.

### Dépôt / push

1) Vérifier le projet localement:
	- `npm test`
	- `npm run build`
2) Commit & push:
	- `git add .`
	- `git commit -m "refactor: UI pro + footer + navbar fixed + cleanup"`
	- `git push origin main`

---

Projet initialisé avec [Create React App](https://github.com/facebook/create-react-app).
