"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../../components/ui/form"
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { registerSchema, RegisterSchemaType } from '../../schema/register.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Register = () => {

    const router = useRouter();

    const form = useForm<RegisterSchemaType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(registerSchema)
    })

    async function handleRegister(values: RegisterSchemaType) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            console.log(data);

            router.push("/login")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mx-auto px-5 md:px-0 w-full my-12 md:w-1/2 text-black'>
            <h1 className='mb-5 text-3xl text-center font-bold text-indigo-700'>Registeration</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-3'>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className={undefined}>
                                <FormLabel className='text-indigo-700'>Enter Your Name</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormDescription className={undefined} />
                                <FormMessage className={undefined} />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={undefined}>
                                <FormLabel className='text-indigo-700'>Enter Your Email</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} />
                                </FormControl>
                                <FormDescription className={undefined} />
                                <FormMessage className={undefined} />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className={undefined}>
                                <FormLabel className='text-indigo-700'>Enter Your Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormDescription className={undefined} />
                                <FormMessage className={undefined} />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem className={undefined}>
                                <FormLabel className='text-indigo-700'>Re-enter Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormDescription className={undefined} />
                                <FormMessage className={undefined} />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className={undefined}>
                                <FormLabel className='text-indigo-700'>Your Mobile Number</FormLabel>
                                <FormControl>
                                    <Input type='tel' {...field} />
                                </FormControl>
                                <FormDescription className={undefined} />
                                <FormMessage className={undefined} />
                            </FormItem>
                        )}
                    />

                    <Button className=' w-full mt-5 bg-indigo-700 text-emerald-400 hover:text-indigo-700 hover:bg-emerald-400 transition-all  duration-300' variant={undefined} size={undefined}>Apply Now</Button>

                </form>

            </Form>
        </div>
    )
}

export default Register

