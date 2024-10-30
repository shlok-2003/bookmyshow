'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

export default function CustomCarousel() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const images: string[] = ['one', 'two', 'three', 'four'];

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const handleDotClick = (index: number) => {
        api?.scrollTo(index);
    };

    return (
        <div className="w-full relative mx-auto">
            <Carousel
                className="w-full"
                opts={{
                    align: 'center',
                    loop: true,
                }}
                setApi={setApi}
            >
                <CarouselContent className="h-auto md:mx-4">
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full lg:basis-1/2"
                        >
                            <div className="relative w-full h-96">
                                <Image
                                    src={`/carousel/${image}.avif`}
                                    alt={image}
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious
                    variant="default"
                    className="absolute left-0 bg-black/60 hover:bg-black/70 rounded-r-lg rounded-l-none size-10 top-1/2 transform -translate-y-1/2"
                />
                <CarouselNext
                    variant="default"
                    className="absolute right-0 bg-black/60 hover:bg-black/70 rounded-l-lg rounded-r-none size-10 top-1/2 transform -translate-y-1/2"
                />

                <div className="flex justify-center gap-2 mt-4 absolute bottom-3 w-full">
                    {Array.from({ length: count }).map((_, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className={`size-2 p-0 rounded-full ${
                                index === current
                                    ? 'bg-white'
                                    : 'bg-white/40 hover:bg-white/40'
                            }`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
}
