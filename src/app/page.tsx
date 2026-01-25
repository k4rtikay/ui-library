import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Github } from "lucide-react";

export default function Home() {
  return (
    <div
      className="w-full relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <header
      className="w-full fixed top-0 flex justify-end px-6 py-4"
      >
        <a
          href="https://github.com/k4rtikay/ui-library"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github/>
        </a>
      </header>
      <h1 className="text-4xl mb-2 xl:text-5xl">Flow-Kit</h1>
      <p className="mb-8 opacity-70 text-center">Free components and interactions built with React, Tailwind, shadcn/ui and Motion.</p>
      <Link
        href="/docs"
        className="bg-foreground text-background px-4 py-2 rounded-md flex gap-1 items-end justify-center text-xs md:text-sm hover:opacity-90 transition-opacity duration-150 "
      >
        Browse Components <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
