import Link from "next/link";
import Image from "next/image";
import BgImage from "../../public/hero-section-bg.png";
import { ChevronRight, Github } from "lucide-react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    // style: ["italic"],
});

export default function Home() {
    return (
        <div className="w-full px-4 lg:px-0 min-h-screen flex flex-col items-center justify-center">
            <header className="w-full max-w-7xl flex justify-between py-4 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/flow-kit-icon.png"
                        alt="Flow Kit Logo"
                        width={40}
                        height={40}
                    />

                    <span className="text-xl font-semibold">Flow Kit</span>
                </Link>

                <a
                    href="https://github.com/k4rtikay/ui-library"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                >
                    <Github className="h-10 w-10 p-2.5 bg-secondary/30 hover:bg-secondary/80 ring-1 ring-border rounded-xl transition-all duration-300 group-hover:scale-105" />
                </a>
            </header>

            <main className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center overflow-hidden">
                <div className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
                    <Image
                        src={BgImage}
                        alt="Background"
                        placeholder="blur"
                        quality={100}
                        fill
                        priority
                        className="animate-hero-zoom object-cover -z-10 brightness-[0.65] contrast-[1.1]"
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                        <h1
                            className={`${instrumentSerif.className} text-white dark:text-white  text-6xl md:text-8xl mb-4 tracking-tight leading-none`}
                        >
                            Flow-Kit
                        </h1>

                        <p className="mb-10 text-white max-w-2xl text-lg md:text-xl leading-relaxed font-light tracking-tight">
                            A curated collection of{" "}
                            <span className="cursor-cell relative inline-flex items-center mx-1 px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-100 text-sm md:text-base transition-colors hover:border-zinc-500">
                                <span className="relative z-10 font-medium">
                                    components
                                </span>
                                <span className="absolute inset-0 bg-linear-to-tr from-zinc-700/20 to-transparent rounded-full" />
                            </span>{" "}
                            and{" "}
                            <span
                                className={`${instrumentSerif.className} cursor-copy relative inline-block text-white px-2 py-0.5 group`}
                            >
                                <span className="relative z-10 italic">
                                    interactions
                                </span>
                                <span className="absolute bottom-1 left-0 w-full h-2 bg-indigo-500/20 -rotate-1 group-hover:bg-indigo-500/40 transition-all duration-300" />
                            </span>{" "}
                            crafted for the modern web with React, Tailwind, and
                            Motion.
                        </p>

                        <Link
                            href="/docs"
                            className="group font-medium ring-2 ring-white/10 bg-foreground text-background px-6 py-4 rounded-full flex gap-2 items-center justify-center text-base hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                        >
                            Browse Components
                            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
