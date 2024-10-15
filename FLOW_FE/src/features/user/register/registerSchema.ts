import { z } from "zod";

const schema = z
    .object({
        firstName: z
            .string()
            .min(1, "First Name is required")
            .max(50, "First Name can't exceed 50 characters"),
        lastName: z
            .string()
            .min(1, "Last Name is required")
            .max(50, "Last Name can't exceed 50 characters"),
        email: z
            .string()
            .email("Invalid email address")
            .min(1, "Email is required"),
        phone: z
            .string()
            .regex(/^[0-9]+$/, "Phone number must contain only digits")
            .min(10, "Phone number must be at least 10 digits long")
            .optional(),
        password: z.string().superRefine((password, ctx) => {
            if (password.length < 8) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must be at least 8 characters long.",
                });
            }

            if (!/[A-Z]/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "Password must contain at least 1 uppercase letter.",
                });
            }

            if (!/[a-z]/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "Password must contain at least 1 lowercase letter.",
                });
            }

            if (!/\d/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least 1 number.",
                });
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "Password must contain at least 1 special character.",
                });
            }

            if (/\s/.test(password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must not contain any whitespaces.",
                });
            }
        }),
        repeatPassword: z.string().min(1, "Repeat Password required"),
    })
    .refine((data) => data.password === data.repeatPassword, {
        path: ["repeatPassword"],
        message: "Passwords do not match",
    });

export default schema;
