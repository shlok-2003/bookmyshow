'use client';

import { useSearchParams } from 'next/navigation';
import MoviesCarousel from '@/components/movies-carousel';

export default function MoviesSection() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'movie';
    const title = searchParams.get('title') || 'movie';

    return <MoviesCarousel type={type} title={title} />;
}
