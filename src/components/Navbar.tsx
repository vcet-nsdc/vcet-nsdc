"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show navbar when scrolled down more than 100px
			const scrollTop = window.scrollY;
			setIsVisible(scrollTop > 100);
		};

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav className={`fixed top-3 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ${
			isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
		}`}>
			<div className="pointer-events-auto mx-auto max-w-6xl px-5 py-2.5 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur shadow-lg">
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

				<ul className="hidden md:flex items-center gap-10 text-foreground">
					<li>
						<Link href="/home" className="hover:text-primary-light transition-colors">Home</Link>
					</li>
					<li>
						<Link href="/events" className="hover:text-primary-light transition-colors">Events</Link>
					</li>
					<li>
						<Link href="/team" className="hover:text-primary-light transition-colors">Team</Link>
					</li>
					<li>
						<Link href="/contact" className="hover:text-primary-light transition-colors">Contact</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}


