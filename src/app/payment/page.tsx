"use client"
import React, { useContext, useRef, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { cartContext } from '../../Context/CartContext'
import { cashPaymentAction } from '../../PaymentActions/cashPayments'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { onlinePaymentAction } from '../../PaymentActions/onlinePayment'
import Link from 'next/link'

const Page = () => {

  const { cartId, clearCart } = useContext(cartContext)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  // Helper to validate fields before submission
  const validateForm = () => {
    if (!details.current?.value || !phone.current?.value || !city.current?.value) {
      toast.error("Please fill in all fields", { position: "top-center" })
      return false
    }
    return true
  }

  async function cashPayment() {
    if (!validateForm()) return
    setIsLoading(true)

    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value
      }
    }

    try {
      await cashPaymentAction(cartId, values)
      toast.success("Payment Success, Redirecting...", { duration: 1500, position: "top-center" })
      clearCart()
      router.push('/allorders')
    } catch {
      toast.error("Operation Failed", { duration: 1000, position: "top-center" })
    } finally {
      setIsLoading(false)
    }
  }

  async function onlinePayment() {
    if (!validateForm()) return
    setIsLoading(true)

    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value
      }
    }

    try {
      const data = await onlinePaymentAction(cartId, values)
      if (data.status === "success") {
        window.location.href = data.session.url
      }
    } catch {
      toast.error("Operation Failed", { duration: 1000, position: "top-center" })
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center'>

      {/* Navigation - Style Preserved */}
      <div className="w-full max-w-lg mb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Shopping
        </Link>
      </div>

      {/* Main Card Container */}
      <div className='w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden'>

        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          {/* Subtle background pattern could go here */}
          <div className="relative z-10">
            <h1 className='text-3xl font-bold text-white mb-2 tracking-tight'>Secure Checkout</h1>
            <p className="text-slate-400 text-sm">Complete your order by providing your shipping details</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="space-y-5">

            {/* Details Input */}
            <div className="space-y-2">
              <label htmlFor='details' className="text-sm font-semibold text-slate-700 ml-1">
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <i className="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                <Input
                  ref={details}
                  required
                  type="text"
                  id="details"
                  placeholder="Street address, apartment, etc."
                  className="pl-10 h-11 w-full border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label htmlFor='phone' className="text-sm font-semibold text-slate-700 ml-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                <Input
                  ref={phone}
                  required
                  type="tel"
                  id="phone"
                  placeholder="+20 1xxxxxxxxx"
                  className="pl-10 h-11 w-full border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* City Input */}
            <div className="space-y-2">
              <label htmlFor='city' className="text-sm font-semibold text-slate-700 ml-1">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <i className="fas fa-city absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                <Input
                  ref={city}
                  required
                  type="text"
                  id="city"
                  placeholder="Cairo, Alexandria, etc."
                  className="pl-10 h-11 w-full border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100"></div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={cashPayment}
                disabled={isLoading}
                className='h-12 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200'
                variant="default" size={undefined}              >
                {isLoading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <i className="fas fa-money-bill-wave"></i>
                    Cash on Delivery
                  </>
                )}
              </Button>

              <Button
                onClick={onlinePayment}
                disabled={isLoading}
                className='h-12 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200'
                variant="default" size={undefined}              >
                {isLoading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <i className="far fa-credit-card"></i>
                    Pay Online
                  </>
                )}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page