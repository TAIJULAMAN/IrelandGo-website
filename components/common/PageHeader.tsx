"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description?: string;
    showBackButton?: boolean;
    backButtonText?: string;
    backButtonHref?: string;
    actions?: React.ReactNode;
}

export function PageHeader({
    title,
    description,
    showBackButton = false,
    backButtonText = "Back to Clients",
    backButtonHref,
    actions,
}: PageHeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (backButtonHref) {
            router.push(backButtonHref);
        } else {
            router.back();
        }
    };

    return (
        <header className="space-y-3">
            {showBackButton && (
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="pl-0 hover:bg-transparent text-gray-600 hover:text-gray-900 -ml-2"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {backButtonText}
                </Button>
            )}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-sm text-gray-500">{description}</p>
                    )}
                </div>
                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
        </header>
    );
}
