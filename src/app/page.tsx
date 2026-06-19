import Link from "next/link";
import Image from "next/image";
import BgImage from "../../public/waves-green.png";
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
            <Image
                src={BgImage}
                alt="Background"
                placeholder="blur"
                quality={75}
                fill
                priority
                className="animate-hero-zoom object-cover -z-10"
            />
            <header className="bg-none w-full max-w-7xl flex flex-row-reverse justify-between items-center pt-8 z-50">
                <a
                    href="https://github.com/k4rtikay/ui-library"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary/50 hover:bg-secondary/80 scale-100 shadow-[inset_0px_2px_8px_0px_rgba(255,255,255,0.95),0px_2px_16px_0px_rgba(0,0,0,0.1)] ring-1 ring-border rounded-xl transition-all duration-240 hover:scale-105 ease-out"
                >
                    <Github className="h-6 w-6" />
                </a>
            </header>

            <main className="relative w-full flex-1 flex flex-col items-center justify-start overflow-hidden">

                <div className="text-black relative z-10 flex flex-col items-center justify-center md:justify-start text-center px-6 mt-24">
                    <h1
                        className={`text-6xl md:text-8xl mb-4 tracking-tight leading-none`}
                    >
                        Flow-Kit
                    </h1>

                    <p className="mb-10 max-w-2xl text-lg md:text-xl leading-relaxed font-light tracking-tight">
                        A curated collection of{" "}
                        <span className="cursor-cell relative inline-flex items-center bg-zinc-500/5 mx-1 px-2 py-0.5 rounded-full border border-black/10 text-sm md:text-base transition-colors hover:border-black/20 shadow-[inset_0px_2px_8px_2px_rgba(255,255,255,0.95),0px_2px_16px_0px_rgba(0,0,0,0.1)]">
                            <span className="relative z-10 font-medium">
                                components
                            </span>
                            <span className="absolute inset-0 bg-linear-to-tr from-zinc-700/20 to-transparent rounded-full" />
                        </span>{" "}
                        and{" "}
                        <span
                            className={`${instrumentSerif.className} cursor-copy relative inline-block px-2 py-0.5 group`}
                        >
                            <span className="relative z-10 italic">
                                interactions
                            </span>
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-green-500/20 -skew-x-16 -rotate-1 group-hover:bg-green-500/40 transition-all duration-300" />
                        </span>{" "}
                        crafted for the modern web with React, Tailwind, and
                        Motion.
                    </p>

                    <Link
                        href="/docs"
                        className="group text-sm font-medium tracking-wide leading-0.5 ring-2 ring-white/10 bg-primary text-primary-foreground px-4 py-3 rounded-xl flex gap-0.5 items-center justify-center hover:opacity-90 transition-all duration-280 ease-out shadow-[inset_0px_2px_8px_0px_rgba(255,255,255,0.55),0px_2px_16px_0px_rgba(0,0,0,0.1)]"
                    >
                        Get Started
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
