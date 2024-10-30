'use client';

import { useEffect, useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
    onUpdateSearchParams: (newType: string, newTitle: string) => void;
    type: string;
    title: string;
}

export default function Header({ onUpdateSearchParams, type, title }: HeaderProps) {
    const [search, setSearch] = useState(title);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            onUpdateSearchParams(type, search);
        }, 1000);

        return () => clearTimeout(handler);
    }, [onUpdateSearchParams, search, type]);

    return (
        <header className="bg-[#1a2c4e] text-white">
            <div className="container mx-auto">
                {/* Top Navigation */}
                <div className="flex items-center h-16 px-4 gap-4">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[300px] bg-[#1a2c4e] text-white"
                            >
                                <SheetHeader>
                                    <SheetTitle className="text-white">
                                        Menu
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 flex flex-col gap-4">
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Movies
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Stream
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Plays
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Sports
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Activities
                                    </Link>
                                    <div className="border-t border-gray-700 my-4" />
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        ListYourShow
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Corporates
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Offers
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-lg hover:text-[#e5192c]"
                                    >
                                        Gift Cards
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/bms.svg"
                            alt="Book My Show"
                            width={100}
                            height={100}
                            priority
                        />
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Search className="h-4 w-4" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="w-full pl-10 bg-white text-black"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Search Icon - Mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden ml-auto text-white"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        {isSearchOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Search className="h-6 w-6" />
                        )}
                    </Button>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1"
                                >
                                    Select City
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Mumbai</DropdownMenuItem>
                                <DropdownMenuItem>Delhi</DropdownMenuItem>
                                <DropdownMenuItem>Bangalore</DropdownMenuItem>
                                <DropdownMenuItem>Hyderabad</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="bg-[#e5192c] hover:bg-[#b31522] text-white">
                            Sign In
                        </Button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="md:hidden px-4 pb-4 transition-all duration-300">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300">
                                <Search className="h-4 w-4" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 bg-white text-black"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                )}

                {/* Secondary Navigation - Scrollable on mobile */}
                <nav className="bg-[#222539] text-sm overflow-x-auto scrollbar-hide w-full">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center h-12 min-w-max gap-6">
                            <div className="flex items-center gap-6 max-sm:mr-2">
                                <span
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                    onClick={() =>
                                        onUpdateSearchParams('movie', title)
                                    }
                                >
                                    Movies
                                </span>
                                <span
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                    onClick={() =>
                                        onUpdateSearchParams('series', title)
                                    }
                                >
                                    Stream
                                </span>
                                <span
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                    onClick={() =>
                                        onUpdateSearchParams('episode', title)
                                    }
                                >

                                    Events
                                </span>
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    Plays
                                </Link>
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    Sports
                                </Link>
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    Activities
                                </Link>
                            </div>
                            <div className="hidden lg:flex items-center gap-6 ml-auto">
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    ListYourShow
                                </Link>
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    Corporates
                                </Link>
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    Offers
                                </Link>
                                <Link
                                    href="#"
                                    className="whitespace-nowrap hover:text-[#e5192c]"
                                >
                                    Gift Cards
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
