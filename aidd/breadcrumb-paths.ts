// Breadcrumb path mappings for all pages

export interface BreadcrumbItem {
  label: string
  path?: string
}

export const breadcrumbPaths: Record<string, BreadcrumbItem[]> = {
  '/': [{ label: 'Home' }],
  '/footprint-explorer': [
    { label: 'Home', path: '/' },
    { label: 'My Footprint' },
    { label: 'Corporate Carbon Footprint' },
    { label: 'Footprint Explorer' },
  ],
  '/footprint-analysis': [
    { label: 'Home', path: '/' },
    { label: 'My Footprint' },
    { label: 'Corporate Carbon Footprint' },
    { label: 'Footprint Analysis' },
  ],
  '/products-catalog': [
    { label: 'Home', path: '/' },
    { label: 'My Footprint' },
    { label: 'Products Carbon Footprint' },
    { label: 'Products Catalog' },
  ],
  '/products-analysis': [
    { label: 'Home', path: '/' },
    { label: 'My Footprint' },
    { label: 'Products Carbon Footprint' },
    { label: 'Products Analysis' },
  ],
  '/supply-chain-explorer': [
    { label: 'Home', path: '/' },
    { label: 'My Footprint' },
    { label: 'Supply Chain Footprint' },
    { label: 'Supply Chain Explorer' },
  ],
  '/supply-chain-analysis': [
    { label: 'Home', path: '/' },
    { label: 'My Footprint' },
    { label: 'Supply Chain Footprint' },
    { label: 'Supply Chain Analysis' },
  ],
  '/strategy-settings': [
    { label: 'Home', path: '/' },
    { label: 'My Reduction Journey' },
    { label: 'Planning Strategy' },
    { label: 'Strategy Settings' },
  ],
  '/levers-library': [
    { label: 'Home', path: '/' },
    { label: 'My Reduction Journey' },
    { label: 'Planning Strategy' },
    { label: 'Levers Library' },
  ],
  '/roadmap-overview': [
    { label: 'Home', path: '/' },
    { label: 'My Reduction Journey' },
    { label: 'Planning Strategy' },
    { label: 'Roadmap Overview' },
  ],
  '/reduction-tracking': [
    { label: 'Home', path: '/' },
    { label: 'My Reduction Journey' },
    { label: 'Progress Tracking' },
    { label: 'Reduction Tracking' },
  ],
  '/financial-analysis': [
    { label: 'Home', path: '/' },
    { label: 'My Reduction Journey' },
    { label: 'Progress Tracking' },
    { label: 'Financial Analysis' },
  ],
  '/teams-dashboard': [
    { label: 'Home', path: '/' },
    { label: 'My Reduction Journey' },
    { label: 'Progress Tracking' },
    { label: 'Teams Dashboard' },
  ],
  '/data-ingestion': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Company Carbon footprint' },
    { label: 'Data Ingestion' },
  ],
  '/footprint-builder': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Company Carbon footprint' },
    { label: 'Footprint Builder' },
  ],
  '/footprint-ef-matching': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Company Carbon footprint' },
    { label: 'Footprint EF Matching' },
  ],
  '/data-set': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Product Carbon Footprint' },
    { label: 'Data Set' },
  ],
  '/computation-engine': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Product Carbon Footprint' },
    { label: 'Computation Engine' },
  ],
  '/ef-hub': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Emission Factors' },
    { label: 'EF Hub' },
  ],
  '/matching-rules': [
    { label: 'Home', path: '/' },
    { label: 'My Data & Computation' },
    { label: 'Emission Factors' },
    { label: 'Matching Rules' },
  ],
  '/reports': [{ label: 'Home', path: '/' }, { label: 'Reports' }],
  '/documentation': [{ label: 'Home', path: '/' }, { label: 'Documentation' }],
  '/contact-support': [{ label: 'Home', path: '/' }, { label: 'Contact Support' }],
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  return breadcrumbPaths[pathname] || [{ label: 'Home', path: '/' }]
}

