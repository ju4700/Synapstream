import Hero from "@/components/Hero";
import FutureOfData from "@/components/FutureOfData";
import PolicyAndVision from "@/components/PolicyAndVision";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="w-full relative min-h-screen cursor-pointer overflow-x-hidden">
            <Hero />
            <div className="relative z-20 bg-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex flex-col w-full overflow-clip">
                <FutureOfData />
                <PolicyAndVision />
                <ContactForm />
                <Footer />
            </div>
        </main>
    );
}
