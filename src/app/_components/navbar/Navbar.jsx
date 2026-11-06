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
        const activeClass = "text-emerald-700 dark:text-emerald-400";
        const inactiveClass = "text-slate-600 hover:text-emerald-600 dark:text-indigo-100 dark:hover:text-emerald-400";

        return `${baseClass} ${path === href ? activeClass : inactiveClass}`;
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 shadow-xl backdrop-blur-sm transition-colors dark:border-slate-800 dark:bg-slate-900/95 dark:text-white">

            <div className='w-full lg:w-[85%] mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>

                {/* Logo & Navigation */}
                <ul className="flex flex-col md:flex-row items-center gap-6">

                    {/* Logo - Always Visible */}
                    <li className='hover:scale-105 transition-transform duration-300'>
                        <Link href="/">
                            <span className="flex items-center gap-2 dark:hidden" aria-label="Fresh Cart home">
                                <i className="fas fa-cart-shopping text-emerald-600" aria-hidden="true"></i>
                                <span className="text-xl font-bold tracking-tight text-slate-900">FreshCart</span>
                            </span>
                            <Image className="hidden dark:block" src={myLogo} alt='Fresh Cart Logo' width={140} priority />
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
                    <div className="flex items-center gap-4 border-slate-200 pl-0 md:border-l md:pl-6 dark:border-slate-700">

                        {status === "authenticated" && (
                            <>
                                {/* --- MODIFIED SECTION START --- */}
                                {/* Changed div to Link and added hover effects */}
                                <Link href="/profile" className="text-right hidden lg:block group cursor-pointer">
                                    <p className='text-xs text-slate-500 transition-colors duration-300 group-hover:text-emerald-600 dark:text-indigo-300 dark:group-hover:text-emerald-400'>
                                        Welcome back,
                                    </p>
                                    <div className='flex items-center justify-end gap-2'>
                                        <h1 className='max-w-[100px] truncate text-sm font-bold text-slate-900 underline-offset-4 transition-colors duration-300 group-hover:text-emerald-600 group-hover:underline dark:text-white dark:group-hover:text-emerald-400'>
                                            {data.user.name}
                                        </h1>
                                        {/* Optional: Small edit icon that appears on hover */}
                                        <i className="fas fa-pen text-[10px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                    </div>
                                </Link>
                                {/* --- MODIFIED SECTION END --- */}

                                <button
                                    className='flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-900 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Log out</span>
                                </button>
                            </>
                        )}

                        {status === "unauthenticated" && (
                            <>
                                <Link className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${path === "/login" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`} href="/login">
                                    Login
                                </Link>
                                <Link
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${path === "/register" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/20" : "bg-slate-200 text-slate-800 hover:bg-emerald-500 hover:text-white dark:bg-slate-800 dark:text-white dark:hover:text-slate-900"}`}
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