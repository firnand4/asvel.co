export default function Footer({ settings }) {
    return (
        <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">

            <div className="max-w-6xl mx-auto px-6">

                {/* TOP GRID */}
                <div className="grid md:grid-cols-4 gap-10 mb-12">

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {settings?.company_name || 'ASVEL'}
                        </h3>

                        <p className="text-sm leading-relaxed">
                            {settings?.subheadline}
                        </p>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Web Development</li>
                            <li>Mobile Apps</li>
                            <li>AI & Vision</li>
                            <li>Data Science</li>
                            <li>System Integration</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>About</li>
                            <li>Portfolio</li>
                            <li>Team</li>
                            <li>Blog</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>

                        <div className="space-y-2 text-sm">
                            <div>📧 {settings?.email}</div>
                            <div>📱 {settings?.whatsapp}</div>
                            <div>📍 {settings?.office_address}</div>
                        </div>

                        <a
                            href={`https://wa.me/${settings?.whatsapp_number}`}
                            target="_blank"
                            className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                        >
                            💬 WhatsApp Us
                        </a>
                    </div>

                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">

                    <div>
                        © {new Date().getFullYear()} {settings?.company_name}. All rights reserved.
                    </div>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>

                </div>

            </div>

        </footer>
    );
}