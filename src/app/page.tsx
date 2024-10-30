import Footer from '@/components/footer';
import CustomCarousel from '@/components/carousel';
import SearchSection from '@/components/search-section';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import MoviesSection from '@/components/movie-section';

export default function Home() {
    return (
        <main className="min-h-screen space-y-4 pb-16">
            <Suspense
                fallback={
                    <div className="h-screen flex items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin" />
                    </div>
                }
            >
                <SearchSection />
            </Suspense>
            <CustomCarousel />
            <Suspense
                fallback={
                    <div className="h-24 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                }
            >
                <MoviesSection />
            </Suspense>
            <Footer />
        </main>
    );
}
