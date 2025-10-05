"use server"

import { jwtDecode } from "jwt-decode"
import { getMyToken } from "../utilities/token"
import axios from "axios"

interface DecodedToken {
    id: string;
}

export async function getUserOrder() {
    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }

    if (typeof token !== 'string') {
        throw new Error("Invalid token format. Expected a string.")
    }

    const { id } = jwtDecode<DecodedToken>(token)

    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        return data
    } catch (error) {
        console.error("Failed to fetch user orders:", error);
        throw new Error("Could not retrieve your orders.");
    }
}