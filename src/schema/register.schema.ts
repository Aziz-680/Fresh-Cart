import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long." }),
    
    email: z.string()
        .email({ message: "Please enter a valid email address." }),
    
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." }),
    
    rePassword: z.string(),
    
    phone: z.string()
        .regex(/^01[0125][0-9]{8}$/, { message: "Please enter a valid Egyptian phone number." })
})
.refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"], 
});


export type RegisterSchemaType = z.infer<typeof registerSchema>;
