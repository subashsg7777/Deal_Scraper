import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function BestGames2025Page() {
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
                <title>Top 10 Games That Defined 2025 | DEALSCRAPER</title>
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
                            alt="2025 game highlights"
                            src="https://www.gamespot.com/a/uploads/scale_medium/1601/16018044/4565619-ps-plus-september-2025.jpg"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1326]" />
                    </section>

                    <article className="relative mx-auto -mt-32 max-w-4xl px-6 pb-24">
                        <div className="glass-effect rounded-xl border border-[#494454]/10 bg-[#171f33]/60 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-12">
                            <div className="mb-6">
                                <span className="rounded-full bg-[#00a74b] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#003111]">
                                    Year in Review
                                </span>
                            </div>

                            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#dae2fd] md:text-5xl lg:text-6xl">
                                Top 10 Games That Defined 2025
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
                                    <span>6 Min Read</span>
                                </div>
                            </div>

                            <div className="space-y-8 text-lg leading-relaxed text-[#dae2fd]/90">
                                <p className="first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:text-[#d0bcff]">
                                    2025 was a banner year for games: expansive RPGs, tight action experiences, and inventive indies dominated conversations and streaming. Whether you follow big-budget releases or unexpected indie hits, these ten titles stood out for design, ambition, and player impact.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">The List</h2>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">1. The Legend of Zelda: Tears of the Kingdom</h3>
                                    <p>
                                        Why it stood out: Nintendo’s open-world sequel redefined player freedom with clever physics, emergent puzzles, and sprawling verticality. A game that encouraged creativity and discovery.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">2. Baldur’s Gate 3</h3>
                                    <p>
                                        Why it stood out: A CRPG masterpiece with deep player agency, layered narratives, and unforgettable companions. Its tabletop-inspired systems kept players invested for dozens of hours.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">3. Elden Ring</h3>
                                    <p>
                                        Why it stood out: FromSoftware’s open-world souls formula continued to influence designers with its risk-reward exploration, boss design, and atmospheric storytelling.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">4. Starfield</h3>
                                    <p>
                                        Why it stood out: Bethesda’s space RPG impressed players with scope—planetary exploration, shipbuilding, and a sense of scale that rewarded curiosity.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">5. Resident Evil 4 (Remake)</h3>
                                    <p>
                                        Why it stood out: A near-perfect reimagining of a classic—balancing tense encounters with modern pacing and production values.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">6. Hogwarts Legacy</h3>
                                    <p>
                                        Why it stood out: Open-world fantasy with satisfying exploration and a wealth of activities that appealed to both fans and newcomers.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">7. Marvel’s Spider-Man 2</h3>
                                    <p>
                                        Why it stood out: Refined traversal, charismatic characters, and action set-pieces combined into a compelling superhero experience.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">8. Final Fantasy XVI</h3>
                                    <p>
                                        Why it stood out: A bold, cinematic JRPG with mature themes, real-time combat, and a strong narrative focus.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">9. God of War Ragnarök</h3>
                                    <p>
                                        Why it stood out: Emotional storytelling and refined melee combat made it a standout narrative-driven action game.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#adc6ff]">10. Street Fighter 6</h3>
                                    <p>
                                        Why it stood out: Accessible fighting mechanics for newcomers while offering deep competitive systems for veterans—plus a thriving esports presence.
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">Honorable Mentions</h2>
                                <p>
                                    A slew of indie standouts and remasters also earned attention in 2025—short-form gems, narrative experiments, and technical remasters kept the year diverse and exciting.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">How to Experience These Games</h2>
                                <p>
                                    Many of these titles are available across consoles and PC. Check platform exclusivity, look for remasters or definitive editions, and use wishlist alerts or storefront trackers to catch discounts.
                                </p>

                                <h2 className="text-2xl font-bold text-[#d0bcff]">Conclusion</h2>
                                <p>
                                    Whether you chased high-fidelity epics, replayed classics in new forms, or discovered indie surprises, 2025 offered something for every player. These ten games left the biggest impressions—either through ambition, polish, or cultural reach.
                                </p>
                            </div>

                            <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#494454]/10 pt-8 md:flex-row">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 rounded-full border border-[#494454]/10 bg-[#2d3449] px-6 py-2 transition-all hover:bg-[#d0bcff]/20">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                                            thumb_up
                                        </span>
                                        <span className="text-sm font-bold tracking-tight">3.4k</span>
                                    </button>

                                    <button className="flex items-center gap-2 rounded-full border border-[#494454]/10 bg-[#2d3449] px-6 py-2 transition-all hover:bg-[#0566d9]/20">
                                        <span className="material-symbols-outlined text-sm">share</span>
                                        <span className="text-sm font-bold tracking-tight">Share</span>
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-widest text-[#cbc3d7]">
                                    <span>Related Tags:</span>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        2025
                                    </a>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        Game of the Year
                                    </a>

                                    <a className="text-[#d0bcff] hover:underline" href="#">
                                        Yearly Roundup
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
