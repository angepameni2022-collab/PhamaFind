export interface SubCategory {
  slug: string;
  label: string;
  description?: string;
}

export interface Category {
  slug: string;
  label: string;
  description?: string;
  children: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'medicaments',
    label: 'Médicaments (sans ordonnance uniquement)',
    description: 'Médicaments d\'automédication autorisés à la délivrance sans ordonnance, dispensés par nos pharmaciens partenaires à Douala.',
    children: [
      { slug: 'douleur-fievre', label: 'Douleur et fièvre' },
      { slug: 'digestion', label: 'Digestion' },
      { slug: 'rhume-toux-gorge', label: 'Rhume - toux - gorge' },
      { slug: 'allergies', label: 'Allergies' },
      { slug: 'peau-plaies', label: 'Peau et plaies' },
      { slug: 'troubles-urinaires', label: 'Troubles urinaires' },
      { slug: 'paludisme-antiparasitaires', label: 'Paludisme et antiparasitaires' },
    ],
  },
  {
    slug: 'sante',
    label: 'Santé',
    description: 'Compléments alimentaires, vitamines, minéraux et dispositifs pour soutenir votre santé au quotidien.',
    children: [
      { slug: 'complement-alimentaire-digestion', label: 'Complément alimentaire Digestion' },
      { slug: 'magnesium', label: 'Magnésium' },
      { slug: 'nez-gorge-toux', label: 'Nez - gorge - toux' },
      { slug: 'complements-os', label: 'Compléments alimentaires pour les os' },
      { slug: 'irritations-cutanees', label: 'Irritations cutanées' },
      { slug: 'systeme-immunitaire', label: 'Système immunitaire' },
      { slug: 'yeux', label: 'Yeux' },
      { slug: 'sexualite', label: 'Sexualité' },
      { slug: 'mesure-diagnostic', label: 'Mesure et diagnostic' },
      { slug: 'vitamine', label: 'Complément alimentaire Vitamine' },
      { slug: 'stress-sommeil', label: 'Stress et sommeil' },
      { slug: 'muscles-articulations', label: 'Muscles et articulations' },
      { slug: 'collagene', label: 'Collagène' },
      { slug: 'problemes-feminins', label: 'Problèmes féminins' },
      { slug: 'cholesterol-diabete', label: 'Cholestérol et diabète' },
      { slug: 'confort-urinaire', label: 'Confort urinaire' },
      { slug: 'aromatherapie', label: 'Aromathérapie' },
    ],
  },
  {
    slug: 'hygiene-beaute',
    label: 'Hygiène - Beauté',
    description: 'Soins du visage, corps, cheveux et hygiène quotidienne des plus grands laboratoires dermo-cosmétiques.',
    children: [
      { slug: 'bucco-dentaire', label: 'Hygiène bucco-dentaire' },
      { slug: 'soins-cheveux', label: 'Soins cheveux' },
      { slug: 'soin-visage', label: 'Soin visage' },
      { slug: 'complements-beaute', label: 'Compléments beauté' },
      { slug: 'hydratant-visage', label: 'Hydratant visage' },
      { slug: 'anti-imperfections', label: 'Anti-imperfections' },
      { slug: 'maquillage', label: 'Maquillage' },
      { slug: 'soins-pieds', label: 'Soins des pieds' },
      { slug: 'soin-levres', label: 'Soin des lèvres' },
      { slug: 'anti-rides-anti-age', label: 'Soin anti-rides et anti-âge' },
      { slug: 'douche', label: 'Douche' },
      { slug: 'soin-corps', label: 'Soin du corps' },
      { slug: 'hygiene-intime', label: 'Produits hygiène intime' },
      { slug: 'produit-solaire', label: 'Produit solaire' },
      { slug: 'deodorant', label: 'Déodorant' },
      { slug: 'soin-mains', label: 'Soin des mains' },
      { slug: 'demaquillants', label: 'Démaquillants' },
    ],
  },
  {
    slug: 'bebe-grossesse',
    label: 'Bébé - Grossesse',
    description: 'Tout pour la maternité, la naissance, les laits infantiles et les soins doux de bébé.',
    children: [
      { slug: 'laits-infantiles', label: 'Laits infantiles' },
      { slug: 'sucettes', label: 'Sucettes' },
      { slug: 'soins-bebe', label: 'Soins bébé' },
      { slug: 'toilette-bain-bebe', label: 'Toilette et bain bébé' },
      { slug: 'complements-grossesse', label: 'Compléments grossesse' },
      { slug: 'vaisselle-bebe', label: 'Vaisselle bébé' },
      { slug: 'sante-bebe', label: 'Santé bébé' },
      { slug: 'biberons', label: 'Biberons' },
      { slug: 'allaitement', label: 'Allaitement' },
      { slug: 'change-bebe', label: 'Change de bébé' },
      { slug: 'maman-grossesse', label: 'Maman et grossesse' },
      { slug: 'repas-bebe', label: 'Repas bébé' },
      { slug: 'probiotique-bebe', label: 'Probiotique bébé' },
    ],
  },
  {
    slug: 'minceur-sport',
    label: 'Minceur - Sport',
    description: 'Nutrition sportive, maintien musculaire, soins amincissants et récupération active.',
    children: [
      { slug: 'complements-minceur', label: 'Compléments minceur' },
      { slug: 'substitut-repas-minceur', label: 'Substitut de repas minceur' },
      { slug: 'bombe-froid', label: 'Bombe de froid' },
      { slug: 'musculation', label: 'Musculation' },
      { slug: 'complements-sport', label: 'Compléments sport' },
      { slug: 'soins-amincissants', label: 'Soins amincissants' },
      { slug: 'maintien-sportif', label: 'Maintien sportif' },
      { slug: 'massage-sportif', label: 'Massage sportif' },
      { slug: 'boissons-barres', label: 'Boissons et barres' },
      { slug: 'protection-pieds-sportif', label: 'Protection pieds sportif' },
    ],
  },
  {
    slug: 'veterinaire',
    label: 'Vétérinaire',
    description: 'Médicaments, antiparasitaires et soins pour chiens, chats, rongeurs et animaux de compagnie.',
    children: [
      { slug: 'chats', label: 'Produits vétérinaires pour chats' },
      { slug: 'chiens', label: 'Produits vétérinaires pour chiens' },
      { slug: 'nac', label: 'Nouveaux animaux de compagnie (furet, lapin)' },
      { slug: 'chevaux', label: 'Produits vétérinaires pour chevaux' },
    ],
  },
  {
    slug: 'soins',
    label: 'Soins',
    description: 'Matériel de pansements, désinfection, rééducation et petit matériel de soins infirmiers.',
    children: [
      { slug: 'nutrition-orale', label: 'Compléments nutritionnels oraux' },
      { slug: 'batonnets-bouche', label: 'Bâtonnets pour soin de bouche' },
      { slug: 'pansements', label: 'Pansements' },
      { slug: 'compresses-coton', label: 'Compresses et coton' },
      { slug: 'alcool-medical', label: 'Alcool médical' },
      { slug: 'reeducation-therapie', label: 'Rééducation et thérapie' },
      { slug: 'nutrition-enterale', label: 'Nutrition entérale' },
      { slug: 'chirurgie-esthetique', label: 'Chirurgie esthétique' },
      { slug: 'protection-medicale', label: 'Équipement de protection médicale' },
      { slug: 'hygiene-mains', label: 'Hygiène des mains' },
      { slug: 'soin-plaies', label: 'Soin des plaies' },
      { slug: 'bande-sparadrap', label: 'Bande et sparadrap' },
      { slug: 'injection-perfusion', label: 'Injection et perfusion' },
      { slug: 'oxygenotherapie', label: 'Oxygénothérapie' },
      { slug: 'aerosol-nebuliseur', label: 'Aérosol - Nébuliseur' },
    ],
  },
  {
    slug: 'incontinence',
    label: 'Incontinence',
    description: 'Protection absorbante pour adultes, changes complets et matériel de nursing pour le confort.',
    children: [
      { slug: 'couche-adulte', label: 'Couche adulte pour incontinence' },
      { slug: 'sondage-stomie', label: 'Sondage et stomie' },
      { slug: 'soin-nursing', label: 'Soin de nursing' },
    ],
  },
  {
    slug: 'materiel-medical',
    label: 'Matériel médical',
    description: 'Dispositifs médicaux, mobilité, fauteuils, maintien à domicile et diagnostic médical.',
    children: [
      { slug: 'fauteuils-roulants', label: 'Fauteuils roulants' },
      { slug: 'wc-salle-de-bain', label: 'WC et salle de bain médicale' },
      { slug: 'coussin-medical', label: 'Coussin médical' },
      { slug: 'repas', label: 'Repas' },
      { slug: 'fournitures-mobilier', label: 'Fournitures et mobilier médical' },
      { slug: 'diagnostic-medical', label: 'Diagnostic médical' },
      { slug: 'aides-marche', label: 'Aides à la marche' },
      { slug: 'chambre-medicale', label: 'Chambre médicale' },
      { slug: 'aides-transferts', label: 'Aide aux transferts' },
      { slug: 'autonomie', label: 'Autonomie' },
      { slug: 'instruments-equipements', label: 'Instruments et équipements médicaux' },
      { slug: 'urgences-medicales', label: 'Urgences médicales' },
    ],
  },
  {
    slug: 'contention',
    label: 'Contention',
    description: 'Chaussettes, bas et collants de compression veineuse pour femmes et hommes.',
    children: [
      { slug: 'chaussette-femme', label: 'Chaussette de contention Femme' },
      { slug: 'bas-femme', label: 'Bas de contention Femme' },
      { slug: 'bas-homme', label: 'Bas de contention Homme' },
      { slug: 'bandes-contention', label: 'Bandes de contention' },
      { slug: 'collant-homme', label: 'Collant de contention Homme' },
      { slug: 'chaussette-homme', label: 'Chaussette de contention Homme' },
      { slug: 'collants-femme', label: 'Collants de contention pour Femme' },
      { slug: 'accessoires-contention', label: 'Accessoires contention' },
      { slug: 'bas-post-operatoire', label: 'Bas post-opératoire' },
    ],
  },
  {
    slug: 'orthopedie',
    label: 'Orthopédie',
    description: 'Ceintures lombaires, chevillères, genouillères, colliers cervicaux et attelles articulaires.',
    children: [
      { slug: 'ceinture-maintien', label: 'Ceinture de maintien' },
      { slug: 'chevillere-pieds', label: 'Chevillère - Pieds' },
      { slug: 'poignet-pouce-doigt', label: 'Poignet - Pouce - Doigt' },
      { slug: 'collier-cervical', label: 'Collier cervical' },
      { slug: 'genouillere-cuissard', label: 'Genouillère - Cuissard' },
      { slug: 'podologie', label: 'Podologie' },
      { slug: 'coudiere-epauliere', label: 'Coudière - Épaulière' },
    ],
  },
  {
    slug: 'dermocosmetique',
    label: 'Dermocosmétique',
    description: 'Soins dermatologiques formulés pour peaux sensibles, atopiques ou à problèmes.',
    children: [
      { slug: 'visage', label: 'Visage' },
      { slug: 'hygiene', label: 'Hygiène' },
      { slug: 'corps', label: 'Corps' },
      { slug: 'solaires', label: 'Solaires' },
    ],
  },
  {
    slug: 'maintien-domicile',
    label: 'Maintien à domicile',
    description: 'Équipements pour sécuriser le maintien à domicile des personnes âgées ou convalescentes.',
    children: [
      { slug: 'lit-medicalise', label: 'Lit médicalisé et accessoires' },
      { slug: 'prevention-escarres', label: 'Prévention escarres' },
      { slug: 'hygiene-desinfection', label: 'Hygiène et désinfection' },
      { slug: 'confort-positionnement', label: 'Confort et positionnement' },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

export function getSubcategory(categorySlug: string, subcategorySlug: string): { category: Category; subcategory: SubCategory } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.children.find((sub) => sub.slug === subcategorySlug);
  if (!subcategory) return undefined;
  return { category, subcategory };
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
