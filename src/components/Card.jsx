import React from 'react';

export function CardTitle({ title, children }) {
    return (
        <h2 className="text-2xl font-bold">{title ? title : children}</h2>
    )
}

export function Card({ children, extraCss }) {
    return (
        <div className={`bg-slate-800 ${extraCss && extraCss}`}>
            <div className="min-h-60">
                {children}
            </div>
        </div>
    );
}
