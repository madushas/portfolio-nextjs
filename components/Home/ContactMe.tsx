"use client";

import { LoaderCircle, MailCheck, MailX, User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { WEB3FORM_ACCESS_KEY } from "@/lib/env";
import { handleApiError, retryFetch } from "@/lib/api";


import SectionContainer from "../shared/SectionContainer";


export default function ContactMe(
  props: Readonly<React.HTMLProps<HTMLDivElement>>,
) {
  // Only pass className and id (or other relevant props) to SectionContainer to avoid passing form-specific props
  const { className, id } = props;
  return (
    <SectionContainer
      className={className}
      id={id}
      title="Let's Work Together"
      subtitle="Ready to bring your next project to life? Let's connect!"
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left side - Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Have a project in mind? I'd love to hear about it. Whether it's a new idea, 
                an existing project that needs help, or just a conversation about possibilities.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-[var(--r-2)] bg-muted border border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--r-1)] bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Response Time</p>
                  <p className="text-xs text-muted-foreground">Usually within 1-2 business days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-[var(--r-2)] bg-muted border border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--r-1)] bg-primary/10">
                  <MailCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Privacy</p>
                  <p className="text-xs text-muted-foreground">Your info is only used to respond to your inquiry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <div className="rounded-[var(--r-3)] border border-border bg-card p-8 shadow-sm">
              <FormComponent />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function FormComponent() {
  const [status, setStatus] = useState("");

  const FormSchema = z.object({
    name: z.string().min(1, { error: "Name is required" }),
    email: z.email({ error: "Invalid email address" }).min(1, { error: "Email is required" }),
    phone: z
      .string()
      .optional()
      .refine((v) => !v || /^[+\d\s().-]+$/.test(v), { error: "Use numbers, spaces, +, or -" }),
    message: z.string().min(1, { error: "Message is required" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const contactStatuses = {
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };

  const onSubmit = async () => {
    setStatus(contactStatuses.loading);
    try {
      const formData = new FormData();
      formData.append("name", form.getValues("name"));
      formData.append("email", form.getValues("email"));
      const phoneVal = form.getValues("phone") || "";
      formData.append("phone", phoneVal);
      formData.append("message", form.getValues("message"));
      formData.append("access_key", WEB3FORM_ACCESS_KEY);

      const response = await retryFetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setStatus(contactStatuses.submitted);
        form.reset();
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      const apiError = handleApiError(error);
      console.error("Form submission error:", apiError);
      setStatus(contactStatuses.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-busy={status === contactStatuses.loading}>
        <div className="space-y-6">
          {/* Name and Email row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="h-12 bg-background border-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      aria-label="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="your.email@example.com"
                      className="h-12 bg-background border-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      aria-label="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Phone Number
                  <span className="text-xs text-muted-foreground font-normal ml-2">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className="h-12 bg-background border-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    aria-label="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  Include if you prefer a call or WhatsApp message
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                    className="min-h-[140px] bg-background border-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all resize-none"
                    aria-label="Project Message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={status === contactStatuses.loading}
            className="w-full h-12 text-sm font-medium bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.9)] transition-all shadow-sm"
            aria-label="Send Message"
          >
            {status === contactStatuses.loading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle size={20} className="animate-spin" />
                Sending Message...
              </span>
            ) : (
              <span>Send Message</span>
            )}
          </Button>
        </div>
      </form>
      <FormSumbitAlertDialog status={status} setStatus={setStatus} />
    </Form>
  );
}

function FormSumbitAlertDialog({
  status,
  setStatus,
}: Readonly<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>) {
  return (
    <AlertDialog
      open={status == "submitted" || status == "error"}
      onOpenChange={() => {
        setStatus("");
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === "submitted"
              ? "Email Sent Successfully"
              : "Email Failed"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex items-center gap-2">
              {status === "submitted" ? <MailCheck /> : <MailX />}
              {status === "submitted"
                ? "Your email has been sent successfully."
                : "There was an error sending your email."}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setStatus("")}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
