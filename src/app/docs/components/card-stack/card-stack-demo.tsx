"use client";

import { cn } from "@/lib/utils";
import { CardStack, CardStackIndicator } from "./card-stack";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function CardStackDemo() {

  const [index, setIndex] = useState<number>(0);

  return (
    <div className="flex flex-col min-h-[10rem] w-full items-center justify-center">
      <CardStack
        className="h-64 w-[32rem]"
      >
        {TESTIMONIALS.map((testimonial) => (
          <Card
            key={testimonial.id}
            className={cn(
              "h-full w-full border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 py-4",
              "gap-2"
            )}
          >
            <CardHeader className="gap-1">
              {/* Avatar Component */}
              <Avatar className="h-12 w-12 border border-neutral-100 shadow-inner">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {testimonial.name}
                </p>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {testimonial.role} @ <span className="text-neutral-700 dark:text-neutral-300">{testimonial.company}</span>
                </p>
              </div>
            </CardHeader>

            <CardContent className="">
              <p className="text-sm font-normal text-neutral-600 dark:text-neutral-300">
                "{testimonial.content}"
              </p>
            </CardContent>

            <CardFooter className="">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </CardStack>
    </div>
  );
}

// --- Data & Assets ---

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "CTO",
    company: "InnovateLabs",
    avatar: "https://i.pravatar.cc/150?u=1",
    content: "The animation primitives provided by this library are simply outstanding. We rewrote our entire onboarding flow using the CardStack component, and user retention went up by 15% in the first week.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Figma",
    avatar: "https://i.pravatar.cc/150?u=2",
    content: "I've always struggled to get developers to implement my motion designs correctly. With Motion UI, I just point them to the docs. The physics are buttery smooth and the attention to detail is top-notch.",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Indie Hacker",
    company: "ShipFast",
    avatar: "https://i.pravatar.cc/150?u=3",
    content: "I built my MVP in a weekend using these components. The fact that it's just copy-paste code means I have full control, but I didn't have to waste time reinventing the wheel. Absolutely essential toolkit.",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Indie Hacker",
    company: "ShipFast",
    avatar: "https://i.pravatar.cc/150?u=4",
    content: "I built my MVP in a weekend using these components. The fact that it's just copy-paste code means I have full control, but I didn't have to waste time reinventing the wheel. Absolutely essential toolkit.",
  },
];

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}