import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from './Sub/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
        
          <Navbar />

            {header && (
                <header className="bg-[#198754]">
                    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            
        </div>
    );
}
