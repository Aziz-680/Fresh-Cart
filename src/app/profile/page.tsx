"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

// Interface for the user data expected by the API
interface UpdateUserData {
    name: string;
    email: string;
    phone: string;
}

const ProfilePage = () => {
    // 'update' is a function from NextAuth to update the client-side session data
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Form States
    const [formData, setFormData] = useState<UpdateUserData>({
        name: '',
        email: '',
        phone: ''
    })

    const [passData, setPassData] = useState({
        currentPassword: '',
        password: '',
        rePassword: ''
    })

    // Load session data into form when available
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setFormData({
                name: session.user.name || '',
                email: session.user.email || '',
                // If phone isn't in session, we leave it blank or handle it if you stored it in the token
                phone: (session.user as any).phone || '' 
            })
        } else if (status === "unauthenticated") {
            router.push('/login')
        }
    }, [status, session, router])

    // --- 1. HANDLE INFO UPDATE (With API) ---
    const handleInfoUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Retrieve token from session (adjust path 'session.token' based on your authOptions)
        const token = (session as any)?.token; 

        if (!token) {
            toast.error("You are not authorized. Please login again.")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": token // The API expects the token in the header
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                })
            })

            const data = await response.json()

            if (data.message === "success" || response.ok) {
                // 1. Success Notification
                toast.success("Profile updated successfully!", { position: 'top-center' })
                
                // 2. Update NextAuth Session Client-Side (So Navbar updates immediately)
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: formData.name,
                        email: formData.email
                    }
                })
            } else {
                // Handle API errors (e.g., "Email already in use")
                toast.error(data.message || "Update failed", { position: 'top-center' })
            }

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong", { position: 'top-center' })
        } finally {
            setIsLoading(false)
        }
    }

    // --- 2. HANDLE PASSWORD UPDATE (Placeholder for future API) ---
    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (passData.password !== passData.rePassword) {
            toast.error("New passwords do not match", { position: 'top-center' })
            return
        }

        // NOTE: You need a different endpoint (e.g. /changeMyPassword) for this.
        // The /updateMe endpoint usually only handles basic info.
        toast.info("Password update endpoint not connected yet.", { position: 'top-center' })
    }

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center text-emerald-600">Loading profile...</div>
    }

    return (
        <div className='min-h-screen bg-slate-50 py-10 px-4'>
            <div className="md:w-[85%] lg:w-[70%] mx-auto">
                
                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
                >
                    <i className="fas fa-arrow-left"></i>
                    Back to Shopping
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Col: User Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center sticky top-24">
                            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-100">
                                <span className="text-3xl font-bold text-slate-400">
                                    {formData.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">{formData.name}</h2>
                            <p className="text-slate-500 text-sm mb-4">{formData.email}</p>
                            
                            <div className="border-t border-slate-100 pt-4 text-left">
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Account Status</p>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Active Member
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Forms */}
                    <div className="md:col-span-2 space-y-8">
                        
                        {/* 1. Edit Details Form */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <i className="fas fa-user-edit text-emerald-400"></i>
                                    Personal Information
                                </h3>
                            </div>
                            
                            <form onSubmit={handleInfoUpdate} className="p-6 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                        <Input 
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="border-slate-200 focus:ring-emerald-500 focus:border-emerald-500" type={undefined}                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                        <Input 
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            placeholder="01xxxxxxxxx"
                                            className="border-slate-200 focus:ring-emerald-500 focus:border-emerald-500" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                    <Input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="bg-slate-50 text-slate-500 border-slate-200 focus:ring-emerald-500 focus:border-emerald-500" 
                                    />
                                </div>

                                <div className="pt-2 text-right">
                                    <Button 
                                        disabled={isLoading}
                                        type="submit"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white" variant={undefined} size={undefined}                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* 2. Change Password Form */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <i className="fas fa-shield-alt text-emerald-400"></i>
                                    Security
                                </h3>
                            </div>
                            
                            <form onSubmit={handlePasswordUpdate} className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Current Password</label>
                                    <Input 
                                        type="password"
                                        value={passData.currentPassword}
                                        onChange={(e) => setPassData({...passData, currentPassword: e.target.value})}
                                        className="border-slate-200 focus:ring-emerald-500 focus:border-emerald-500" 
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">New Password</label>
                                        <Input 
                                            type="password"
                                            value={passData.password}
                                            onChange={(e) => setPassData({...passData, password: e.target.value})}
                                            className="border-slate-200 focus:ring-emerald-500 focus:border-emerald-500" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                                        <Input 
                                            type="password"
                                            value={passData.rePassword}
                                            onChange={(e) => setPassData({...passData, rePassword: e.target.value})}
                                            className="border-slate-200 focus:ring-emerald-500 focus:border-emerald-500" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 text-right">
                                    <Button 
                                        disabled={isLoading}
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white" variant={undefined} size={undefined}                                    >
                                        {isLoading ? 'Processing...' : 'Change Password'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage