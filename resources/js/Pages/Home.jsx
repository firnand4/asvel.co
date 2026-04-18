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

export default function Home({
    team = [],
    services = [],
    portfolio = [],
    blogPosts = [],
    testimonials = [],
    techStacks = [],
    settings = {}
}) {
    const defaultSettings = {
        company_name: 'ASVEL',
        tagline: 'asvel coding factory',
        subheadline: 'ASVEL is a premier software house specializing in Web Development, Mobile Apps, AI & Computer Vision, and Data Science.',
        stats_projects: '50+', stats_clients: '30+', stats_years: '5+', stats_satisfaction: '99%',
        about_intro: 'ASVEL is a technology-driven software house founded by engineers who believe that great software is the foundation of every successful modern business.',
        vision: 'To be the leading software partner for businesses across Southeast Asia and beyond.',
        mission: 'Deliver scalable, high-quality software solutions that exceed expectations, on time and on budget.',
        email: 'firnanda.aap@gmail.com', whatsapp: '+62 813-3341-3109', whatsapp_number: '6281333413109', office_address: 'Malang, Jawa Timur, Indonesia', office_hours: '24/7',
    };

    const s = { ...defaultSettings, ...(settings || {}) };

    return (
        <>
            <Head>
                <title>{`${s?.company_name || 'ASVEL'} - ${s?.tagline || ''}`}</title>
                <meta name="description" content={s?.subheadline || ''} />
            </Head>

            <Navbar companyName={s.company_name} />

            <main>
                <Hero settings={s} />
                <About settings={s} />
                <Services services={services} />
                <Portfolio projects={portfolio} />
                <Testimonials testimonials={testimonials} />
                <Team team={team} />
                <TechStack techStacks={techStacks || []} />
                <Process />
                <Blog posts={blogPosts} />
                <Contact settings={s} />
            </main>

            <Footer settings={s} />
            <WhatsAppButton wa={s.whatsapp_number} />
        </>
    );
}
