export default function Footer({ settings }) {
    return (
        <footer className="bg-[#05050A] text-gray-400 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-indigo-900/10 rounded-[100%] blur-[80px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* TOP GRID */}
                <div className="grid md:grid-cols-4 gap-10 mb-12">

                    {/* COMPANY */}
                    <div>
                        <a href="#hero" className="text-white font-black text-3xl tracking-tighter lowercase mb-6 inline-block flex items-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-300 to-indigo-400">asvel</span>
                            <span className="text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] ml-0.5">.</span>
                        </a>

                        <p className="text-[13px] leading-relaxed text-gray-500">
                            {settings?.subheadline}
                        </p>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h4 className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-5">Services</h4>
                        <ul className="space-y-3 text-[13px]">
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Web System Architecture</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Mobile Client Apps</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">AI & Computer Vision</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Data Engineering</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">API Integration</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-5">Command Center</h4>
                        <ul className="space-y-3 text-[13px]">
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Portfolio Log</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Active Nodes</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Knowledge Base</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Secure Contact</li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-5">Access Points</h4>

                        <div className="space-y-3 text-[13px] font-mono">
                            <div className="flex items-center gap-2"><span className="text-cyan-400">@</span> {settings?.email}</div>
                            <div className="flex items-center gap-2"><span className="text-cyan-400">#</span> {settings?.whatsapp}</div>
                            <div className="flex items-center gap-2"><span className="text-cyan-400">&gt;</span> {settings?.office_address}</div>
                        </div>

                        <a
                            href={`https://wa.me/${settings?.whatsapp_number}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 mt-6 px-4 py-2 border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white rounded-sm text-xs font-mono uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Secure_Chat
                        </a>
                    </div>

                </div>

                {/* DIVIDER */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-gray-600">

                    <div>
                        © {new Date().getFullYear()} {settings?.company_name} // ALL_RIGHTS_RESERVED // SYSTEM_ONLINE
                    </div>

                    <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Privacy_Protocol</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Terms_Of_Service</a>
                    </div>

                </div>

            </div>

        </footer>
    );
}