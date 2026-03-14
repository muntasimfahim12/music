/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Filter, X, Play } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPage = () => {
    const [allAlbums, setAllAlbums] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter States
    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(100);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const itemsPerPage = 6;

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await axios.get('/data/music.json');
                setAllAlbums(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching music data:", error);
                setLoading(false);
            }
        };
        fetchMusic();
    }, []);

    const filteredAlbums = useMemo(() => {
        return allAlbums.filter(album => {
            const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                album.artist.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFormat = selectedFormats.length === 0 ||
                album.formats.some((f: any) => selectedFormats.includes(f.type));
            const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(album.main_genre);
            const matchesPrice = album.formats[0]?.price <= priceRange;
            const matchesYear = !selectedYear || album.release_year === selectedYear;

            return matchesSearch && matchesFormat && matchesGenre && matchesPrice && matchesYear;
        });
    }, [allAlbums, searchQuery, selectedFormats, selectedGenres, priceRange, selectedYear]);

    const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
    const currentAlbums = filteredAlbums.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleFilter = (item: string, list: string[], setList: any) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedFormats([]);
        setSelectedGenres([]);
        setPriceRange(100);
        setSelectedYear(null);
    };

    if (loading) return (
        <div className="bg-[#050505] min-h-screen flex items-center justify-center">
            <div className="text-[#FF4D3D] judson-bold text-2xl animate-pulse tracking-widest uppercase italic">Loading Discography...</div>
        </div>
    );

    const FilterContent = () => (
        <div className="space-y-10">
            {/* Format Filter */}
            <div>
                <h3 className="inter-bold text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-6 flex justify-between items-center">
                    Format <ChevronDown size={12} className="text-zinc-600" />
                </h3>
                <div className="space-y-4">
                    {['Digital Download', 'Vinyl LP', 'CD', 'Cassette'].map((item) => (
                        <label key={item} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="hidden" onChange={() => toggleFilter(item, selectedFormats, setSelectedFormats)} />
                                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-all ${selectedFormats.includes(item) ? 'bg-[#FF4D3D] border-[#FF4D3D]' : 'border-white/10 group-hover:border-white/30'}`}>
                                    {selectedFormats.includes(item) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className={`inter-medium text-xs transition-colors ${selectedFormats.includes(item) ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{item}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Genre Filter */}
            <div className="border-t border-white/5 pt-8">
                <h3 className="inter-bold text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-6">Genre</h3>
                <div className="space-y-4">
                    {['Synthwave', 'Ambient', 'Industrial', 'Experimental'].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="hidden" onChange={() => toggleFilter(item, selectedGenres, setSelectedGenres)} />
                            <div className={`w-4 h-4 border rounded-sm transition-all ${selectedGenres.includes(item) ? 'bg-[#FF4D3D] border-[#FF4D3D]' : 'border-white/10 group-hover:border-white/30'}`} />
                            <span className={`inter-medium text-xs transition-colors ${selectedGenres.includes(item) ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="border-t border-white/5 pt-8">
                <h3 className="inter-bold text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-6 text-white">Price: <span className="text-[#FF4D3D]">${priceRange}</span></h3>
                <input type="range" min="0" max="100" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FF4D3D]" />
            </div>

            {/* Year Filter */}
            <div className="border-t border-white/5 pt-8 pb-10">
                <h3 className="inter-bold text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-6">Release Year</h3>
                <div className="flex flex-wrap gap-2">
                    {['2024', '2023', '2022', 'Archive'].map((year) => (
                        <button key={year} onClick={() => setSelectedYear(selectedYear === year ? null : year)} className={`px-4 py-2 rounded-full text-[10px] inter-bold transition-all border ${selectedYear === year ? 'bg-[#FF4D3D] border-[#FF4D3D] text-white' : 'border-white/5 text-zinc-500 hover:border-white/20'}`}>
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <main className="bg-[#050505] min-h-screen text-white p-4 md:p-12 selection:bg-[#FF4D3D]">
            <div className="max-w-[1400px] mx-auto">

                {/* --- Modern Header --- */}
                <header className="relative mb-12 md:mb-20 overflow-hidden rounded-[24px] md:rounded-[40px] border border-white/5 bg-[#0A0A0A]">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF4D3D]/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <nav className="flex items-center gap-2 text-[9px] md:text-[10px] inter-bold uppercase tracking-[0.3em] mb-4">
                                <Link href="/" className="text-zinc-600 hover:text-white transition-colors">Home</Link>
                                <span className="w-1 h-1 rounded-full bg-[#FF4D3D]" />
                                <span className="text-[#FF4D3D]">Discography</span>
                            </nav>
                            <h1 className="judson-bold text-3xl md:text-5xl tracking-tighter leading-none mb-4">Selected Records</h1>
                            <p className="inter-medium text-zinc-500 text-sm max-w-sm leading-relaxed">Curated analog synthesis and sonic experimentalism since 2020.</p>
                        </div>
                        <div className="flex gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
                            <div>
                                <p className="text-[9px] inter-bold text-zinc-600 uppercase tracking-widest mb-1">Catalog</p>
                                <p className="judson-bold text-3xl md:text-4xl">{allAlbums.length}</p>
                            </div>
                            <div>
                                <p className="text-[9px] inter-bold text-zinc-600 uppercase tracking-widest mb-1">Status</p>
                                <p className="judson-bold text-3xl md:text-4xl text-[#FF4D3D]">Active</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- Search & Mobile Filter Trigger --- */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF4D3D] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title, artist or genre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 md:py-5 pl-12 pr-4 inter-medium text-sm focus:outline-none focus:border-[#FF4D3D]/30 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center justify-center gap-3 bg-white text-black rounded-2xl py-4 inter-bold text-xs uppercase tracking-widest"
                    >
                        <Filter size={16} /> Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* --- Sidebar (Desktop) --- */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-10 h-fit bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8">
                        <FilterContent />
                    </aside>

                    {/* --- Main Grid --- */}
                    <section className="lg:col-span-9">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-zinc-500 inter-bold text-[10px] uppercase tracking-[0.2em]">
                                Showing <span className="text-white">{filteredAlbums.length}</span> Releases
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                            <AnimatePresence mode='popLayout'>
                                {currentAlbums.map((album, idx) => (
                                    <motion.div
                                        key={album.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    >
                                        <Link href={`/music/${album.id}`} className="group block relative">
                                            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0A0A0A] border border-white/5 mb-5 shadow-2xl">
                                                <Image
                                                    src={album.cover_image}
                                                    alt={album.title}
                                                    fill
                                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                                    onError={(e: any) => {
                                                        e.currentTarget.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500";
                                                    }}
                                                />

                                                {/* Labels */}
                                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                    {album.tag && (
                                                        <span className={`px-3 py-1 rounded-full inter-bold text-[8px] uppercase tracking-widest backdrop-blur-md shadow-lg
                                                            ${album.tag === 'NEW RELEASE' ? 'bg-[#FF4D3D] text-white' :
                                                                album.tag === 'SOLD OUT' ? 'bg-black/60 text-zinc-400' : 'bg-[#FFD166] text-black'}`}>
                                                            {album.tag}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Hover Action */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                                        <Play size={20} fill="currentColor" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h4 className="inter-bold text-base text-white group-hover:text-[#FF4D3D] transition-colors line-clamp-1">{album.title}</h4>
                                                    <span className="inter-bold text-sm text-zinc-400">${album.formats[0]?.price}</span>
                                                </div>
                                                <p className="inter-medium text-[11px] text-zinc-500 uppercase tracking-widest">
                                                    {album.artist} <span className="mx-2 opacity-30">•</span> {album.release_year}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
                                <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1} className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all">
                                    <ChevronLeft size={20} />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`w-12 h-12 rounded-2xl inter-bold text-xs transition-all ${currentPage === i + 1 ? 'bg-[#FF4D3D] text-white shadow-lg shadow-[#FF4D3D]/20' : 'bg-[#0A0A0A] border border-white/5 text-zinc-500 hover:border-white/20'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages} className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* --- Mobile Filter Side Drawer --- */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-[#0A0A0A] border-l border-white/10 z-[100] p-8 overflow-y-auto lg:hidden"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="judson-bold text-3xl">Filters</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
                            </div>
                            <FilterContent />
                            <button
                                onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }}
                                className="w-full mt-6 py-4 border border-[#FF4D3D] text-[#FF4D3D] inter-bold text-[10px] uppercase tracking-widest rounded-xl"
                            >
                                Reset All
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
};

export default MusicPage;