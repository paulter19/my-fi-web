// Structured Data (JSON-LD) Schema Generators for SEO

export const organizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'My-Fi',
    description: 'Modern personal finance management application',
    url: 'https://my-fi.app',
    logo: 'https://my-fi.app/logo.png',
    sameAs: [
        // Add social media profiles when available
        // 'https://twitter.com/myfi',
        // 'https://facebook.com/myfi',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@my-fi.app',
        contactType: 'Customer Support',
    },
});

export const webApplicationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'My-Fi',
    description: 'Track expenses, manage budgets, and achieve your financial goals with our beautiful and intuitive personal finance platform.',
    url: 'https://my-fi.app',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web, iOS',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    featureList: [
        'Expense Tracking',
        'Budget Management',
        'Account Synchronization',
        'Financial Analytics',
        'Bill Reminders',
        'Income Tracking',
        'Transaction Categorization',
        'Data Encryption',
    ],
    screenshot: 'https://my-fi.app/app-screenshot-1.png',
});

export const faqPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `https://my-fi.app${item.url}`,
    })),
});

export const articleSchema = (article: {
    title: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author?: string;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
        '@type': 'Organization',
        name: article.author || 'My-Fi',
    },
    publisher: {
        '@type': 'Organization',
        name: 'My-Fi',
        logo: {
            '@type': 'ImageObject',
            url: 'https://my-fi.app/logo.png',
        },
    },
});

export const softwareApplicationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'My-Fi',
    operatingSystem: 'Web, iOS',
    applicationCategory: 'FinanceApplication',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250',
    },
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
});
