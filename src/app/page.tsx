import FloatingNavbar from "@/components/ui/FloatingNavbar";
import HeroSection from "./components/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <FloatingNavbar />

      <div className="pt-20">
        <HeroSection />
      </div>
    </main>
  );
}