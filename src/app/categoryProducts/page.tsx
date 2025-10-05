"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import getAllProducts from '../../apis/allProducts';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    imageCover: string;
    category: {
        _id: string;
        name: string;
    }
}

const CategoryProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryId = searchParams.get('id');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getAllProducts();
                if (allProducts) {
                    const filteredProducts = allProducts.filter(
                        product => product.category._id === categoryId
                    );
                    setProducts(filteredProducts);
                }
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                console.error("API Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold">Loading Products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => router.back()}
                    className="mb-8 border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
                >
                    &larr; Back to Categories
                </button>

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Category Products
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <Image
                                    src={product.imageCover}
                                    alt={product.name}
                                    className="w-full h-200 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-700 truncate">
                                        {product.name}
                                    </h2>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No products found in this category.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;