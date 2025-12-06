import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article';
    ogImage?: string;
    noindex?: boolean;
    structuredData?: object | object[];
}

export const SEO = ({
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage = '/og-image.png',
    noindex = false,
    structuredData
}: SEOProps) => {
    const siteUrl = 'https://my-fi.app'; // Update with actual domain when deployed
    const fullTitle = `${title} | My-Fi - Personal Finance Management`;
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {canonical && <link rel="canonical" href={fullCanonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical || siteUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:site_name" content="My-Fi" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical || siteUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullOgImage} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
                </script>
            )}
        </Helmet>
    );
};
