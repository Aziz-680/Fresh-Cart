"use server"

import axios from "axios"
import { getMyToken } from "../utilities/token"




export async function updateCartAction(id:string, name: string){
    const token= await getMyToken()

    if(!token){
        throw Error("Login First.")
    }

    const value = {
        name : name
    }

    const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe${id}` ,value, {
        headers:{
            token: token as string
        }
    })

    return data
}