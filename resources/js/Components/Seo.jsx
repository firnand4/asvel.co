import { Head } from '@inertiajs/react';

// Head tags for public pages. `seo` comes from App\Support\Seo (canonical/og URLs built from APP_URL);
// `title`/`description` override it, e.g. with the English text when that language is selected.
export default function Seo({ seo = {}, title, description, lang = 'id' }) {
    const t = title || seo.title;
    const d = description || seo.description;

    return (
        <Head>
            <title>{t}</title>
            <meta head-key="description" name="description" content={d} />
            {seo.canonical && <link head-key="canonical" rel="canonical" href={seo.canonical} />}

            <meta head-key="og:type" property="og:type" content={seo.type || 'website'} />
            <meta head-key="og:site_name" property="og:site_name" content="Asvel Coding Factory" />
            <meta head-key="og:locale" property="og:locale" content={lang === 'en' ? 'en_US' : 'id_ID'} />
            <meta head-key="og:title" property="og:title" content={t} />
            <meta head-key="og:description" property="og:description" content={d} />
            {seo.canonical && <meta head-key="og:url" property="og:url" content={seo.canonical} />}
            {seo.image && <meta head-key="og:image" property="og:image" content={seo.image} />}

            <meta head-key="twitter:card" name="twitter:card" content="summary" />
            <meta head-key="twitter:title" name="twitter:title" content={t} />
            <meta head-key="twitter:description" name="twitter:description" content={d} />
        </Head>
    );
}
