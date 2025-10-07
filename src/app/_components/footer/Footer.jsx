"use client";
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import myLogo from '../../../assets/freshcart-logo.svg';
import { useSession } from 'next-auth/react';
import { authOption } from '../../../auth';

const Footer = () => {
    const path = usePathname();

    const { data, status } = useSession(authOption)



    return (
        <footer className="bg-indigo-700 text-white footer">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="md:flex md:justify-between">
                    
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <Image src={myLogo} alt="Space Cart Logo" width={140} height={140} className="mr-3" />
                        </a>
                        <p className="mt-4 max-w-sm">
                            A simple, modern shopping application designed for your everyday needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                        
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-emerald-400">Quick Links</h2>
                            <ul className="space-y-4">
                                <li>
                                    <a href="/cart" className="hover:underline">Cart</a>
                                </li>
                                <li>
                                    <a href="/categories" className="hover:underline">Categories</a>
                                </li>
                                <li>
                                    <a href="/orders" className="hover:underline">My Orders</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-emerald-400">Connect with Us</h2>
                            <ul className="flex space-x-4">
                                <li>
                                    <a href="https://www.linkedin.com/in/abdelaziz-hisham-417945244/" target="_blank" rel="noopener noreferrer" className="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center bg-blue-700 hover:bg-blue-800 transition-colors">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:abdelazizhisham8@gmail.com" className="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors">
                                        <i className="fa fa-mail-bulk"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/Aziz-680" target="_blank" rel="noopener noreferrer" className="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center bg-black hover:bg-gray-800 transition-colors">
                                        <i className="fab fa-github"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8 " />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm sm:text-center">
                        © {new Date().getFullYear()} <a href="/" className="hover:underline ">Fresh Cart™</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer