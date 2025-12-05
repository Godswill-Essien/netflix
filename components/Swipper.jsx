'use client';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getTrendingMovies } from "../utils/tmdb";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function NetflixSwiper() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            const data = await getTrendingMovies();
            setMovies(data);
        }
        fetchMovies();
    }, []);

    const getYouTubeSearchLink = (title) => {
        const query = encodeURIComponent(`${title} official trailer`);
        return `https://www.youtube.com/results?search_query=${query}`;
    };

    return (
        <div className="w-full lg:mt-10 min-h-fit md:mt-10 sm:mt-10 max-w-6xl mx-auto p-6 bg-black text-white rounded-lg shadow-2xl relative">
            <h2 className="text-xl font-extrabold mb-6 text-start">Trending Now</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={3.5}
                pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                    renderBullet: (index, className) => {
                        if (index >= 5) return "";
                        return `<span class="${className} bg-black text-white px-2 py-1 rounded-full mx-1 cursor-pointer">${index + 1}</span>`;
                    },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 3.5 },
                }}
                className="rounded-lg overflow-hidden relative"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => setSelectedMovie(movie)}
                        >
                            <img
                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 ease-in "
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {movie.title}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom navigation buttons */}
                <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black p-2 rounded-full text-white cursor-pointer hover:opacity-80 text-lg">
                    <IoChevronBack />
                </div>
                <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black p-2 rounded-full text-white cursor-pointer hover:opacity-80 text-lg">
                    <IoChevronForwardSharp />
                </div>
            </Swiper>

            {/* Movie Detail Modal */}
            {selectedMovie && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-6 z-50">
                    <div className="bg-black background p-6 rounded-lg max-w-md w-full relative z-50">
                        <button
                            className="absolute top-2 right-2 text-white text-xl"
                            onClick={() => setSelectedMovie(null)}
                        >
                            ✖
                        </button>
                        <img
                            src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`}
                            alt={selectedMovie.title}
                            className="w-full h-60 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">{selectedMovie.title}</h3>
                        <p className="text-gray-300 mb-4 text-sm max-h-40 overflow-y-auto">
                            {selectedMovie.overview || "No description available."}
                        </p>
                        <a
                            href={getYouTubeSearchLink(selectedMovie.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-red-600 text-white px-3 py-2 rounded-lg text-center font-semibold text-sm hover:bg-red-700 transition duration-300"
                        >
                            Watch Trailer
                        </a>
                    </div>
                </div>
            )}

            <div className="custom-pagination flex justify-center mt-4 space-x-3"></div>

            <style jsx>{`
                .custom-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: white;
                    opacity: 0.6;
                    transition: opacity 0.3s, transform 0.3s;
                }
                .custom-pagination .swiper-pagination-bullet-active {
                    background: red;
                    opacity: 1;
                    transform: scale(1.3);
                }
                .max-h-40 {
                    max-height: 10rem;
                }
                .overflow-y-auto {
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}
