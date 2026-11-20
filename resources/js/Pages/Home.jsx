import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import WhatsAppButton from '../Components/WhatsAppButton';
import Hero from '../Components/sections/Hero';
import About from '../Components/sections/About';
import Services from '../Components/sections/Services';
import Portfolio from '../Components/sections/Portfolio';
import Testimonials from '../Components/sections/Testimonials';
import Team from '../Components/sections/Team';
import TechStack from '../Components/sections/TechStack';
import Process from '../Components/sections/Process';
import Blog from '../Components/sections/Blog';
import Contact from '../Components/sections/Contact';
import { LanguageProvider, useLang } from '../i18n';

const defaultSettings = {
    company_name: 'Asvel Coding Factory',
    email: 'firnanda.aap@gmail.com',
    whatsapp: '+62 813-3341-3109',
    whatsapp_number: '6281333413109',
    office_address: 'Malang, Jawa Timur, Indonesia',
    office_hours: '24/7',
};

function HomeContent({ team, services, portfolio, blogPosts, testimonials, techStacks, settings, stats }) {
    const { lang, t } = useLang();
    const s = { ...defaultSettings, ...(settings || {}) };

    // Admin-edited texts are stored in Indonesian; English falls back to the dictionary.
    const pick = (value, fallback) => (lang === 'id' && value ? value : fallback);
    const copy = {
        tagline: pick(s.tagline, t.hero.title),
        subheadline: pick(s.subheadline, t.hero.subtitle),
        about_intro: pick(s.about_intro, t.about.intro),
        vision: pick(s.vision, t.about.visionText),
        mission: pick(s.mission, t.about.missionText),
    };

    return (
        <>
            <Head>
                <title>{t.meta.title}</title>
                <meta head-key="description" name="description" content={t.meta.description} />
            </Head>

            <Navbar />

            <main>
                <Hero settings={s} copy={copy} stats={stats} hasPortfolio={portfolio.length > 0} />
                <About copy={copy} />
                <Services services={services} />
                <Portfolio projects={portfolio} />
                <Testimonials testimonials={testimonials} />
                <Team team={team} />
                <TechStack techStack={techStacks} />
                <Process />
                <Blog posts={blogPosts} />
                <Contact settings={s} />
            </main>

            <Footer settings={s} copy={copy} />
            <WhatsAppButton wa={s.whatsapp_number} />
        </>
    );
}

export default function Home({
    team = [],
    services = [],
    portfolio = [],
    blogPosts = [],
    testimonials = [],
    techStacks = [],
    settings = {},
    stats = {},
}) {
    return (
        <LanguageProvider>
            <HomeContent {...{ team, services, portfolio, blogPosts, testimonials, techStacks, settings, stats }} />
        </LanguageProvider>
    );
}
