"use server"
import axios from "axios";
import { getMyToken } from "../utilities/token";


export async function AddToCartAction(id){

    const token= await getMyToken()

    const values = {
        productId: id
    }

    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", values , {
        
    headers : {
            token: token as string
        }
    })
    

    return data
}