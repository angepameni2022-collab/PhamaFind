# PhamaFind - Application Frontend Next.js 14 (App Router)

Plateforme moderne de recherche et de livraison de médicaments en 1h max à Douala, Cameroun.
Conçue selon les standards d'une pharmacie en ligne moderne, épurée, ergonomique et très arrondie (style Pharma-GDD), avec Next.js 14, TypeScript et Tailwind CSS.

---

## 🎨 Design System

- **Police** : `Plus Jakarta Sans` (`next/font/google`, auto-hébergée) — poids 400, 500, 600, 700, 800.
- **Palette de couleurs** :
  - `primary` : `#0C8262` (barre du haut, logo, accents verts)
  - `accent` : `#D6297A` (prix, pastilles de promo, bouton "Envoyer")
  - `accent-link` : `#CF2069` (liens, texte et contours des boutons secondaires)
  - `accent-soft` : `#FDECF3` (fond du bouton "Ajouter au panier")
  - `page` : `#F9F9F9` (fond de page)
  - `card` : `#FFFFFF` (cartes produit, champs de saisie, accordéon)
  - `mint` : `#BCDAD9` (section "Médicaments les plus demandés")
  - `lavender` : `#CCD7EE` (sections "Promotions" et "Nouveautés")
  - `pale-green` : `#E1EDEA` (FAQ et cartes d'avis clients)
  - `newsletter` : `#DAF2E8` (encadré d'inscription newsletter)
  - `ink` : `#111827` (titres principaux)
  - `body` : `#2F3337` (texte courant)
  - `muted` : `#4B4D4D` (texte secondaire)
  - `product-grey` : `#7A7A7A` (descriptions et conditionnements des produits)
  - `star` : `#FFDC91` (étoiles des avis)
  - `alert` : `#D32F2F` (lien "Rejoignez-nous" dans le footer)

- **Formes & Rayons** :
  - Cartes produit : `16px` (`rounded-card`)
  - Grandes sections : `24px` (`rounded-section`)
  - Accordéon FAQ : `14px` (`rounded-accordion`)
  - Boutons et champs de recherche : pilule (`rounded-full`)
  - Conteneur centré : `max-width: 1200px`

---

## 📂 Architecture des Composants

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Variables CSS du Design System
│   ├── layout.tsx          # Shell racine, SEO, Schema.org LocalBusiness, Google Font
│   └── page.tsx            # Assemblage ordonné des 12 sections
├── components/
│   ├── AnnouncementBar.tsx # 1. Barre d'annonce supérieure (#0C8262)
│   ├── Header.tsx          # 2. Header sticky avec logo SVG, recherche autocomplete, favoris et panier
│   ├── Nav.tsx             # 3. Navigation (Catégories, Promotions #D6297A, Par pharmacie)
│   ├── HeroCarousel.tsx    # 4. Hero carrousel 4 slides ~230px, défilement 5s, bouton WhatsApp
│   ├── ProductCard.tsx     # 5. Carte produit unifiée (cœur, image, tags, prix accent, bouton soft)
│   ├── ProductCarousel.tsx # 5, 7, 9. Carrousel horizontal réutilisable (fond mint/lavender)
│   ├── CategoryRow.tsx     # 6. Top catégories en 6 vignettes circulaires 110px
│   ├── Reviews.tsx         # 8. Grille 2 colonnes d'avis clients (fond pale-green, note 5,0)
│   ├── PartnerGrid.tsx     # 10. Grille de 15 officines partenaires de Douala en pastilles blanches
│   ├── Faq.tsx             # 11. FAQ 2 colonnes, accordéon interactif, balisage Schema.org FAQPage
│   ├── Footer.tsx          # 12. Footer complet (newsletter #DAF2E8, liens, réseaux, alert #D32F2F)
│   └── WhatsAppFloatingButton.tsx # Bouton WhatsApp flottant avec pulsation verte
├── context/
│   └── ShopContext.tsx     # Gestion locale du panier (badge dynamique) et des favoris
├── data/
│   └── mockData.json       # 20 produits réalistes, catégories, avis, FAQ et pharmacies de Douala
└── types/
    └── index.ts            # Interfaces TypeScript
```

---

## 🚀 Lancement & Commandes

Dans le répertoire `phamafind-next` :

```bash
# 1. Installer les dépendances (si ce n'est pas déjà fait)
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Compiler pour la production
npm run build

# 4. Démarrer en production
npm start
```

Par défaut, l'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## ⚡ Fonctionnalités & Bonnes Pratiques

- **Autocomplétion de recherche** : La barre de recherche filtre dynamiquement les 20 médicaments du catalogue en direct avec prix et description.
- **Gestion du Panier & Favoris** : État React local (`ShopContext`). L'ajout au panier incrémente instantanément le badge du header.
- **Balisage Schema.org** :
  - Données structurées `Pharmacy` / `LocalBusiness` à Douala dans `layout.tsx`.
  - Données structurées `FAQPage` dans `Faq.tsx`.
  - Données structurées `BreadcrumbList` dans `src/components/catalog/Breadcrumbs.tsx`.
- **Performance & Mobile-First** : Optimisation `next/image` avec format WebP et lazy-loading automatique, cibles tactiles conformes aux critères d'accessibilité (>= 48px sur mobile).

---

## 🛠️ Guide Développeur : Ajouter une Catégorie ou un Filtre

### 1. Comment ajouter une nouvelle Catégorie (ou Sous-catégorie)
Toutes les catégories et sous-catégories sont centralisées dans [`src/lib/categories.ts`](file:///c:/Users/ARS/Desktop/Projet/PROJET%20PHARMAFIND/phamafind-next/src/lib/categories.ts) :

```typescript
// Dans CATEGORIES[] de src/lib/categories.ts :
{
  slug: 'nouvelle-categorie',
  label: 'Nouvelle Catégorie',
  description: 'Description pour le SEO et l\'en-tête de catalogue.',
  children: [
    { slug: 'premiere-sous-cat', label: 'Première sous-catégorie' },
    { slug: 'deuxieme-sous-cat', label: 'Deuxième sous-catégorie' },
  ],
}
```

Grâce à `generateStaticParams` dans `src/app/categorie/[slug]/page.tsx` et `src/app/categorie/[slug]/[sous]/page.tsx`, Next.js 14 va automatiquement :
1. Générer la page de catégorie `/categorie/nouvelle-categorie`
2. Générer chaque page de sous-catégorie `/categorie/nouvelle-categorie/premiere-sous-cat`
3. Afficher la catégorie dans le **Méga-menu desktop** et le **tiroir mobile** sans aucun code supplémentaire !

### 2. Comment ajouter un nouveau Filtre dans la page Catalogue
Pour ajouter un filtre (ex: par saveur, par condition de délivrance, etc.) :

1. **Déclarer le champ dans l'interface et le catalogue** (`src/lib/products.ts`) :
   ```typescript
   export interface ProductCatalogItem {
     // ...
     nouveauFiltre?: string;
   }

   export interface ProductFilters {
     // ...
     nouveauFiltres?: string[];
   }
   ```

2. **Ajouter la règle dans la fonction de filtrage pure** (`filterProducts` dans `src/lib/products.ts`) :
   ```typescript
   if (filters.nouveauFiltres && filters.nouveauFiltres.length > 0) {
     if (!p.nouveauFiltre || !filters.nouveauFiltres.includes(p.nouveauFiltre)) {
       return false;
     }
   }
   ```

3. **Ajouter le groupe visuel repliable dans la Sidebar** (`src/components/catalog/FiltersSidebar.tsx`) :
   ```tsx
   <FilterGroup title="Mon Nouveau Filtre" defaultOpen={false}>
     {OPTIONS.map((opt) => (
       <label key={opt} className="flex items-center gap-2 text-xs py-0.5 cursor-pointer">
         <input
           type="checkbox"
           checked={localFilters.nouveauFiltres?.includes(opt) || false}
           onChange={() => toggleArrayFilter('nouveauFiltres', opt)}
           className="accent-primary"
         />
         <span>{opt}</span>
       </label>
     ))}
   </FilterGroup>
   ```
4. Le filtre sera automatiquement synchronisé dans l'URL (`searchParams`), affiché sous forme de pastille supprimable dans `ActiveFilters`, et pris en compte par la pagination et le tri.
