# 🎯 WhatsClose - Site Immersif

> **Le Système d'exploitation du commerce local**
> Une expérience web immersive et innovante présentant WhatsClose, la plateforme qui révolutionne le commerce de proximité.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)

---

## ✨ Aperçu

Ce site web immersif présente **WhatsClose**, un écosystème hybride combinant :
- 🏪 **Un réseau physique** : Casiers intelligents multifonctions accessibles 24/7
- 📱 **Une plateforme numérique** : Applications pour créateurs et consommateurs
- 🔄 **Deux flux innovants** : Push (click & collect flexible) et Pull (pré-commande garantie)

### 🎨 Fonctionnalités du Site

- **Expérience 3D Immersive** : Scènes WebGL interactives avec Three.js
- **Animations Fluides** : Transitions GSAP et Framer Motion
- **Scroll Smooth** : Navigation ultra-fluide avec Lenis
- **Design Moderne** : Interface épurée avec effets glass morphism
- **100% Responsive** : Optimisé mobile, tablette et desktop
- **Performance Optimale** : Code splitting et lazy loading

---

## 🚀 Technologies

### Frontend
- **Next.js 14** - App Router, React Server Components
- **React 18** - Hooks, Suspense, Transitions
- **TypeScript 5** - Type-safety complète

### 3D & Animations
- **Three.js** - Rendu 3D WebGL
- **@react-three/fiber** - React pour Three.js
- **@react-three/drei** - Helpers et composants 3D
- **Framer Motion** - Animations déclaratives
- **GSAP** - Animations complexes et ScrollTrigger
- **Lenis** - Smooth scrolling

### Styling
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - Transformations CSS
- **Custom Theme** - Palette WhatsClose (Indigo/Pink/Teal)

---

## 📦 Installation

### Prérequis
- Node.js 18.17 ou supérieur
- npm ou yarn

### Démarrage rapide

```bash
# Clone le repository
git clone <repository-url>
cd whatsclose

# Installe les dépendances
npm install

# Lance le serveur de développement
npm run dev

# Ouvre http://localhost:3000 dans ton navigateur
```

### Commandes disponibles

```bash
npm run dev          # Développement (http://localhost:3000)
npm run build        # Build production
npm run start        # Lance le build production
npm run lint         # Linting ESLint
npm run type-check   # Vérification TypeScript
```

---

## 📁 Structure du Projet

```
whatsclose/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Layout racine avec métadonnées
│   └── page.tsx               # Page d'accueil
│
├── components/                 # Composants React
│   ├── 3d/                    # Composants Three.js/WebGL
│   │   ├── Scene.tsx          # Gestionnaire de scènes 3D
│   │   ├── LockerNetwork.tsx  # Réseau de casiers animé
│   │   ├── FloatingProducts.tsx # Produits flottants avec physique
│   │   ├── MapGlobe.tsx       # Globe 3D interactif
│   │   └── ParticleField.tsx  # Champ de particules (5000+)
│   │
│   ├── sections/              # Sections de la page
│   │   ├── Hero.tsx           # Hero immersif
│   │   ├── Concept.tsx        # Système d'exploitation local
│   │   ├── Problem.tsx        # Double contrainte
│   │   ├── Ecosystem.tsx      # Les 3 piliers
│   │   ├── Innovation.tsx     # Flux Push/Pull
│   │   ├── Experience.tsx     # Parcours utilisateur
│   │   └── Footer.tsx         # Footer engageant
│   │
│   ├── Navigation.tsx         # Barre de navigation
│   ├── MobileMenu.tsx         # Menu mobile fullscreen
│   ├── ScrollProgress.tsx     # Indicateur de progression
│   ├── Cursor.tsx             # Curseur custom magnétique
│   ├── LoadingScreen.tsx      # Écran de chargement
│   ├── Button.tsx             # Composant bouton réutilisable
│   ├── ErrorBoundary.tsx      # Gestion d'erreurs
│   └── BackgroundScene.tsx    # Gestionnaire de scènes de fond
│
├── lib/                       # Utilitaires et helpers
│   ├── hooks/                 # Custom React hooks
│   │   ├── useScrollProgress.ts
│   │   ├── useMousePosition.ts
│   │   ├── useWindowSize.ts
│   │   └── useInView.ts
│   ├── animations.ts          # Variants Framer Motion
│   ├── smooth-scroll.ts       # Configuration Lenis
│   ├── types.ts               # Types TypeScript
│   └── utils.ts               # Fonctions utilitaires
│
├── styles/
│   └── globals.css            # Styles globaux et Tailwind
│
├── public/                    # Assets statiques
│
├── .env.example               # Variables d'environnement (template)
├── next.config.js             # Configuration Next.js
├── tailwind.config.ts         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── package.json               # Dépendances
```

---

## 🎭 Composants Principaux

### 🌐 Scènes 3D

#### **LockerNetwork** (Réseau de Casiers)
- 50+ nœuds instanciés pour la performance
- Connexions dynamiques basées sur la proximité
- Animation de pulsation avec phases décalées
- Particules lumineuses sur chaque nœud

#### **FloatingProducts** (Produits Flottants)
- 12 types de produits locaux
- Simulation physique avec vélocité et amortissement
- Interaction souris/clic pour pousser les produits
- Éclairage dynamique par produit

#### **MapGlobe** (Globe Interactif)
- 30 marqueurs de localisation (casiers, magasins, marchés)
- Conversion lat/lng précise en 3D
- Effets de lueur sur les marqueurs actifs
- Rotation orbitale automatique

#### **ParticleField** (Champ de Particules)
- 5000+ particules optimisées
- Shaders GLSL personnalisés
- Réactivité au scroll de la page
- Dégradé de couleurs (indigo → rose → violet)

### 📱 Sections Immersives

#### **Hero** - Introduction Immersive
- Effet typewriter pour le slogan
- Indicateur de scroll animé
- Boutons CTA avec effets de gradient
- Orbes flottants en parallaxe

#### **Concept** - Système d'Exploitation Local
- Révélation de texte mot par mot
- Statistiques animées avec compteurs
- Hub central avec icônes en orbite
- Effets de parallaxe sur scroll

#### **Problem** - Double Contrainte
- Layout deux colonnes (Créateurs vs Consommateurs)
- 8 points de douleur avec animations
- États hover interactifs
- Icône de tension centrale

#### **Ecosystem** - Les 3 Piliers
- Cartes 3D avec transformation perspective
- Expansion au hover révélant les fonctionnalités
- Diagramme de flux connectant les piliers
- Indicateurs de flux de données pulsants

#### **Innovation** - Flux Push/Pull
- Toggle animé entre les deux flux
- Timeline avec révélation étape par étape
- Comparaison avant/après
- Animations d'entrée/sortie fluides

#### **Experience** - Parcours Utilisateur
- **Scroll horizontal** avec GSAP ScrollTrigger
- 6 panneaux du parcours client
- Transformations 3D et parallaxe
- Indicateurs de progression

#### **Footer** - Pied de Page Engageant
- Inscription newsletter avec états animés
- 4 sections de liens (Produit, Ressources, Entreprise, Légal)
- Orbes d'arrière-plan animés
- Réseaux sociaux avec gradients

### 🎨 UI Components

- **Navigation** : Transparente → solide au scroll, avec indicateur de progression
- **MobileMenu** : Overlay fullscreen avec animations échelonnées
- **Cursor** : Curseur personnalisé avec effet magnétique sur les boutons
- **LoadingScreen** : Anneaux concentriques rotatifs avec barre de progression

---

## 🎨 Personnalisation

### Couleurs (Tailwind)

```js
// tailwind.config.ts
colors: {
  primary: colors.indigo,    // Bleu principal
  secondary: colors.pink,    // Rose accent
  accent: colors.teal,       // Vert interaction
  dark: colors.slate,        // Thème sombre
}
```

### Scènes 3D

```tsx
// Changer la scène de fond
<Scene sceneType="locker-network" enableControls autoRotate />
<Scene sceneType="particle-field" scrollFactor={0.2} />
<Scene sceneType="map-globe" />
```

### Animations

```tsx
// Utiliser les variants Framer Motion
import { fadeInUp, staggerContainer } from '@/lib/animations'

<motion.div variants={fadeInUp} initial="initial" animate="animate">
  Contenu animé
</motion.div>
```

---

## 🌟 Fonctionnalités Techniques

### Performance
- ⚡ **Code Splitting** : Composants 3D chargés dynamiquement
- 🎯 **Tree Shaking** : Bundle optimisé
- 📦 **Lazy Loading** : Chargement progressif des assets
- 🔄 **Instancing** : Rendu optimisé pour milliers d'objets 3D
- 📊 **Adaptive DPR** : Ajustement dynamique de la résolution

### SEO & Accessibilité
- 🔍 **Métadonnées complètes** : Open Graph, Twitter Cards
- ♿ **ARIA labels** : Navigation accessible
- ⌨️ **Navigation clavier** : Support complet
- 🎨 **Contraste élevé** : WCAG AAA
- 📱 **Mobile-first** : Responsive design

### Developer Experience
- 📘 **TypeScript strict** : Type-safety complète
- 🎨 **ESLint + Prettier** : Code formaté automatiquement
- 🔧 **Path aliases** : `@/components`, `@/lib`
- 📚 **Documentation** : Commentaires JSDoc
- 🧪 **Error Boundaries** : Gestion d'erreurs robuste

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installe Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Autres plateformes

```bash
# Build le projet
npm run build

# Les fichiers sont dans .next/
# Upload sur votre plateforme (Netlify, AWS, etc.)
```

---

## 📊 Performance

### Métriques Cibles
- ⚡ First Contentful Paint: < 1.5s
- 🎯 Time to Interactive: < 3s
- 📊 Lighthouse Score: > 90
- 🎨 WebGL: 60 FPS constant

### Optimisations
- Compression Gzip/Brotli
- Images optimisées (WebP)
- Fonts préchargées
- CSS critical inline
- Service Worker (optionnel)

---

## 🛠️ Développement

Consultez [DEVELOPMENT.md](./DEVELOPMENT.md) pour :
- 📖 Guide de développement détaillé
- 🧩 Comment ajouter de nouvelles sections
- 🎨 Créer des composants 3D
- ✨ Best practices d'animation
- 🐛 Troubleshooting
- 🧪 Tests

---

## 🎯 Concept WhatsClose

### Le Problème
**Double Contrainte du Commerce Local :**

**Créateurs** (Artisans, Producteurs, Restaurateurs)
- ❌ Risque des invendus
- ❌ Contrainte logistique complexe
- ❌ Horaires d'ouverture limitants

**Consommateurs**
- ❌ Manque de flexibilité
- ❌ Incertitude sur la disponibilité
- ❌ Fragmentation des plateformes

### La Solution

**L'Écosystème WhatsClose en 3 Piliers :**

1. **🏪 Casiers Intelligents** (Pilier Physique)
   - Multi-températures (sec, réfrigéré)
   - Accessibles 24/7
   - Sécurisés et géolocalisés

2. **📱 Application Consommateur** (Découverte)
   - Carte des créateurs à proximité
   - Commandes directes
   - Disponibilité temps réel
   - Paiement et code de retrait

3. **💼 Plateforme Créateur** (Gestion)
   - Contrôle total sans complexité technique
   - Gestion des stocks en temps réel
   - Outil de pré-vente

### Innovation Majeure : Flux Push & Pull

**🔄 Flux Poussé** (Click & Collect Flexible)
1. Client commande
2. Artisan prépare quand il veut
3. Artisan dépose dans le casier le plus proche
4. Client récupère 24/7
→ **Horaires découplés**

**⚡ Flux Tiré** (Pré-commande Garantie)
1. Artisan crée une offre future
2. Clients pré-achètent
3. Production garantie sans risque
4. Dépôt dans casiers uniquement pour les ventes confirmées
→ **Zéro invendu, zéro gaspillage**

---

## 📸 Screenshots

_À venir - Ajoutez vos captures d'écran dans `/public/screenshots/`_

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [DEVELOPMENT.md](./DEVELOPMENT.md) pour le workflow.

---

## 📄 Licence

MIT © 2024 WhatsClose

---

## 👥 Crédits

- **Design & Développement** : Équipe WhatsClose
- **Inspirations** :
  - [300.yourmajesty.co](https://300.yourmajesty.co) - Expériences immersives
  - [luruke.com](https://luruke.com) - WebGL créatif
  - [resn.co.nz](https://resn.co.nz) - Interactions 3D

---

## 📞 Contact

- 🌐 Site web : [whatsclose.com](https://whatsclose.com)
- 📧 Email : contact@whatsclose.com
- 🐦 Twitter : [@whatsclose](https://twitter.com/whatsclose)

---

<div align="center">

**Construit avec ❤️ et beaucoup de ☕ par l'équipe WhatsClose**

[⬆ Retour en haut](#-whatsclose---site-immersif)

</div>
