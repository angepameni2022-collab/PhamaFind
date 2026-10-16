import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Schema.org BreadcrumbList structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://phamafind.cm/',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `https://phamafind.cm${item.href}` : undefined,
      })),
    ],
  };

  return (
    <nav aria-label="Fil d'Ariane" className="py-2 select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-[13px] text-muted">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            <Home size={14} className="shrink-0" />
            <span>Accueil</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li aria-hidden="true">
                <ChevronRight size={13} className="text-slate-400 shrink-0" />
              </li>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-bold text-ink" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
