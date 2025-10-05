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


    return (
        <div className="p-5 bg-indigo-700 text-white shadow-lg">

            <div className='w-full md:w-[80%] mx-auto flex justify-between items-center flex-col md:flex-row text-center'>
                <ul className="flex flex-col md:flex-row text-center items-center gap-6">

                    {status === "authenticated" && <>

                        <li>
                            <Link className={path === "/" ? "" : ""} href="/">
                                <Image src={myLogo} alt='Space Cart Logo' />
                            </Link>
                        </li>

                        <li>
                            <Link className={path === "/categories" ? "text-emerald-400" : ""} href="/categories">Categories</Link>
                        </li>

                        <li>
                            <Link className={path === "/brands" ? "text-emerald-400" : ""} href="/brands">Brands</Link>
                        </li>

                        <li className='relative'>
                            <Link className={path === "/cart" ? "text-emerald-400" : ""} href="/cart">
                                Cart
                                {numOfCartItems > 0 && (
                                    <Badge className='absolute left-[90%] -top-[40%] bg-emerald-400 w-0.5 h-4.5 text-indigo-700 '>
                                        {numOfCartItems}
                                    </Badge>
                                )}
                            </Link>                        </li>

                        <li>
                            <Link className={path === "/allorders" ? "text-emerald-400" : ""} href="/allorders">My Orders</Link>
                        </li>


                    </>}

                    {status === "loading" && <>

                        <h1>Loading</h1>
                    </>}

                    {status === "unauthenticated" && <Image src={myLogo} alt='Space Cart Logo' />}




                </ul>

                <div>
                    <div>
                        <i className='fab fa-linkedin mx-2 text-emerald-400'></i>
                        <i className='fab fa-github mx-2 text-emerald-400'></i>
                        <i className='fa fa-mail-bulk mx-2 text-emerald-400' ></i>
                        <i className='fab fa-facebook mx-2 text-emerald-400'></i>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row text-center items-center gap-2">

                    {status === "authenticated" && <>
                        <div>
                            <h1 className='mr-3'>Hi, {data.user.name}</h1>

                        </div>
                        <div>
                            <button className='  cursor-pointer  hover:text-red-700 transition-all  duration-300' onClick={() => signOut({
                                callbackUrl: "/login"
                            })}>
                                Log out
                            </button>
                        </div>
                    </>}

                    {status === "unauthenticated" && <>
                        <div>
                            <Link className={path === "/register" ? "text-emerald-400" : ""} href="/register">Signup</Link>
                        </div>
                        <div>
                            <Link className={path === "/login" ? "text-emerald-400" : ""} href="/login">Login</Link>
                        </div>
                    </>}



                </div>

            </div>





        </div>

    )
}

export default Navbar