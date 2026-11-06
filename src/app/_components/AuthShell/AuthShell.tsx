import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ShoppingBasket } from "lucide-react";

interface AuthShellProps {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
    footer: ReactNode;
}

export default function AuthShell({ eyebrow, title, description, children, footer }: AuthShellProps) {
    return (
        <main className="relative isolate flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden bg-stone-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:py-16">
            <div className="pointer-events-none absolute -left-24 top-12 -z-10 size-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
            <div className="pointer-events-none absolute -bottom-28 right-0 -z-10 size-80 rounded-full bg-amber-100/70 blur-3xl dark:bg-indigo-950/30" />

            <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_30px_100px_-40px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[0.88fr_1.12fr]">
                <aside className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white md:flex lg:p-12">
                    <div className="absolute -right-24 top-24 size-72 rounded-full border border-emerald-300/15" />
                    <div className="absolute -right-12 top-36 size-48 rounded-full border border-emerald-300/20" />
                    <div className="absolute -bottom-28 -left-28 size-80 rounded-full bg-emerald-500/20 blur-3xl" />

                    <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3 text-white">
                        <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30">
                            <ShoppingBasket size={22} strokeWidth={2.2} />
                        </span>
                        <span className="text-xl font-semibold tracking-tight">FreshCart</span>
                    </Link>

                    <div className="relative z-10 py-10">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">A better everyday</p>
                        <h2 className="max-w-sm text-4xl font-semibold leading-[1.12] tracking-tight lg:text-5xl">
                            Good food.<br />Good choices.<br /><span className="text-emerald-300">Good days.</span>
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-7 text-slate-300">
                            Your favorite essentials, thoughtfully brought together and delivered to your door.
                        </p>
                        <ul className="mt-8 space-y-3 text-sm text-slate-200">
                            <li className="flex items-center gap-3"><Check size={17} className="text-emerald-300" /> A smoother way to shop</li>
                            <li className="flex items-center gap-3"><Check size={17} className="text-emerald-300" /> Your cart and orders in one place</li>
                        </ul>
                    </div>

                    <p className="relative z-10 text-xs tracking-wide text-slate-400">Thoughtful shopping, made simple.</p>
                </aside>

                <section className="flex items-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
                    <div className="mx-auto w-full max-w-md">
                        <Link href="/" className="mb-9 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-300 md:hidden">
                            <ShoppingBasket size={19} className="text-emerald-600 dark:text-emerald-400" /> FreshCart
                        </Link>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">{eyebrow}</p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>

                        <div className="mt-8">{children}</div>

                        <div className="mt-7 border-t border-slate-100 pt-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                            {footer}
                        </div>
                        <Link href="/" className="mt-8 inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-emerald-700 dark:hover:text-emerald-300">
                            Continue browsing <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
