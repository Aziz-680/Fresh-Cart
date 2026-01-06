"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import myLogo from '../../../assets/freshcart-logo.svg';
import { useSession } from 'next-auth/react';
import { authOption } from '../../../auth';

const Footer = () => {
    const path = usePathname();
    const { data, status } = useSession(authOption);

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            {/* Top Wave/Gradient decoration (Optional, adds a modern touch) */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

            <div className="container mx-auto px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                             {/* Added brightness-0 invert filter to make logo white on dark bg if needed, 
                                 remove 'brightness-0 invert' if your logo is already colored */}
                            <Image 
                                src={myLogo} 
                                alt="Fresh Cart Logo" 
                                width={150} 
                                height={40} 
                                className="object-contain" 
                            />
                        </Link>
                        <p className="text-sm leading-6 text-slate-400 max-w-xs">
                            Experience the freshest way to shop. Modern, fast, and delivered right to your doorstep.
                        </p>
                        {/* Social Icons moved here for better mobile stacking */}
                        <div className="flex gap-4 mt-2">
                            <SocialLink href="https://linkedin.com" className="hover:bg-blue-800 transition-colors" icon="fab fa-linkedin" />
                            <SocialLink href="mailto:abdelazizhisham8@gmail.com" className="hover:bg-red-700 transition-colors" icon="fa fa-envelope" />
                            <SocialLink href="https://github.com/Aziz-680" className="hover:bg-gray-800 transition-colors" icon="fab fa-github" />
                        </div>
                    </div>

                    {/* Column 2: Shopping Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/categories" text="Browse Categories" />
                            <FooterLink href="/cart" text="Shopping Cart" />
                        </ul>
                    </div>

                    {/* Column 3: Account & Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/orders" text="Track My Order" />
                            <FooterLink href="/profile" text="Account Settings" />
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (Visual Only) */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                            Stay Updated
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 placeholder-slate-500 transition-all"
                            />
                            <button 
                                type="button" 
                                className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all shadow-lg shadow-emerald-900/20"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} <span className="text-emerald-400 font-medium">Fresh Cart™</span>. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</Link>
                        <Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Helper Components for cleaner code ---

// A simple link component with a standardized hover effect
const FooterLink = ({ href, text }) => (
    <li>
        <Link 
            href={href} 
            className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 group"
        >
            <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 text-emerald-500">•</span>
            {text}
        </Link>
    </li>
);

// A modern, circular social button
const SocialLink = ({ href, icon }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/20"
    >
        <i className={`${icon} text-lg`}></i>
    </a>
);

export default Footer;