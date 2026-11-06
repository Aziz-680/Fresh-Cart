"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getAllBrands, { type Brand } from "../../../apis/allBrands";

export default function BrandList() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getAllBrands()
            .then(setBrands)
            .catch(() => setError("We couldn’t load brands right now. Please try again later."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="flex min-h-[50vh] items-center justify-center" role="status">Loading brands...</div>;
    }

    if (error) {
        return <div className="flex min-h-[40vh] items-center justify-center text-center text-red-600">{error}</div>;
    }

    return (
        <section className="min-h-[65vh] bg-gray-50 py-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Find your favorites</p>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Shop by Brand</h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">Choose a brand to browse its products.</p>
                </div>

                {brands.length === 0 ? (
                    <p className="py-12 text-center text-slate-600 dark:text-slate-300">No brands are available right now.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {brands.map((brand) => (
                            <button
                                key={brand._id}
                                type="button"
                                onClick={() => router.push(`/brandProducts?id=${encodeURIComponent(brand._id)}`)}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                                aria-label={`Browse ${brand.name} products`}
                            >
                                <div className="flex aspect-[4/3] items-center justify-center bg-white p-8 dark:bg-slate-800">
                                    <Image
                                        src={brand.image}
                                        alt={`${brand.name} logo`}
                                        width={320}
                                        height={240}
                                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{brand.name}</h2>
                                    <span className="text-sm font-medium text-emerald-600">Explore <span aria-hidden="true">→</span></span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
