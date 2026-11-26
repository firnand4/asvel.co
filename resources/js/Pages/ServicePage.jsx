import Seo from '../Components/Seo';
import ArticleBody from '../Components/ArticleBody';
import ThemeToggle from '../Components/ThemeToggle';
import WhatsAppButton from '../Components/WhatsAppButton';
import { LanguageSwitch } from '../Components/Navbar';
import { ProjectCard } from '../Components/sections/Portfolio';
import { LanguageProvider, useLang, waLink } from '../i18n';

// English fields fall back to Indonesian when they are left empty in the admin panel.
const localized = (page, field, lang) => (lang === 'en' && page[`${field}_en`]?.length ? page[`${field}_en`] : page[field]);

function Content({ page, projects, others, settings, seo }) {
    const { lang, t } = useLang();
    const wa = settings?.whatsapp_number || '6281333413109';

    const h1 = localized(page, 'h1', lang);
    const body = localized(page, 'body', lang);
    const process = localized(page, 'process', lang) || [];
    const faq = (localized(page, 'faq', lang) || []).filter(item => item.q && item.a);

    return (
        <>
            <Seo
                seo={seo}
                title={lang === 'en' && seo.title_en ? seo.title_en : seo.title}
                description={lang === 'en' && seo.description_en ? seo.description_en : seo.description}
                lang={lang}
            />

            <header className="border-b border-line bg-page">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
                    <a href="/" className="text-fg font-black text-lg sm:text-xl tracking-tighter lowercase whitespace-nowrap">
                        <span>asvel coding factory</span>
                        <span className="text-accent ml-0.5">.</span>
                    </a>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <LanguageSwitch />
                    </div>
                </div>
            </header>

            <main className="bg-page text-fg">
                <div className="hero-bg">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-12">
                        <nav aria-label="Breadcrumb" className="text-sm text-subtle">
                            <ol className="flex flex-wrap items-center gap-1.5">
                                <li><a href="/" className="hover:text-fg">{t.servicePage.home}</a></li>
                                <li aria-hidden="true">/</li>
                                <li><a href="/#services" className="hover:text-fg">{t.servicePage.services}</a></li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-fg-2">{h1}</li>
                            </ol>
                        </nav>

                        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">{h1}</h1>
                        <p className="mt-4 text-muted">{t.servicePage.basedIn}</p>

                        <a
                            href={waLink(wa, t.wa.message)}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-800 transition-colors"
                        >
                            {t.servicePage.ctaButton} →
                        </a>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                    <div className="max-w-3xl text-fg-2 leading-relaxed">
                        <ArticleBody content={body} />
                    </div>

                    {process.length > 0 && (
                        <section className="mt-16" aria-labelledby="process-title">
                            <h2 id="process-title" className="text-2xl md:text-3xl font-bold tracking-tight">{t.servicePage.process}</h2>
                            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {process.map((step, i) => (
                                    <li key={i} className="rounded-lg border border-line-soft bg-surface p-5">
                                        <div className="text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</div>
                                        <h3 className="mt-1 font-semibold">{step.title}</h3>
                                        {step.desc && <p className="mt-1.5 text-sm text-muted leading-relaxed">{step.desc}</p>}
                                    </li>
                                ))}
                            </ol>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section className="mt-16" aria-labelledby="projects-title">
                            <h2 id="projects-title" className="text-2xl md:text-3xl font-bold tracking-tight">{t.servicePage.projects}</h2>
                            <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {projects.map(p => <ProjectCard key={p.id} project={p} t={t} />)}
                            </div>
                        </section>
                    )}

                    {faq.length > 0 && (
                        <section className="mt-16" aria-labelledby="faq-title">
                            <h2 id="faq-title" className="text-2xl md:text-3xl font-bold tracking-tight">{t.servicePage.faq}</h2>
                            <div className="mt-6 divide-y divide-line border-y border-line max-w-3xl">
                                {faq.map((item, i) => (
                                    <details key={i} className="group py-4">
                                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                                            <h3>{item.q}</h3>
                                            <span className="text-subtle transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                                        </summary>
                                        <p className="mt-3 text-fg-2 leading-relaxed">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mt-16 rounded-xl border border-line bg-surface p-6 sm:p-10">
                        <h2 className="text-2xl font-bold tracking-tight">{t.servicePage.ctaTitle}</h2>
                        <p className="mt-2 text-muted">{t.servicePage.ctaText}</p>
                        <p className="mt-1 text-sm text-subtle">{t.servicePage.basedIn}</p>
                        <a
                            href={waLink(wa, t.wa.message)}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-800 transition-colors"
                        >
                            {t.servicePage.ctaButton} →
                        </a>
                    </section>

                    {others.length > 0 && (
                        <nav className="mt-12" aria-labelledby="others-title">
                            <h2 id="others-title" className="text-sm font-semibold text-subtle">{t.servicePage.others}</h2>
                            <ul className="mt-3 flex flex-wrap gap-3">
                                {others.map(o => (
                                    <li key={o.slug}>
                                        <a href={`/layanan/${o.slug}`} className="inline-block rounded-full border border-line px-4 py-2 text-sm text-fg-2 hover:border-fg/40">
                                            {lang === 'en' && o.h1_en ? o.h1_en : o.h1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </main>

            <footer className="border-t border-line bg-page">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-sm text-subtle flex flex-wrap justify-between gap-2">
                    <span>© {new Date().getFullYear()} {settings?.company_name || 'Asvel Coding Factory'}</span>
                    <span>{settings?.office_address}</span>
                </div>
            </footer>

            <WhatsAppButton wa={wa} />
        </>
    );
}

export default function ServicePage({ page, projects = [], others = [], settings = {}, seo = {} }) {
    return (
        <LanguageProvider>
            <Content page={page} projects={projects} others={others} settings={settings} seo={seo} />
        </LanguageProvider>
    );
}
