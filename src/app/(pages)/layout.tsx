import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SmartPageTransition } from "@/components/ui/smart-page-transition";

export default function layout({ children }: { children: React.ReactNode }) {
	// User Layout
	return (
		<>
			<Navbar />
			{/* <SocialSidebar/> */}
			<SmartPageTransition className="min-h-screen">
				{children}
			</SmartPageTransition>
			<Footer />
		</>
	);
}