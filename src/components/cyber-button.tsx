
'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface CyberButtonProps {
    icon: ReactNode;
    label: string;
    href: string;
    isSelected: boolean;
    onMouseEnter: () => void;
}

export default function CyberButton({ icon, label, href, isSelected, onMouseEnter }: CyberButtonProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'cyber-button group flex-shrink-0',
                { 'is-selected': isSelected }
            )}
            onMouseEnter={onMouseEnter}
        >
            <div className="cyber-button-content">
                {icon}
                <span className="cyber-button-text">
                    {label}
                </span>
            </div>
        </Link>
    );
}
