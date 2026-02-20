"use client";

import { StaggerReveal } from "./stagger-reveal";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, label: "Email" },
];

export default function StaggerRevealDemo() {
    return (
        <div className="p-8">
            <StaggerReveal className="flex justify-center gap-4">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href="#"
                        className="inline-flex p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        aria-label={link.label}
                    >
                        {link.icon}
                    </a>
                ))}
            </StaggerReveal>
        </div>
    );
}
