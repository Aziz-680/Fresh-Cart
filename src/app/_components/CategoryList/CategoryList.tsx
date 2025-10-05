"use client"; // Directive to mark this as a client-side component in Next.js

import React, { useState, useEffect } from 'react';
import allCategories from '../../../apis/allCategories';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define a TypeScript interface for the category data structure for type safety.
interface Category {
    _id: string;
    name: string;
    image: string;
}

// This is a reusable React component to fetch and display product categories.
const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // === DATA FETCHING ===
    // useEffect hook to perform the API call when the component mounts.
    useEffect(() => {
        // This async function now uses the imported allCategories function
        const fetchCategories = async () => {
            try {
                // Call your external API function
                const data = await allCategories();

                // Assuming 'allCategories' returns the array of categories directly
                if (data) {
                    setCategories(data);
                }
            } catch (err) {
                setError('Failed to fetch categories. Please try again later.');
                console.error("API Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array ensures this runs only once on mount.

    // === EVENT HANDLERS ===
    const handleCategoryClick = (categoryId: string) => {
        router.push(`/categoryProducts?id=${categoryId}`);
    };

    // === CONDITIONAL RENDERING ===
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold">Loading Categories...</p>
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

    // === MAIN RENDER (Success Case) ===
    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Our Product Categories
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            onClick={() => handleCategoryClick(category._id)}
                            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                className="w-full h-[200px] object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-center text-gray-700">
                                    {category.name}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

