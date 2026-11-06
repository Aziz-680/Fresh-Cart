"use server"
import axios from "axios"
import { getMyToken } from "../utilities/token"




export async function onlinePaymentAction(id:string, values:object){
    const token= await getMyToken()

    if(!token){
        throw Error("Login First.")
    }

    const appUrl = process.env.NEXTAUTH_URL
        ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
        ?? (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000");

    if (!appUrl) {
        throw new Error("Set NEXTAUTH_URL to your deployed site URL before enabling online checkout.");
    }

    const checkoutUrl = new URL(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`);
    checkoutUrl.searchParams.set("url", appUrl);

    const {data} = await axios.post(checkoutUrl.toString(), values, {
        headers:{
            token: token as string
        }
    })

    return data
}