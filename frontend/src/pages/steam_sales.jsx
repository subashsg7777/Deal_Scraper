import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function SteamSalesPage() {
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
                <title>Steam Sale Calendar 2026: Best Times of the Year to Buy Games Cheaper| DEALSCRAPER</title>
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

                < main className="flex-1 pt-20">
                    <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
                        <img
                            alt="Steam Library Collage"
                            src="https://cdn.akamai.steamstatic.com/store/home/store_home_share.jpg"
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
                                Steam Sale Calendar 2026: Best Times of the Year to Buy Games Cheaper
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
                                    <span>8 Min Read</span>
                                </div>
                            </div>

                            <div className="space-y-8 text-lg leading-relaxed text-[#dae2fd]/90">
    <p className="first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:text-[#d0bcff]">
        Steam sales have become one of the biggest events in PC gaming culture. For millions of players worldwide, these seasonal discounts are the perfect opportunity to build massive game libraries without spending full price. Understanding when Steam sales usually happen can help gamers avoid overpaying and make smarter purchasing decisions throughout the year.
    </p>

    <p>
        Valve follows a fairly predictable yearly cycle of major seasonal events and smaller themed promotions. The largest events include the <span className="font-bold tracking-tight text-[#adc6ff]">Steam Spring Sale</span>, <span className="font-bold tracking-tight text-[#adc6ff]">Summer Sale</span>, <span className="font-bold tracking-tight text-[#adc6ff]">Autumn Sale</span>, and <span className="font-bold tracking-tight text-[#adc6ff]">Winter Sale</span>. During these periods, thousands of games across every genre receive discounts ranging from small 10% cuts to massive 90% reductions on older titles and indie releases.
    </p>

    <div className="my-10 rounded-r-lg border-l-4 border-[#d0bcff] bg-[#131b2e] p-6 italic text-[#cbc3d7]">
        &quot;Experienced PC gamers rarely buy games at launch price unless absolutely necessary. Patience during major Steam sales can save hundreds of dollars every year.&quot;
    </div>

    <p>
        The <span className="font-medium tracking-tight text-[#d0bcff]">Steam Summer Sale</span>, usually taking place around June or July, is widely considered the most important sale of the year. This is when many AAA titles hit their lowest prices and publishers aggressively compete for visibility. Older blockbuster games often receive discounts between 60% and 85%, making the event extremely popular among players waiting to expand their backlog.
    </p>

    <p>
        The <span className="font-medium tracking-tight text-[#d0bcff]">Winter Sale</span>, held during December, is another massive event that brings huge franchise bundles, multiplayer discounts, and DLC offers. Many gamers intentionally wait for Winter Sale because it combines strong discounts with the holiday gaming season when player activity is at its highest. In many cases, Winter Sale pricing matches or even beats the discounts seen earlier in the year.
    </p>

    <p>
        Smaller events throughout the year have also become increasingly important. Steam regularly hosts themed sales focused on genres like strategy games, RPGs, horror titles, racing games, and indie projects. These niche events sometimes provide deeper discounts than major seasonal sales for specific categories of games. Smart buyers often combine wishlist tracking with price history analysis to identify genuine historical lows instead of temporary marketing discounts.
    </p>

    <p>
        This is where <span className="font-bold tracking-tight text-[#adc6ff]">DEALSCRAPER</span> becomes useful for players trying to maximize value. By tracking historical prices across Steam, Epic Games, and Xbox, users can compare discounts, identify true all-time lows, and avoid buying games before larger seasonal price drops arrive. Instead of relying purely on storefront banners, players can make decisions using actual price history data and long-term sale trends.
    </p>

    <p>
        As Steam continues expanding its seasonal promotions every year, understanding the timing of these sales has become one of the easiest ways for gamers to save money. Whether you are waiting for a major AAA release to drop in price or searching for hidden indie gems during themed festivals, planning purchases around Steam’s yearly sale calendar remains one of the smartest habits any PC gamer can develop.
    </p>
</div>

<div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#494454]/10 pt-8 md:flex-row">
    <div className="flex gap-4">
        <button className="flex items-center gap-2 rounded-full border border-[#494454]/10 bg-[#2d3449] px-6 py-2 transition-all hover:bg-[#d0bcff]/20">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                thumb_up
            </span>
            <span className="text-sm font-bold tracking-tight">2.8k</span>
        </button>

        <button className="flex items-center gap-2 rounded-full border border-[#494454]/10 bg-[#2d3449] px-6 py-2 transition-all hover:bg-[#0566d9]/20">
            <span className="material-symbols-outlined text-sm">share</span>
            <span className="text-sm font-bold tracking-tight">Share</span>
        </button>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-widest text-[#cbc3d7]">
        <span>Related Tags:</span>

        <a className="text-[#d0bcff] hover:underline" href="#">
            Steam Sale
        </a>

        <a className="text-[#d0bcff] hover:underline" href="#">
            PC Gaming
        </a>

        <a className="text-[#d0bcff] hover:underline" href="#">
            Discounts
        </a>

        <a className="text-[#d0bcff] hover:underline" href="#">
            Game Deals
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