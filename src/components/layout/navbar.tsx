/**
 * Navigation Bar Component
 * Responsive navigation with mobile menu and accessibility features
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NAVIGATION } from '@/lib/constants';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-6xl px-5 py-2.5 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center select-none">
          <Image
            src="/assests/white%20NSDC%20logo.png"
            alt="VCET NSDC logo"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-foreground">
          {NAVIGATION.main.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-primary-light transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden pointer-events-auto"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <ul className="space-y-4">
            {NAVIGATION.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-white hover:text-primary-light transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
