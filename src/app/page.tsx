"use client"

import { useRouter, useSearchParams  } from 'next/navigation'

import Header from "@/components/header";
import CustomCarousel from "@/components/carousel";
import MoviesCarousel from "@/components/movies-carousel";
import Footer from '@/components/footer';

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const type = searchParams.get('type') || 'movie';
    const title = searchParams.get('title') || 'movie';

    const updateSearchParams = (newType: string, newTitle: string) => {
        const params = new URLSearchParams();
        if (newType) params.set('type', newType);
        if (newTitle) params.set('title', newTitle);
        router.push(`/?${params.toString()}`);
    };

    return (
        <main className="min-h-screen space-y-4 pb-16">
            <Header onUpdateSearchParams={updateSearchParams} type={type} title={title} />
            <CustomCarousel />
            <MoviesCarousel type={type} title={title} />
            <Footer />
        </main>
    );
}
