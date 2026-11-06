"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import getAllProducts from '../../apis/allProducts';
import Image from 'next/image';
import HomeCard from '../_components/HomeCard/HomeCard';

interface Product {
    id: string;
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
                    
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300  transition-colors duration-300 shadow-md"
                >
                    <i className="fas fa-arrow-left"></i> Back to Categories
                </button>

                <h1 className="text-4xl font-bold text-center text-slate-900 mb-10">
                    {products[0]?.category?.name ?? 'Category Products'}
                </h1>

                <div className="flex flex-wrap">
                    {products.length > 0 ? (
                        products.map((product) => <HomeCard key={product.id} product={product} />)
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