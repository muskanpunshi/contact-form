import { z } from "zod";

export const ContactUsSchema = z.object({

    name: z
        .string({
            required_error: "Name is required",
        })
        .min(1, "Name is required"),

    email: z
        .string({
            required_error: "Email is required",
        })
        .min(1, "Email is required")
        .email("Email is invalid"),
    phone: z
        .string({
            required_error: "Phone Number is required",
        }),
    question: z
        .string({
            required_error: "Message is required",
        })
        .optional(),
    gReCaptchaToken: z.string().optional()
});

export type ContactInput = z.infer<typeof ContactUsSchema>;