"use client";

import React, { useEffect, useState } from "react";
import { Play, Info, X } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";

// Movie interface
interface Movie {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
}

// Constants
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/original";

// MovieCard component
const MovieCard: React.FC<{ movie: Movie; onClick: (movie: Movie) => void }> = ({ movie, onClick }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer hover:scale-105 transition"
        onClick={() => onClick(movie)}
    >
        <img
            src={`${IMG}${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-md"
        />
        <p className="text-white/80 text-sm mt-2 truncate">{movie.title || movie.name}</p>
    </motion.div>
);

// Main HomePage component
const HomePage: React.FC = () => {
    const [hero, setHero] = useState<Movie | null>(null);
    const [moviesByCat, setMoviesByCat] = useState<Record<string, Movie[]>>({});
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    // Fetch movies by categories
    useEffect(() => {
        const categories = [
            { label: "Trending Now", endpoint: `/trending/all/week?api_key=${API_KEY}` },
            { label: "Top Rated", endpoint: `/movie/top_rated?api_key=${API_KEY}` },
            { label: "Action", endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
            { label: "Comedy", endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
            { label: "Horror", endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=27` },
            { label: "Romance", endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10749` },
        ];

        const fetchAll = async () => {
            const results: Record<string, Movie[]> = {};
            for (const cat of categories) {
                const res = await fetch(`${BASE_URL}${cat.endpoint}`);
                const data = await res.json();
                results[cat.label] = data.results || [];
            }
            setMoviesByCat(results);

            const trending = results["Trending Now"];
            if (trending && trending.length) setHero(trending[Math.floor(Math.random() * trending.length)]);
        };

        fetchAll();
    }, []);

    // Fetch trailer for selected movie
    useEffect(() => {
        if (!selectedMovie) return;
        const fetchTrailer = async () => {
            const res = await fetch(`${BASE_URL}/movie/${selectedMovie.id}/videos?api_key=${API_KEY}`);
            const data = await res.json();
            const trailer = data.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
            setTrailerKey(trailer?.key || null);
        };
        fetchTrailer();
    }, [selectedMovie]);

    const handlePlay = () => {
        if (trailerKey) window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    };

    const handleInfo = () => {
        alert(selectedMovie?.overview || "No description available");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black px-6 py-4 flex justify-between items-center">
                <h1 className="netflix"></h1>
                <Link
                    href="/profile"
                    className="font-sans font-bold py-2 px-4 rounded-md bg-gradient-to-l from-red-700 to-red-700 transition-all duration-500 ease-in-out hover:opacity-75"
                >
                    Profile
                </Link>
            </header>

            {/* Hero Section */}
            {hero && (
                <section
                    className="h-[70vh] sm:h-[75vh] md:h-[80vh] bg-cover bg-center flex flex-col justify-center px-6 sm:px-10"
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url(${IMG}${hero.backdrop_path})`,
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold max-w-xl"
                    >
                        {hero.title || hero.name}
                    </motion.h2>
                    <p className="text-sm sm:text-lg max-w-md mt-3 text-white/70 line-clamp-3">{hero.overview}</p>
                    <div className="flex gap-4 mt-4 sm:mt-6">
                        <button
                            onClick={handlePlay}
                            className="flex items-center gap-2 bg-white text-black px-5 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:opacity-90 transition"
                        >
                            <Play size={16} /> Play
                        </button>
                        <button
                            onClick={handleInfo}
                            className="flex items-center gap-2 bg-white/20 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-md border border-white/20 hover:bg-white/30 transition"
                        >
                            <Info size={16} /> More Info
                        </button>
                    </div>
                </section>
            )}

            {/* Movie Rows */}
            <main className="mt-6 sm:mt-10 px-4 sm:px-6 md:px-10 space-y-8 sm:space-y-12 pb-20">
                {Object.keys(moviesByCat).map((label) => (
                    <div key={label}>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{label}</h3>
                        <Swiper
                            slidesPerView={2.2}
                            spaceBetween={12}
                            navigation={{
                                nextEl: ".swiper-button-next-custom",
                                prevEl: ".swiper-button-prev-custom",
                            }}
                            modules={[Navigation]}
                            className="relative"
                            breakpoints={{
                                480: { slidesPerView: 3, spaceBetween: 16 },
                                640: { slidesPerView: 3.5, spaceBetween: 16 },
                                768: { slidesPerView: 4, spaceBetween: 18 },
                                1024: { slidesPerView: 5, spaceBetween: 20 },
                                1280: { slidesPerView: 6, spaceBetween: 22 },
                            }}
                        >
                            {moviesByCat[label]?.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard movie={movie} onClick={setSelectedMovie} />
                                </SwiperSlide>
                            ))}

                            {/* Custom navigation buttons */}
                            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black p-2 rounded-full text-white cursor-pointer hover:opacity-80">
                                <IoChevronBack />
                            </div>
                            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black p-2 rounded-full text-white cursor-pointer hover:opacity-80">
                                <IoChevronForwardSharp />
                            </div>
                        </Swiper>
                    </div>
                ))}
            </main>

            {/* Movie Modal */}
            {selectedMovie && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 overflow-scroll sm:px-6">
                    <div className="bg-black overflow-scroll rounded-lg w-full max-w-2xl max-h-[50vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col relative p-6">
                        <button
                            className="absolute top-4 right-4 text-white p-2 hover:text-red-500 z-50"
                            onClick={() => {
                                setSelectedMovie(null);
                                setTrailerKey(null);
                            }}
                        >
                            <X size={24} />
                        </button>

                        {/* Description only, no image */}
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{selectedMovie.title || selectedMovie.name}</h2>
                        <p className="text-white/80 mb-4 line-clamp-6">{selectedMovie.overview}</p>

                        {trailerKey && (
                            <div className="mb-4 aspect-video w-full">
                                <iframe
                                    className="w-full h-full rounded-md"
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    title="Trailer"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        <div className="flex gap-4 mt-2 sm:mt-4 flex-wrap">
                            <button
                                onClick={handlePlay}
                                className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
                            >
                                <Play size={18} /> Watch
                            </button>
                            <button
                                onClick={() => {
                                    if (trailerKey) window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
                                }}
                                className="flex items-center gap-2 bg-green-600 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
                            >
                                ⬇ Download
                            </button>
                            <button
                                className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-md border border-white/20 hover:bg-white/30 transition"
                                onClick={() => {
                                    setSelectedMovie(null);
                                    setTrailerKey(null);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>



            )}

        <footer className=" rounded-2xl backdrop-blur-3xl text-white font-serif py-8 px-4 sm:px-10 mt-14 shadow-2xl relative overflow-hidden">
  {/* Decorative circles */}
  <div className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 bg-red-600 opacity-20 rounded-full animate-pulse"></div>
  <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-red-600 opacity-15 rounded-full animate-pulse"></div>

  <div className="flex flex-col justify-center items-center gap-3">
    <p className="opacity-100 text-center text-[18px] sm:text-[27px] font-bold bg-gradient-to-r from-red-800 to-red-800 bg-clip-text text-transparent animate-bounce">
      Get In Contact With Me
    </p>
    <p className="text-center text-[12px] sm:text-[16px] text-white/80 max-w-xs sm:max-w-xl">
      Have some work you need done? <br />
      Hit that message button or contact me through any of the social links below, <br />
      I would love to hear from you. <br /> Please call only when it's urgent, thank you.
    </p>
  </div>

  <div className="flex flex-col items-center justify-center gap- mt-6 rounded-lg w-full">
    <div className="flex gap-4 sm:gap-5 flex-wrap justify-center w-full">
      <div className="shadow-2xl shadow-red-900 transition-all rounded-md duration-500 ease-in-out hover:-translate-y-1 py-2 px-6 bg-gradient-to-r from-red-800 to-red-900">
        <Link href="mailto:godswillessien880@gmail.com" className="text-[16px] sm:text-[20px] font-semibold">
          Reach Me
        </Link>
      </div>

      {/* <div className="shadow-2xl shadow-red-900 transition-all duration-500 ease-in-out hover:-translate-y-1 py-2 px-4 rounded-full bg-gradient-to-r from-red-800 to-red-900 flex items-center justify-center">
        <Link href="#home" className="text-[18px] sm:text-[20px]">
          <FaLongArrowAltUp />
        </Link>
      </div> */}
    </div>

    <div id="contact" className="flex gap-6 sm:gap-10 justify-center items-center mt-4 flex-wrap">
      <Link href="https://wa.me/+2348143399082" className="text-red-500 hover:-translate-y-1 transition duration-300 text-[18px] sm:text-[20px]">
        <IoLogoWhatsapp />
      </Link>
      <Link href="https://t.me/+2348143399082" className="text-red-500 hover:translate-y-1 transition duration-300 text-[18px] sm:text-[20px]">
        <FaTelegramPlane />
      </Link>
      <Link href="https://www.linkedin.com/in/god-swill-essien-727006284" className="text-red-500 hover:-translate-y-1 transition duration-300 text-[18px] sm:text-[20px]">
        <FaLinkedin />
      </Link>
      <Link href="tel:+2348143399082" className="text-red-500 hover:translate-y-1 transition duration-300 text-[18px] sm:text-[20px]">
        <FaPhone />
      </Link>
    </div>

     <p className="mt-4 text-xs sm:text-sm text-white/60">&copy; {new Date().getFullYear()} Netflixx. All rights reserved.</p>
            
  </div>
</footer>



        </div>
    );
};

export default HomePage;
