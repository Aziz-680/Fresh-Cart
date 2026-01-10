"use client";
import React, { useContext } from 'react'
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import myLogo from '../../../assets/freshcart-logo.svg';
import { signOut, useSession } from 'next-auth/react';
import { authOption } from '../../../auth';
import { cartContext } from '../../../Context/CartContext';
import { Badge } from '../../../components/ui/badge';

const Navbar = () => {
    const path = usePathname();
    const { data, status } = useSession(authOption)
    const { numOfCartItems } = useContext(cartContext)

    // Helper class for nav links
    const getLinkClass = (href) => {
        const baseClass = "transition-all duration-300 font-medium tracking-wide relative group";
        const activeClass = "text-emerald-400";
        const inactiveClass = "text-indigo-100 hover:text-emerald-400";

        return `${baseClass} ${path === href ? activeClass : inactiveClass}`;
    }

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm text-white shadow-xl border-b border-slate-800 transition-all">

            <div className='w-full lg:w-[85%] mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>

                {/* Logo & Navigation */}
                <ul className="flex flex-col md:flex-row items-center gap-6">

                    {/* Logo - Always Visible */}
                    <li className='hover:scale-105 transition-transform duration-300'>
                        <Link href="/">
                            <Image src={myLogo} alt='Space Cart Logo' width={140} priority />
                        </Link>
                    </li>

                    {status === "loading" && (
                        <li className="text-indigo-300 animate-pulse text-sm">Loading...</li>
                    )}

                    {status === "authenticated" && <>
                        <li>
                            <Link className={getLinkClass("/categories")} href="/categories">Categories</Link>
                        </li>

                        <li>
                            <Link className={getLinkClass("/brands")} href="/brands">Brands</Link>
                        </li>

                        <li className='relative'>
                            <Link className={getLinkClass("/allorders")} href="/allorders">My Orders</Link>
                        </li>

                        <li className='relative'>
                            <Link className={getLinkClass("/cart")} href="/cart">
                                Cart
                                {numOfCartItems > 0 && (
                                    <Badge className='absolute -top-3 -right-4 bg-emerald-500 hover:bg-emerald-600 text-white min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[10px] rounded-full border border-slate-900 animate-in zoom-in'>
                                        {numOfCartItems}
                                    </Badge>
                                )}
                            </Link>
                        </li>
                    </>}
                </ul>

                {/* Right Side: Socials & Auth */}
                <div className='flex flex-col md:flex-row items-center gap-6'>

                    {/* Social Icons */}
                    <div className='flex items-center gap-4'>
                        <a href="https://www.linkedin.com/in/abdelaziz-hisham-417945244/" target="_blank" rel="noreferrer" className='text-blue-400 hover:text-blue-600 hover:scale-110 transition-all duration-300'>
                            <i className='fab fa-linkedin text-lg'></i>
                        </a>
                        <a href="https://github.com/Aziz-680" target="_blank" rel="noreferrer" className='text-gray-600 hover:text-black hover:scale-110 transition-all duration-300'>
                            <i className='fab fa-github text-lg'></i>
                        </a>
                        <a href="mailto:abdelazizhisham8@email.com" className='text-red-400 hover:text-red-600 hover:scale-110 transition-all duration-300'>
                            <i className='fa fa-envelope text-lg'></i>
                        </a>
                        <a href="https://facebook.com/Aziz.068" target="_blank" rel="noreferrer" className='text-blue-400 hover:text-blue-700 hover:scale-110 transition-all duration-300'>
                            <i className='fab fa-facebook text-lg'></i>
                        </a>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4 pl-0 md:pl-6 md:border-l border-slate-700">

                        {status === "authenticated" && (
                            <>
                                {/* --- MODIFIED SECTION START --- */}
                                {/* Changed div to Link and added hover effects */}
                                <Link href="/profile" className="text-right hidden lg:block group cursor-pointer">
                                    <p className='text-xs text-indigo-300 group-hover:text-emerald-400 transition-colors duration-300'>
                                        Welcome back,
                                    </p>
                                    <div className='flex items-center justify-end gap-2'>
                                        <h1 className='text-sm font-bold text-white max-w-[100px] truncate group-hover:text-emerald-400 transition-colors duration-300 underline-offset-4 group-hover:underline'>
                                            {data.user.name}
                                        </h1>
                                        {/* Optional: Small edit icon that appears on hover */}
                                        <i className="fas fa-pen text-[10px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                    </div>
                                </Link>
                                {/* --- MODIFIED SECTION END --- */}

                                <button
                                    className='px-4 py-1.5 rounded-full border border-slate-700 text-slate-300 text-sm hover:bg-red-900/20 hover:text-red-400 hover:border-red-900 transition-all duration-300 flex items-center gap-2'
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Log out</span>
                                </button>
                            </>
                        )}

                        {status === "unauthenticated" && (
                            <>
                                <Link className={`text-sm font-medium hover:text-emerald-400 transition-colors ${path === "/login" ? "text-emerald-400" : "text-slate-300"}`} href="/login">
                                    Login
                                </Link>
                                <Link
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${path === "/register" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/20" : "bg-slate-800 text-white hover:bg-emerald-500 hover:text-slate-900"}`}
                                    href="/register"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar