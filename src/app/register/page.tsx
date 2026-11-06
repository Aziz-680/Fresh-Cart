"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import AuthShell from "../_components/AuthShell/AuthShell";
import { registerSchema, type RegisterSchemaType } from "../../schema/register.schema";

const inputClassName = "h-11 rounded-xl border-slate-200 bg-stone-50/70 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export default function Register() {
    const router = useRouter();
    const form = useForm<RegisterSchemaType>({
        defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
        resolver: zodResolver(registerSchema),
    });

    async function handleRegister(values: RegisterSchemaType) {
        try {
            await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
            toast.success("Your account is ready. Sign in to continue.");
            router.push("/login");
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message
                : null;
            toast.error(typeof message === "string" ? message : "We couldn’t create your account. Please check your details and try again.");
        }
    }

    return (
        <AuthShell
            eyebrow="Join FreshCart"
            title="Create your account"
            description="A few details, then you’re ready to shop your favorites."
            footer={<>Already have an account? <Link href="/login" className="ml-1 font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Sign in</Link></>}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-3.5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Full name</FormLabel>
                                <FormControl><div className="relative"><UserRound size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><Input autoComplete="name" placeholder="Your name" className={inputClassName} {...field} /></div></FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Email address</FormLabel>
                                <FormControl><div className="relative"><Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><Input type="email" autoComplete="email" placeholder="you@example.com" className={inputClassName} {...field} /></div></FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    <div className="grid gap-3.5 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</FormLabel>
                                    <FormControl><div className="relative"><LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><Input type="password" autoComplete="new-password" placeholder="Create password" className={inputClassName} {...field} /></div></FormControl>
                                    <FormMessage className="" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rePassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Confirm password</FormLabel>
                                    <FormControl><div className="relative"><LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><Input type="password" autoComplete="new-password" placeholder="Repeat password" className={inputClassName} {...field} /></div></FormControl>
                                    <FormMessage className="" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Phone number</FormLabel>
                                <FormControl><div className="relative"><Phone size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><Input type="tel" autoComplete="tel" placeholder="Your mobile number" className={inputClassName} {...field} /></div></FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant={undefined} size={undefined} disabled={form.formState.isSubmitting} className="mt-2 h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-emerald-700 disabled:opacity-70 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                        {form.formState.isSubmitting ? "Creating account..." : <>Create account <ArrowRight size={17} /></>}
                    </Button>
                    <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">By creating an account, you agree to shop responsibly with FreshCart.</p>
                </form>
            </Form>
        </AuthShell>
    );
}

