/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, Star } from 'lucide-react';
import Link from 'next/link';

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
    imdbRating?: string;
    imdbVotes?: string;
    Genre?: string;
}

interface MoviesCarouselProps { 
    type: string;
    title: string;
}

export default function MovieCarousel({ type, title }: MoviesCarouselProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${title}&type=${type}`,
                );
                const data = await response.json();

                if (data.Response === 'True' && data.Search) {
                    const detailedMovies = await Promise.all(
                        data.Search.slice(0, 10).map(async (movie: Movie) => {
                            const detailResponse = await fetch(
                                `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${movie.imdbID}`,
                            );
                            return detailResponse.json();
                        }),
                    );
                    setMovies(detailedMovies);
                }
            } catch (error) {
                setError('Failed to fetch movies: ' + error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [type, title]);

    if (error) {
        return <div className="text-center text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="container mx-auto py-8 lg:px-20 md:px-10">
            <div className="flex justify-between items-center mb-6 px-4">
                <h2 className="text-2xl font-bold">Recommended Movies</h2>
                <Link href="/movies" className="text-[#e5192c] hover:underline">
                    See All &gt;
                </Link>
            </div>

            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full px-4"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                              <CarouselItem
                                  key={index}
                                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                              >
                                  <div className="animate-pulse">
                                      <div className="bg-gray-200 rounded-lg aspect-[2/3]" />
                                      <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
                                      <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
                                  </div>
                              </CarouselItem>
                          ))
                        : movies.map((movie, index) => (
                              <MoviesCarousel key={index} movie={movie} />
                          ))}
                </CarouselContent>
                <CarouselPrevious
                    variant="default"
                    className="absolute left-5 bg-black/60 hover:bg-black/70 rounded-lg size-10 top-1/2 transform -translate-y-1/2"
                />
                <CarouselNext
                    variant="default"
                    className="absolute right-5 bg-black/60 hover:bg-black/70 rounded-lg size-10 top-1/2 transform -translate-y-1/2"
                />
            </Carousel>
        </div>
    );
}

function MoviesCarousel({ movie }: { movie: Movie }) {
    return (
        <CarouselItem
            key={movie.imdbID}
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
        >
            <Card className="border-0 bg-transparent">
                <CardContent className="p-0">
                    <div className="relative">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full aspect-[2/3] object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 py-2 bg-black rounded-b-lg">
                            <div className="flex items-center text-white">
                                {movie.imdbRating ? (
                                    <>
                                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                                        <span className="ml-1 mr-2">
                                            {movie.imdbRating}
                                            /10
                                        </span>
                                        <span className="text-sm opacity-75">
                                            {parseInt(
                                                movie.imdbVotes?.replace(
                                                    /,/g,
                                                    '',
                                                ) || '0',
                                            ).toLocaleString()}{' '}
                                            Votes
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <ThumbsUp className="h-4 w-4" />
                                        <span className="ml-1">
                                            {Math.floor(
                                                Math.random() * 500000,
                                            ).toLocaleString()}{' '}
                                            Likes
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <h3 className="font-semibold mt-3 text-lg leading-tight">
                        {movie.Title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {movie.Genre?.split(',')[0] || 'N/A'}
                    </p>
                </CardContent>
            </Card>
        </CarouselItem>
    );
}