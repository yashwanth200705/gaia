// Official Authority Seals & Insignias (Vector SVG data URIs, completely replacing AI/stock photos)
export interface AuthoritySeal {
  id: string;
  label: string;
  department: string;
  role: string;
  badgeUrl: string;
  colorName: string;
}

// Generate an SVG data URI for crisp, lightweight, self-contained vector emblems
const createSealSvgUri = (
  bgStart: string,
  bgEnd: string,
  accentColor: string,
  symbol: string,
  code: string,
  title: string
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <defs>
      <linearGradient id="g_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgStart}"/>
        <stop offset="100%" stop-color="${bgEnd}"/>
      </linearGradient>
      <linearGradient id="ring_${code}" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}"/>
        <stop offset="100%" stop-color="#FFFFFF"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="94" fill="url(#g_${code})" stroke="url(#ring_${code})" stroke-width="6"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6"/>
    <circle cx="100" cy="100" r="72" fill="rgba(255,255,255,0.06)"/>
    <!-- Central Icon/Symbol -->
    ${symbol}
    <!-- Official Authority Text Arc or Code -->
    <rect x="52" y="148" width="96" height="24" rx="12" fill="${bgStart}" stroke="${accentColor}" stroke-width="1.5"/>
    <text x="100" y="164" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1.5">${code}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const OFFICIAL_AUTHORITY_SEALS: AuthoritySeal[] = [
  {
    id: 'seal-super-admin',
    label: 'State Directorate Seal',
    department: 'State Directorate of Land Records',
    role: 'SUPER_ADMIN',
    colorName: 'Royal Navy',
    badgeUrl: createSealSvgUri(
      '#1E3A8A',
      '#0F172A',
      '#60A5FA',
      `<path d="M100 42 L132 58 L132 96 C132 118 118 136 100 142 C82 136 68 118 68 96 L68 58 Z" fill="none" stroke="#93C5FD" stroke-width="4"/>
       <circle cx="100" cy="78" r="10" fill="#60A5FA"/>
       <path d="M92 98 L108 98 L104 116 L96 116 Z" fill="#93C5FD"/>
       <path d="M84 122 L116 122" stroke="#BFDBFE" stroke-width="3" stroke-linecap="round"/>`,
      'GAIA-DIR',
      'State Directorate'
    ),
  },
  {
    id: 'seal-district-admin',
    label: 'Collectorate Crest',
    department: 'District Collector & Magistrate',
    role: 'DISTRICT_ADMIN',
    colorName: 'Imperial Amber',
    badgeUrl: createSealSvgUri(
      '#78350F',
      '#451A03',
      '#F59E0B',
      `<path d="M70 126 L130 126" stroke="#FDE68A" stroke-width="4" stroke-linecap="round"/>
       <path d="M100 48 L100 126" stroke="#FCD34D" stroke-width="4"/>
       <path d="M76 66 L124 66" stroke="#F59E0B" stroke-width="3"/>
       <!-- Scales -->
       <path d="M76 66 L64 96 L88 96 Z" fill="none" stroke="#FCD34D" stroke-width="2.5"/>
       <path d="M124 66 L112 96 L136 96 Z" fill="none" stroke="#FCD34D" stroke-width="2.5"/>
       <circle cx="100" cy="46" r="6" fill="#FBBF24"/>`,
      'DIST-ADM',
      'District Collectorate'
    ),
  },
  {
    id: 'seal-gis-officer',
    label: 'GIS Spatial Compass',
    department: 'Geospatial Information Unit',
    role: 'GIS_OFFICER',
    colorName: 'Ocean Cyan',
    badgeUrl: createSealSvgUri(
      '#0369A1',
      '#082F49',
      '#38BDF8',
      `<circle cx="100" cy="92" r="38" fill="none" stroke="#7DD3FC" stroke-width="3"/>
       <polygon points="100,56 109,92 100,85 91,92" fill="#38BDF8"/>
       <polygon points="100,128 109,92 100,85 91,92" fill="#E0F2FE"/>
       <circle cx="100" cy="92" r="5" fill="#0284C7" stroke="#FFFFFF" stroke-width="2"/>
       <line x1="100" y1="50" x2="100" y2="56" stroke="#38BDF8" stroke-width="3"/>
       <line x1="100" y1="128" x2="100" y2="134" stroke="#38BDF8" stroke-width="3"/>
       <line x1="58" y1="92" x2="64" y2="92" stroke="#38BDF8" stroke-width="3"/>
       <line x1="136" y1="92" x2="142" y2="92" stroke="#38BDF8" stroke-width="3"/>`,
      'GAIA-GIS',
      'Geospatial Unit'
    ),
  },
  {
    id: 'seal-revenue-officer',
    label: 'Revenue Cadastral Shield',
    department: 'Department of Revenue (RoR)',
    role: 'REVENUE_OFFICER',
    colorName: 'Crimson Ruby',
    badgeUrl: createSealSvgUri(
      '#881337',
      '#4C0519',
      '#FB7185',
      `<rect x="74" y="56" width="52" height="68" rx="4" fill="none" stroke="#FDA4AF" stroke-width="3.5"/>
       <line x1="84" y1="74" x2="116" y2="74" stroke="#FECDD3" stroke-width="3" stroke-linecap="round"/>
       <line x1="84" y1="88" x2="116" y2="88" stroke="#FECDD3" stroke-width="3" stroke-linecap="round"/>
       <line x1="84" y1="102" x2="104" y2="102" stroke="#FECDD3" stroke-width="3" stroke-linecap="round"/>
       <circle cx="116" cy="108" r="9" fill="#FB7185"/>`,
      'REV-ROR',
      'Revenue Authority'
    ),
  },
  {
    id: 'seal-municipal-officer',
    label: 'Municipal Town Planning Crest',
    department: 'Town Planning & Property Tax',
    role: 'MUNICIPAL_OFFICER',
    colorName: 'Emerald Green',
    badgeUrl: createSealSvgUri(
      '#065F46',
      '#022C22',
      '#34D399',
      `<path d="M72 126 L72 82 L90 68 L108 82 L108 126 Z" fill="none" stroke="#6EE7B7" stroke-width="3"/>
       <rect x="112" y="58" width="22" height="68" fill="none" stroke="#A7F3D0" stroke-width="3"/>
       <rect x="80" y="90" width="8" height="10" fill="#34D399"/>
       <rect x="92" y="90" width="8" height="10" fill="#34D399"/>
       <rect x="118" y="70" width="6" height="8" fill="#34D399"/>
       <rect x="118" y="86" width="6" height="8" fill="#34D399"/>
       <line x1="64" y1="126" x2="140" y2="126" stroke="#6EE7B7" stroke-width="4" stroke-linecap="round"/>`,
      'ULB-PTIN',
      'Municipal Authority'
    ),
  },
  {
    id: 'seal-survey-officer',
    label: 'Geodetic CORS Insignia',
    department: 'Survey, Settlements & Geodesy',
    role: 'SURVEY_OFFICER',
    colorName: 'Royal Violet',
    badgeUrl: createSealSvgUri(
      '#581C87',
      '#2E1065',
      '#C084FC',
      `<circle cx="100" cy="92" r="16" fill="none" stroke="#E9D5FF" stroke-width="3"/>
       <circle cx="100" cy="92" r="5" fill="#C084FC"/>
       <!-- Satellite Orbits -->
       <ellipse cx="100" cy="92" rx="42" ry="18" fill="none" stroke="#C084FC" stroke-width="2.5" transform="rotate(-30 100 92)"/>
       <ellipse cx="100" cy="92" rx="42" ry="18" fill="none" stroke="#DDD6FE" stroke-width="2" stroke-dasharray="4,4" transform="rotate(45 100 92)"/>
       <rect x="128" y="66" width="10" height="6" fill="#F3E8FF" transform="rotate(-30 133 69)"/>`,
      'GNSS-CORS',
      'Geodetic Survey'
    ),
  },
  {
    id: 'seal-field-officer',
    label: 'Ground Truth Rover Badge',
    department: 'Field Rover Inspection Wing',
    role: 'FIELD_OFFICER',
    colorName: 'Cobalt Tactical',
    badgeUrl: createSealSvgUri(
      '#1D4ED8',
      '#1E293B',
      '#38BDF8',
      `<path d="M100 48 C85 48 72 61 72 76 C72 98 100 126 100 126 C100 126 128 98 128 76 C128 61 115 48 100 48 Z" fill="none" stroke="#60A5FA" stroke-width="3.5"/>
       <circle cx="100" cy="74" r="9" fill="#38BDF8"/>
       <circle cx="100" cy="74" r="3" fill="#FFFFFF"/>
       <line x1="68" y1="128" x2="132" y2="128" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>`,
      'FIELD-GPS',
      'Rover Inspection'
    ),
  },
  {
    id: 'seal-department-viewer',
    label: 'Inter-Agency Audit Crest',
    department: 'Geospatial Inquiry & Clearance',
    role: 'DEPARTMENT_VIEWER',
    colorName: 'Graphite Steel',
    badgeUrl: createSealSvgUri(
      '#334155',
      '#0F172A',
      '#94A3B8',
      `<path d="M68 92 C68 92 82 66 100 66 C118 66 132 92 132 92 C132 92 118 118 100 118 C82 118 68 92 68 92 Z" fill="none" stroke="#CBD5E1" stroke-width="3.5"/>
       <circle cx="100" cy="92" r="14" fill="#94A3B8"/>
       <circle cx="100" cy="92" r="6" fill="#0F172A"/>
       <circle cx="104" cy="88" r="2.5" fill="#FFFFFF"/>`,
      'AUDIT-CLR',
      'Clearance Inquiries'
    ),
  },
];
