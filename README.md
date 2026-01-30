# New World Link - Site Web Professionnel

## 📋 Description
Site web complet pour New World Link, entreprise spécialisée en solutions numériques et sécurité informatique en Côte d'Ivoire.

## 🎨 Contenu du projet

### Pages HTML (5 pages)
1. **index.html** - Page d'accueil (déjà fournie)
2. **services.html** - Présentation détaillée des services
3. **approche.html** - Méthodologie et approche de travail
4. **apropos.html** - À propos de l'entreprise
5. **contact.html** - Formulaire de contact et coordonnées

### Fichiers CSS (2 fichiers)
1. **style.css** - Styles principaux du site
2. **pages-style.css** - Styles additionnels pour les pages spécifiques

### Fichier JavaScript (1 fichier)
1. **script.js** - Fonctionnalités interactives et animations

## 📁 Structure des dossiers à créer

```
votre-projet/
│
├── index.html
├── services.html
├── approche.html
├── apropos.html
├── contact.html
│
└── Assests/
    ├── css/
    │   ├── style.css
    │   └── pages-style.css
    │
    └── js/
        └── script.js
```

## 🚀 Installation

### Étape 1 : Créer la structure de dossiers
Créez les dossiers suivants dans votre projet :
- `Assests/css/`
- `Assests/js/`

### Étape 2 : Placer les fichiers
1. Placez tous les fichiers HTML à la racine de votre projet
2. Placez `style.css` et `pages-style.css` dans `Assests/css/`
3. Placez `script.js` dans `Assests/js/`

### Étape 3 : Modifier les liens CSS
Dans **toutes** les pages HTML, ajoutez cette ligne dans le `<head>` après le lien vers `style.css` :

```html
<link rel="stylesheet" href="Assests/css/style.css">
<link rel="stylesheet" href="Assests/css/pages-style.css">
```

### Étape 4 : Tester
Ouvrez `index.html` dans votre navigateur pour vérifier que tout fonctionne.

## ✨ Fonctionnalités incluses

### 🎯 Navigation
- Header sticky avec effet de réduction au scroll
- Menu hamburger responsive pour mobile
- Scroll fluide vers les sections
- Navigation entre toutes les pages

### 🎨 Design
- Palette de couleurs professionnelle (bleu, cyan, vert)
- Animations fluides et modernes
- Design 100% responsive
- Effets de hover sophistiqués

### 📝 Formulaire de Contact
- Validation en temps réel
- Messages d'erreur personnalisés
- Notifications de succès/erreur
- Protection des données

### ⚡ Performance
- Lazy loading des images
- Debouncing des événements
- Code optimisé et modulaire
- Animations CSS performantes

### 🎮 Easter Egg
- Code Konami caché : ↑↑↓↓←→←→BA
- Effet visuel surprise !

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `style.css` (lignes 11-17) :

```css
:root {
    --primary-color: #0A2463;
    --secondary-color: #3E92CC;
    --accent-color: #00D9FF;
    --success-color: #06D6A0;
    /* ... */
}
```

### Modifier les textes
Tous les textes sont directement modifiables dans les fichiers HTML.

### Ajouter des images
Créez un dossier `Assests/images/` et ajoutez vos images, puis référencez-les dans le HTML :

```html
<img src="Assests/images/votre-image.jpg" alt="Description">
```

## 📱 Responsive

Le site est entièrement responsive avec 3 breakpoints :
- Desktop : > 968px
- Tablette : 768px - 968px
- Mobile : < 768px

## 🔧 Compatibilité

Compatible avec :
- Chrome, Firefox, Safari, Edge (dernières versions)
- iOS Safari, Chrome Mobile
- Tous les navigateurs modernes

## 📞 Informations à personnaliser

N'oubliez pas de modifier dans **contact.html** :
- Adresse email
- Numéro de téléphone
- Adresse physique
- Liens des réseaux sociaux
- Horaires d'ouverture

## 🎓 Support & Documentation

### Structure des pages

1. **index.html** : Page d'accueil avec hero, présentation des services et appel à l'action
2. **services.html** : 4 services détaillés (Analyse, Applications, Paiement, Sécurité)
3. **approche.html** : Méthodologie en 5 étapes, valeurs et garanties
4. **apropos.html** : Histoire, équipe, chiffres clés et engagements
5. **contact.html** : Formulaire complet + coordonnées + FAQ

### Modules JavaScript

- `HeaderManager` : Gestion du header et menu mobile
- `SmoothScrollNav` : Navigation fluide
- `ScrollAnimations` : Animations au défilement
- `FormHandler` : Validation et soumission de formulaire
- `BackToTop` : Bouton retour en haut
- `PerformanceMonitor` : Optimisations de performance
- `EasterEgg` : Code Konami secret

## 🚀 Déploiement

### Pour hébergement web classique :
1. Uploadez tous les fichiers via FTP
2. Gardez la même structure de dossiers
3. Assurez-vous que `index.html` est à la racine

### Pour GitHub Pages :
1. Créez un repository
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les paramètres
4. Votre site sera accessible à : `https://votre-username.github.io/nom-du-repo/`

## 📝 À faire après installation

- [ ] Remplacer les coordonnées de contact
- [ ] Ajouter les vraies adresses email et téléphones
- [ ] Configurer les liens des réseaux sociaux
- [ ] Ajouter Google Analytics (optionnel)
- [ ] Configurer le formulaire de contact avec un backend réel
- [ ] Ajouter des images de qualité
- [ ] Tester sur différents navigateurs et appareils
- [ ] Optimiser les images pour le web
- [ ] Configurer le domaine personnalisé

## 🎨 Améliorations futures possibles

- Ajouter un blog
- Intégrer un système de gestion de contenu (CMS)
- Ajouter une section témoignages clients
- Créer une galerie de projets réalisés
- Intégrer un chat en direct
- Ajouter le support multilingue (français/anglais)
- Créer une version Progressive Web App (PWA)

## 📄 License

© 2026 New World Link - Tous droits réservés

## 🤝 Contact

Pour toute question concernant ce site :
- Email : contact@newworldlink.ci
- Site web : https://www.newworldlink.ci

---

**Développé avec ❤️ par Claude pour New World Link**

*Site web professionnel, moderne et performant*