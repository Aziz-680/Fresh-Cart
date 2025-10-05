"use client"
import React, { useContext, useRef } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { cartContext } from '../../Context/CartContext'
import { cashPaymentAction } from '../../PaymentActions/cashPayments'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { onlinePaymentAction } from '../../PaymentActions/onlinePayment'


const page = () => {

  const { cartId, clearCart } = useContext(cartContext)
  const router = useRouter()

  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value
      }
    }

    try {
      const data = await cashPaymentAction(cartId, values)

      toast.success("Payment Success, Redirecting...", { duration: 1500, position: "top-center" })

      clearCart()
      router.push('/allorders')

    } catch {
      toast.error("Operation Failed", { duration: 1000, position: "top-center" })
    }

  }

  async function onlinePayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value
      }
    }

    try {
      const data = await onlinePaymentAction(cartId, values)


      if(data.status === "success"){
        window.location.href = data.session.url
      }
      

      // toast.success("Payment Success, Redirecting...", { duration: 1500, position: "top-center" })

      // clearCart()
      // router.push('/allorders')

    } catch {
      toast.error("Operation Failed", { duration: 1000, position: "top-center" })
    }

  }


  return (
    <div className='text-black  w-screen h-screen'>
      <div className='md:w-1/2 my-10 mx-auto px-5 md:px-0 mt-50'>
        <h1 className='mx-10 text-center text-3xl font-bold text-indigo-700'>Payments</h1>
        <div>
          <label htmlFor='details'>Details</label>
          <Input ref={details} className="mb-4" type="text" id="details"></Input>

          <label htmlFor='phone'>Phone Number</label>
          <Input ref={phone} className="mb-4" type="tel" id="phone" ></Input>

          <label htmlFor='city'>City</label>
          <Input ref={city} className="mb-4" type="text" id="city"></Input>

          <Button onClick={cashPayment} className='h-auto w-auto mt-10 cstbtn mr-2' variant={undefined} size={undefined}>Cash</Button>
          <Button onClick={onlinePayment} className='h-auto w-auto mt-10 cstbtn mr-2' variant={undefined} size={undefined}>Online</Button>
        </div>

      </div>

    </div>
  )
}

export default page