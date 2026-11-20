import { Head } from '@inertiajs/react';
import WhatsAppButton from '../../Components/WhatsAppButton';
import ThemeToggle from '../../Components/ThemeToggle';
import { LanguageProvider, useLang, waLink } from '../../i18n';

// Article content is plain text: blocks separated by blank lines,
// "## " for headings, "- " for bullet lists, "1. " for numbered lists.
function ArticleBody({ content }) {
    const blocks = (content || '').trim().split(/\n\s*\n/);

    return blocks.map((block, i) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

        if (lines[0]?.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold text-fg mt-12 mb-4">{lines[0].slice(3)}</h2>;
        }
        if (lines.every(l => l.startsWith('- '))) {
            return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-6 marker:text-accent">
                    {lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}
                </ul>
            );
        }
        if (lines.every(l => /^\d+\.\s/.test(l))) {
            return (
                <ol key={i} className="list-decimal pl-6 space-y-2 my-6 marker:text-accent">
                    {lines.map((l, j) => <li key={j}>{l.replace(/^\d+\.\s/, '')}</li>)}
                </ol>
            );
        }
        return <p key={i} className="my-5">{lines.join(' ')}</p>;
    });
}

function Article({ post, settings }) {
    const { lang, t } = useLang();
    const wa = settings?.whatsapp_number || '6281333413109';
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    return (
        <>
            <Head>
                <title>{`${post.title} | Asvel Coding Factory`}</title>
                <meta head-key="description" name="description" content={post.excerpt} />
            </Head>

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

export default function Show({ post, settings = {} }) {
    return (
        <LanguageProvider>
            <Article post={post} settings={settings} />
        </LanguageProvider>
    );
}
