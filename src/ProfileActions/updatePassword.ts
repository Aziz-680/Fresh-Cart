"use server"
import axios from "axios"
import { getMyToken } from "../utilities/token"

export async function updateUserPasswordAction(passwords: any) {
    const token = await getMyToken()
    if (!token) throw Error("Login First.")

    // passwords should contain currentPassword, password, and rePassword
    const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, 
        passwords, 
        { headers: { token: token as string } }
    )
    return data
}