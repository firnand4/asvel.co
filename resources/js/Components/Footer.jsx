import { useLang, waLink } from '../i18n';

export default function Footer({ settings, copy }) {
    const { t } = useLang();

    const companyLinks = ['about', 'portfolio', 'team', 'blog', 'contact'];

    return (
        <footer className="bg-page border-t border-line text-muted pt-16 pb-8 overflow-hidden">


            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

                    <div>
                        <a href="#hero" className="text-fg font-black text-2xl tracking-tighter lowercase mb-6 flex items-center whitespace-nowrap">
                            <span>asvel coding factory</span>
                            <span className="text-accent ml-0.5">.</span>
                        </a>

                        <p className="text-sm leading-relaxed text-subtle">
                            {copy.subheadline}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-fg text-sm font-semibold mb-5">{t.footer.services}</h4>
                        <ul className="space-y-3 text-sm">
                            {t.footer.serviceList.map(item => (
                                <li key={item}>
                                    <a href="#services" className="hover:text-accent transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-fg text-sm font-semibold mb-5">{t.footer.company}</h4>
                        <ul className="space-y-3 text-sm">
                            {companyLinks.map(id => (
                                <li key={id}>
                                    <a href={`#${id}`} className="hover:text-accent transition-colors">{t.nav[id]}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-fg text-sm font-semibold mb-5">{t.footer.contact}</h4>

                        <div className="space-y-3 text-sm">
                            <a href={`mailto:${settings?.email}`} className="block hover:text-accent transition-colors">{settings?.email}</a>
                            <a href={waLink(settings?.whatsapp_number, t.wa.message)} target="_blank" rel="noreferrer" className="block hover:text-accent transition-colors">
                                WhatsApp {settings?.whatsapp}
                            </a>
                            <div>{settings?.office_address}</div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-line pt-6 text-xs text-subtle">
                    © {new Date().getFullYear()} {settings?.company_name}. {t.footer.rights}
                </div>

            </div>

        </footer>
    );
}
