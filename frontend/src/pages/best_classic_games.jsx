import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function BestClassicGamesPage() {
    const router = useRouter();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => router.pathname === path;

    return (
        <>
            <Head>
                <title>The Best Classic Games Of All Time | DEALSCRAPER</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#0b1326] text-[#dae2fd] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
                <nav className="fixed top-0 z-50 w-full bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/15 shadow-2xl shadow-slate-950/50">
                    <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-6 sm:px-8 font-medium tracking-wide">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="bg-gradient-to-br from-violet-300 to-blue-500 bg-clip-text text-2xl font-bold tracking-tighter text-transparent transition-transform duration-200 hover:scale-105">
                                DEALSCRAPER
                            </Link>
                            <div className="hidden items-center gap-8 md:flex">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`transition-colors ${
                                            isActive(link.path)
                                                ? 'border-b-2 border-violet-500 pb-1 text-violet-300'
                                                : 'text-slate-400 hover:text-slate-100'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/')}
                                className="rounded-full p-2 text-violet-400 transition-all duration-200 hover:bg-slate-800/40 active:scale-95"
                                aria-label="Go home"
                            >
                                <span className="material-symbols-outlined">home</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="flex-1 pt-20">
                    <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
                        <img
                            alt="Classic games collage"
                            src="https://i0.wp.com/www.oldschoolgamermagazine.com/wp-content/uploads/2022/12/exp1.png?resize=602%2C545&ssl=1"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1326]" />
                    </section>

                    <article className="relative mx-auto -mt-32 max-w-4xl px-6 pb-24">
                        <div className="glass-effect rounded-xl border border-[#494454]/10 bg-[#171f33]/60 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-12">
                            <div className="mb-6">
                                <span className="rounded-full bg-[#00a74b] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#003111]">
                                    Editorial Guide
                                </span>
                            </div>

                            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#dae2fd] md:text-5xl lg:text-6xl">
                                The Best Classic Games Of All Time
                            </h1>

                            <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-[#494454]/10 pb-8 text-sm uppercase tracking-wider text-[#cbc3d7]">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined scale-75 text-[#d0bcff]">edit_note</span>
                                    <span>
                                        By <strong className="text-[#dae2fd]">DEALSCRAPER Editorial</strong>
                                    </span>
                                </div>
                                <span className="hidden text-[#494454] opacity-30 sm:inline">|</span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined scale-75 text-[#d0bcff]">calendar_today</span>
                                    <span>May 19, 2026</span>
                                </div>
                                <span className="hidden text-[#494454] opacity-30 sm:inline">|</span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined scale-75 text-[#d0bcff]">schedule</span>
                                    <span>7 Min Read</span>
                                </div>
                            </div>

                            <div className="space-y-8 text-lg leading-relaxed text-[#dae2fd]/90">
                                <p className="first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:text-[#d0bcff]">
                                    Few cultural artifacts capture the passage of time like classic video games. They shaped genres, defined console generations, and still influence designers and players today. This list celebrates enduring titles across arcades, consoles, and PCs—games that introduced bold ideas, unforgettable moments, and gameplay that still feels rewarding.
                                </p>

                                <p>
                                    What makes a game "classic" varies, but in general it comes down to influence, endurance, memorability, and accessibility. Classics introduced mechanics others copied, remained fun across decades, left lasting impressions with music or characters, and were easy to pick up while offering depth for mastery.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">Top Classics (in no strict order)</h2>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Tetris (1984)</h3>
                                    <p>
                                        Why it matters: Elegant, infinite puzzle design with instant clarity—one of the purest gameplay experiences. Enduring appeal: Universal accessibility; perfect for short or long plays.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Super Mario Bros. (1985)</h3>
                                    <p>
                                        Why it matters: Defined platformers and polished level design, with tight controls and iconic world-building. Enduring appeal: Jam-packed with secrets and design lessons still taught today.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">The Legend of Zelda (1986)</h3>
                                    <p>
                                        Why it matters: Open exploration, inventory-based progression, and emergent problem solving. Enduring appeal: Sense of discovery and adventurous tone that spawned an entire franchise.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Pac-Man (1980)</h3>
                                    <p>
                                        Why it matters: Mass-appeal arcade design, character-driven presentation, and pattern-based mastery. Enduring appeal: Immediate pick-up-and-play fun; culturally iconic.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Doom (1993)</h3>
                                    <p>
                                        Why it matters: Popularized the first-person shooter and fast, mechanical firefights. Enduring appeal: Modding community and momentum-driven combat keep it alive.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Final Fantasy VII (1997)</h3>
                                    <p>
                                        Why it matters: Brought cinematic storytelling and scope to JRPGs for Western audiences. Enduring appeal: Memorable characters, soundtrack, and emotional stakes.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Chrono Trigger (1995)</h3>
                                    <p>
                                        Why it matters: Innovative multiple endings, active-time battle system, and polished pacing. Enduring appeal: Tight storytelling with time-travel mechanics that still feel fresh.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Sonic the Hedgehog (1991)</h3>
                                    <p>
                                        Why it matters: Fast-paced platforming that contrasted Mario’s precision with speed-based flow. Enduring appeal: Level design built around momentum and risk-reward routes.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Street Fighter II (1991)</h3>
                                    <p>
                                        Why it matters: Defined the competitive fighting game template—special moves, match rounds, and character matchups. Enduring appeal: Competitive depth and a thriving tournament culture.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Half-Life (1998)</h3>
                                    <p>
                                        Why it matters: Narrative through level design and scripted events; merged storytelling with action. Enduring appeal: Immersive worldbuilding and pacing that influenced modern shooters.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Sid Meier’s Civilization (1991)</h3>
                                    <p>
                                        Why it matters: Turn-based empire-building with layered strategy and emergent stories. Enduring appeal: "Just one more turn" design proves endlessly replayable.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">Metal Gear Solid (1998)</h3>
                                    <p>
                                        Why it matters: Brought cinematic presentation and stealth-focused gameplay together in a tightly authored experience. Enduring appeal: Memorable characters, boss battles, and narrative flourishes.
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">Honorable Mentions</h2>
                                <p>
                                    Pong, Castlevania, Mega Man 2, The Secret of Monkey Island, Prince of Persia, Pokémon Red/Blue—each contributed meaningfully to genres and player expectations.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">Why These Games Still Matter</h2>
                                <p>
                                    Design lessons: Clear feedback loops, pacing, and level architecture from classics are templates for modern games. Cultural touchstones: Music, characters, and moments that cross generations. Community and mods: Many classics live on because people keep reinterpreting them.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">How to Experience Classics Today</h2>
                                <p>
                                    Emulation and legal re-releases make originals accessible—opt for official remasters when possible. Play collections for quality-of-life improvements. Try speedruns, challenge modes, or community mods to see new depths in old systems.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">Conclusion</h2>
                                <p>
                                    Classic games are less about nostalgia and more about clarity of design. They endure because they do one thing exceptionally well—whether that’s perfecting a single mechanic, telling an unforgettable story, or inventing a new way to play. If you want to explore game design or simply enjoy great play, these classics are essential.
                                </p>
                            </div>

                            <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#494454]/10 pt-8 md:flex-row">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 rounded-full border border-[#494454]/10 bg-[#2d3449] px-6 py-2 transition-all hover:bg-[#d0bcff]/20">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                                            thumb_up
                                        </span>
                                        <span className="text-sm font-bold tracking-tight">1.2k</span>
                                    </button>

                                    <button className="flex items-center gap-2 rounded-full border border-[#494454]/10 bg-[#2d3449] px-6 py-2 transition-all hover:bg-[#0566d9]/20">
                                        <span className="material-symbols-outlined text-sm">share</span>
                                        <span className="text-sm font-bold tracking-tight">Share</span>
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-widest text-[#cbc3d7]">
                                    <span>Related Tags:</span>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        Classic Games
                                    </a>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        Retro
                                    </a>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        Game Design
                                    </a>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        Editorial
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
}
