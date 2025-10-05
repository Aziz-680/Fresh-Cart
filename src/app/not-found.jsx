import React from 'react'
import Link from "next/link";



const NotFound = () => {
    return (




        <div className=' text-white bg-black  '>




            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay: 0.2s"></div>
            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-emerald-800 rounded-full animate-pulse animation-delay: 0.5s"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-indigo-800 rounded-full animate-pulse animation-delay: 0.8s"></div>
            <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse animation-delay: 1.1s"></div>
            <div className="absolute bottom-1/2 left-2/3 w-2 h-2 bg-emerald-800 rounded-full animate-pulse animation-delay: 1.4s"></div>
            <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay: 0.3s"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-indigo-800 rounded-full animate-pulse animation-delay: 0.6"></div>





            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">


                <div className="z-10">
                    <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-emerald-400 via-pink-200 to-indigo-800 bg-clip-text text-transparent animate-pulse">
                        404
                    </h1>

                    <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-100">
                        Page Not Found
                    </h2>

                    <p className="mt-3 text-lg text-slate-400 max-w-md mx-auto">
                        Hey... you lost. Anyways, its not too late to return back.
                    </p>

                    <Link href="/" className="mt-10 inline-block px-8 py-4 text-lg font-semibold bg-indigo-700 rounded-lg text-emerald-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:scale-110 transform transition-transform duration-500">
                        Return to Home
                    </Link>
                </div>
            </div>

        </div>





















    )
}

export default NotFound