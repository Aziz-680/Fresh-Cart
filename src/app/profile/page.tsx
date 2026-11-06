"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <main className="mx-auto flex min-h-[65vh] w-full max-w-4xl items-center px-5 py-12">
            <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:p-12">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Your account</p>
                <h1 className="mb-8 text-3xl font-bold text-slate-900">Profile</h1>

                <dl className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-5">
                        <dt className="mb-1 text-sm text-slate-500">Name</dt>
                        <dd className="font-semibold text-slate-900">{user?.name || "Not provided"}</dd>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-5">
                        <dt className="mb-1 text-sm text-slate-500">Email</dt>
                        <dd className="break-all font-semibold text-slate-900">{user?.email || "Not provided"}</dd>
                    </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/allorders" className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
                        View orders
                    </Link>
                    <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Sign out
                    </button>
                </div>
            </section>
        </main>
    );
}
