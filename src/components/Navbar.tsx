"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	return (
		<nav className="fixed top-3 left-0 right-0 z-50 pointer-events-none">
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


