"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import AuthShell from "../_components/AuthShell/AuthShell";
import { loginSchema, type LoginSchemaType } from "../../schema/login.schema";

export default function Login() {
    const form = useForm<LoginSchemaType>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(loginSchema),
    });

    async function handleLogin(values: LoginSchemaType) {
        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
                callbackUrl: "/",
            });

            if (result?.ok) {
                toast.success("Welcome back!");
                window.location.href = result.url || "/";
                return;
            }

            toast.error("We couldn’t sign you in. Check your email and password, then try again.");
        } catch {
            toast.error("Sign in is temporarily unavailable. Please try again.");
        }
    }

    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Sign in to your account"
            description="Your everyday favorites are just a moment away."
            footer={<>New to FreshCart? <Link href="/register" className="ml-1 font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Create an account</Link></>}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Email address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <Input type="email" autoComplete="email" placeholder="you@example.com" className="h-12 rounded-xl border-slate-200 bg-stone-50/70 pl-11 text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <div className="flex items-center justify-between gap-3">
                                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</FormLabel>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <Input type="password" autoComplete="current-password" placeholder="Enter your password" className="h-12 rounded-xl border-slate-200 bg-stone-50/70 pl-11 text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant={undefined} size={undefined} disabled={form.formState.isSubmitting} className="mt-2 h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-emerald-700 disabled:opacity-70 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                        {form.formState.isSubmitting ? "Signing in..." : <>Sign in <ArrowRight size={17} /></>}
                    </Button>
                </form>
            </Form>
        </AuthShell>
    );
}

