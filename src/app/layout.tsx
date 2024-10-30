import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Book My Show Clone',
    description: 'A project for the assignment assigned for the internship',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
