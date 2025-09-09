import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/socialsidebar";

export default function layout({ children }: { children: React.ReactNode }) {
	// User Layout
	return (
		<>
			<Navbar />
			 <SocialSidebar/>
			{children}
			<Footer />
		</>
	);
}