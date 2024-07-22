import { z } from "zod"



export const signUpValidation = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 letters' }),
    username: z.string().min(2, { message: 'Username is too short' }).max(50),
    email:  z
    .string()
    .regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        { message: 'Invalid email address' }
    )
    .min(3, { message: 'Email must be at least 3 characters' })
    .max(320, { message: 'Email must be less than 320 characters' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(64, { message: 'Password must be less than 64 characters' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/\d/, { message: 'Password must contain at least one number' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
    }),
});


export const signInValidation = z.object({
    email:  z.string().regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        { message: 'Invalid email address' }
    ),
    password : z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(64, { message: 'Password must be less than 64 characters' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/\d/, { message: 'Password must contain at least one number' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
    }),
})

export const createPostValidation = z.object({
    Caption:  z.string().min(5).max(2200),
    file : z.custom<File[]>(),
    location : z.string().optional(),
    tags : z.string().optional()
})


export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
});