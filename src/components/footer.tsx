import Link from 'next/link';
import { Home, Ticket, User, Video } from 'lucide-react';

export default function Footer() {
    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full border-t md:hidden bg-white">
            <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
                <Link
                    href="/"
                    className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                </Link>
                <Link
                    href="/movies"
                    className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    <Video className="h-5 w-5" />
                    <span>Movies</span>
                </Link>
                <Link
                    href="/events"
                    className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    <Ticket className="h-5 w-5" />
                    <span>Live Events</span>
                </Link>
                <Link
                    href="/profile"
                    className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                </Link>
            </div>
        </nav>
    );
}
