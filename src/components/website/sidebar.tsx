"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Sidebar({...props}){

    const pathname = usePathname()

    const comps = [
        {
            category: 'Getting Started',
            items: [
                {
                    name: 'Introduction',
                    href: '/docs'
                },
                {
                    name: 'Setup',
                    href: '/docs/setup'
                }
            ]
        },
        {
            category: 'Buttons',
            items: [
                {
                    name: 'Expanding Pill',
                    href: '/docs/components/expanding-pill'
                }
            ]
        },
        {
            category: 'Cards',
            items: [
                {
                    name: 'Card Stack',
                    href: '/docs/components/card-stack'
                },
                {
                    name: 'Lenticular Card',
                    href: '/docs/components/lenticular-card'
                },
                {
                    name: 'FAQ Section',
                    href: '/docs/components/faq-section'
                }
            ]
        },
        {
            category: 'Interactive',
            items: [
                {
                    name: 'Drag and Drop Accordion',
                    href: '/docs/components/dnd-accordion'
                }
            ]
        }
    ]

    return(
        <aside className="w-64 px-8 py-8 h-full text-sm overflow-y-auto">   
                <ul className="flex flex-col gap-8">
                    {
                        comps.map((comp)=>{
                            return (
                            <li key={comp.category} className="flex flex-col gap-4">
                                <p className="font-medium">{comp.category}</p>
                                <ul className="flex flex-col gap-2 border-l-2 border-l-[#C2C2C2] dark:border-l-[#525252] px-4">
                                    {comp.items.map((item)=>{
                                        return (
                                            <li key={item.name} className={clsx(
                                                "opacity-60 hover:opacity-100",
                                                {
                                                    "text-[#DB2B39] opacity-100" : pathname === item.href
                                                },
                                            )}><Link href={item.href}>{item.name}</Link></li>
                                        )
                                    })}
                                </ul>
                            </li>
                            )  
                        })
                    }
                </ul>
        </aside>
    )
}