import React from 'react';

export function CardTitle({ title, children }) {
    return (
        <h2 className="text-2xl font-bold flex-1">{title ? title : children}</h2>
    )
}

export function CardHeader({ children }) {
    return (
        <div className="py-4 px-6 border-b border-slate-700 flex items-center">
            {children}
        </div>
    )
}

export function CardFooter({ children }) {
    return (
        <div className="border-t border-slate-700 flex items-center">
            {children}
        </div>
    )
}

export function Card({ children, extraCss }) {
    return (
        <div className={`bg-slate-800 ${extraCss && extraCss}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className }) {
    return (
        <div className={`p-4 ${className && className}`}>
            {children}
        </div>
    );
}
