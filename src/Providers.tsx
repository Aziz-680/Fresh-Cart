"use client"
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import CartContextProvider from './Context/CartContext'


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                <CartContextProvider>
                    {children}
                </CartContextProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Providers