import { z } from "zod";

// Phone number validation for Canadian format
const phoneRegex = /^(\+1|1)?[\s.-]?\(?[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || phoneRegex.test(val),
      { message: "Invalid phone number format" }
    ),
  subject: z
    .string()
    .trim()
    .max(200, { message: "Subject must be less than 200 characters" })
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Estimator form validation schema
export const estimatorFormSchema = z.object({
  // Step 1
  service: z.enum(["residential_painting", "stucco_eifs"], {
    errorMap: () => ({ message: "Please select a service" }),
  }),
  sqft: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 100, {
      message: "Square footage must be at least 100",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) <= 50000, {
      message: "Square footage must be less than 50,000",
    }),
  stories: z.enum(["1", "2", "3_plus"], {
    errorMap: () => ({ message: "Please select number of stories" }),
  }),
  
  // Step 2
  prepComplexity: z.enum(["none", "standard", "heavy", "structural_repair_required"], {
    errorMap: () => ({ message: "Please select prep complexity" }),
  }),
  finishQuality: z.enum(["standard", "premium", "luxury"], {
    errorMap: () => ({ message: "Please select finish quality" }),
  }),
  region: z.string().min(1, { message: "Please select a region" }),
  
  // Step 3
  scaffolding: z.enum(["low", "mid", "high"]).optional(),
  colorConsultation: z.boolean(),
  rushScheduling: z.boolean(),
  warrantyExtension: z.boolean(),
  siteCleanup: z.boolean(),
  
  // Step 5
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .refine((val) => phoneRegex.test(val), {
      message: "Invalid phone number format (e.g., (905) 555-0100)",
    }),
  address: z
    .string()
    .trim()
    .max(500, { message: "Address must be less than 500 characters" })
    .optional(),
  preferredContact: z
    .string()
    .max(50, { message: "Preferred contact must be less than 50 characters" })
    .optional(),
  notes: z
    .string()
    .trim()
    .max(1000, { message: "Notes must be less than 1000 characters" })
    .optional(),
});

export type EstimatorFormData = z.infer<typeof estimatorFormSchema>;
