import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = title ? `${title} | Nexyro IT` : 'Nexyro IT - Engineering the Future Digital World';
    const siteDescription = description || 'Transforming ideas into digital reality with cutting-edge technology solutions.';
    const siteImage = image || '/og-image.jpg';
    const siteUrl = url || 'https://nexyroit.com';

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={keywords || 'web development, AI solutions, UI/UX design, mobile apps'} />
            <meta name="author" content="Nexyro IT" />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Nexyro IT",
                    "url": siteUrl,
                    "logo": "/logo.png",
                    "description": siteDescription,
                    "founders": [
                        {
                            "@type": "Person",
                            "name": "Saad Iqbal"
                        },
                        {
                            "@type": "Person",
                            "name": "Ayaz Rafique"
                        },
                        {
                            "@type": "Person",
                            "name": "Muneeb Anwer"
                        }
                    ],
                    "sameAs": [
                        "https://linkedin.com/company/nexyroit",
                        "https://twitter.com/nexyroit",
                        "https://github.com/nexyroit-Tech"
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default SEO;