// Structured data schemas for SEO

export const generateArticleSchema = (post: any, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image,
  "datePublished": post.date,
  "dateModified": post.date,
  "author": {
    "@type": "Organization",
    "name": "Ascent Group Construction"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Ascent Group Construction",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ascent-build-bright.lovable.app/src/assets/ascent-logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  }
});

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ascent Group Construction",
  "url": "https://www.ascentgroupconstruction.com",
  "logo": "https://www.ascentgroupconstruction.com/og-image.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-905-555-0100",
    "contactType": "customer service",
    "areaServed": "CA",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://www.facebook.com/ascentgroupconstruction",
    "https://www.linkedin.com/company/ascentgroupconstruction"
  ]
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://www.ascentgroupconstruction.com${item.url}`
  }))
});

export const serviceSchema = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": name,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Ascent Group Construction"
  },
  "description": description,
  "areaServed": {
    "@type": "City",
    "name": "Mississauga"
  }
});


export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
