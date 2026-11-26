import Seo from '../../Components/Seo';
import ArticleBody from '../../Components/ArticleBody';
import WhatsAppButton from '../../Components/WhatsAppButton';
import ThemeToggle from '../../Components/ThemeToggle';
import { LanguageProvider, useLang, waLink } from '../../i18n';

function Article({ post, settings, seo }) {
    const { lang, t } = useLang();
    const wa = settings?.whatsapp_number || '6281333413109';
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    return (
        <>
            <Seo seo={seo} lang={lang} />

            <header className="border-b border-line bg-page">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
                    <a href="/" className="text-fg font-black text-lg sm:text-xl tracking-tighter lowercase whitespace-nowrap">
                        <span>asvel coding factory</span>
                        <span className="text-accent ml-0.5">.</span>
                    </a>
                    <div className="flex items-center gap-3">
                        <a href="/#blog" className="text-sm text-muted hover:text-fg whitespace-nowrap">{t.blog.back}</a>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="bg-page text-fg-2 min-h-screen">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-subtle mb-5">
                        <span className="rounded-full border border-accent/30 bg-accent/10 text-accent px-3 py-0.5">{post.category}</span>
                        {date && <span>{date}</span>}
                        {post.read_time && <span>· {post.read_time}</span>}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-fg leading-tight tracking-tight">{post.title}</h1>
                    <p className="mt-5 text-lg text-muted leading-relaxed">{post.excerpt}</p>

                    <div className="mt-8 text-base leading-relaxed">
                        <ArticleBody content={post.content} />
                    </div>

                    <div className="mt-14 rounded-xl border border-line bg-surface p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-fg">{t.blog.ctaTitle}</h2>
                        <p className="mt-2 text-muted">{t.blog.ctaText}</p>
                        <a
                            href={waLink(wa, t.wa.message)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex mt-6 px-6 py-3 rounded-lg bg-[#25D366] text-gray-950 font-semibold hover:bg-[#1ebe5b] transition-colors"
                        >
                            {t.blog.ctaButton}
                        </a>
                    </div>
                </article>
            </main>

            <WhatsAppButton wa={wa} />
        </>
    );
}

export default function Show({ post, settings = {}, seo = {} }) {
    return (
        <LanguageProvider>
            <Article post={post} settings={settings} seo={seo} />
        </LanguageProvider>
    );
}
