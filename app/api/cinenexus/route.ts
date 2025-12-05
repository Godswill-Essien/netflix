import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const categories = [
  { label: "Trending Now", endpoint: `/trending/all/week` },
  { label: "Top Rated", endpoint: `/movie/top_rated` },
  { label: "Action", endpoint: `/discover/movie?with_genres=28` },
  { label: "Comedy", endpoint: `/discover/movie?with_genres=35` },
  { label: "Horror", endpoint: `/discover/movie?with_genres=27` },
  { label: "Romance", endpoint: `/discover/movie?with_genres=10749` },
];

export async function GET(req: NextRequest) {
  try {
    const results: Record<string, any[]> = {};

    for (const cat of categories) {
      const res = await fetch(`${BASE_URL}${cat.endpoint}?api_key=${API_KEY}`);
      const data = await res.json();
      results[cat.label] = data.results || [];
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch movies" }, { status: 500 });
  }
}

// Fetch trailer for a specific movie
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const movieId = body.movieId;

    if (!movieId) {
      return NextResponse.json({ success: false, error: "movieId is required" }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await res.json();

    const trailer = data.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");

    return NextResponse.json({ success: true, trailerKey: trailer?.key || null });
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch trailer" }, { status: 500 });
  }
}
