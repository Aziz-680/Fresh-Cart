"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import getAllBrands, { type Brand } from "../../apis/allBrands";
import getAllProducts from "../../apis/allProducts";
import HomeCard from "../_components/HomeCard/HomeCard";

type Product = {
    id: string;
    _id: string;
    brand?: { _id: string; name: string };
};

export default function BrandProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const brandId = searchParams.get("id");

    useEffect(() => {
        if (!brandId) {
            setLoading(false);
            return;
        }

        Promise.all([getAllProducts(), getAllBrands()])
            .then(([allProducts, allBrands]) => {
                setProducts(allProducts.filter((product: Product) => product.brand?._id === brandId));
                setBrands(allBrands);
            })
            .catch(() => setError("We couldn’t load products for this brand. Please try again later."))
            .finally(() => setLoading(false));
    }, [brandId]);

    const brandName = useMemo(
        () => brands.find((brand) => brand._id === brandId)?.name ?? products[0]?.brand?.name ?? "Brand products",
        [brandId, brands, products],
    );

    if (loading) {
        return <div className="flex min-h-[60vh] items-center justify-center" role="status">Loading products...</div>;
    }

    if (error) {
        return <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-red-600">{error}</div>;
    }

    return (
        <main className="min-h-[65vh] bg-gray-50 py-10 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mb-6 rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
                >
                    <span aria-hidden="true">←</span> Back to Brands
                </button>
                <h1 className="mb-8 text-center text-3xl font-bold text-slate-900 dark:text-white">{brandName}</h1>

                {products.length ? (
                    <div className="flex flex-wrap">
                        {products.map((product) => <HomeCard key={product.id ?? product._id} product={product} />)}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <p className="mb-5 text-slate-600 dark:text-slate-300">
                            {brandId ? `No products found for ${brandName}.` : "Choose a brand to browse its products."}
                        </p>
                        <Link href="/brands" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400">Browse all brands</Link>
                    </div>
                )}
            </div>
        </main>
    );
}
