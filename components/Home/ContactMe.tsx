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

import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import { useOnlineStatus } from "../../lib/utils";
import SectionContainer from "../shared/SectionContainer";


export default function ContactMe(
  props: Readonly<React.HTMLProps<HTMLDivElement>>,
) {
  return (
    <SectionContainer
      {...props}
      title="Let's Work Together"
      subtitle="Ready to bring your next project to life? Let's connect!"
    >
      <div className="mx-auto max-w-2xl">
        <div className="glass-effect rounded-2xl p-8">
          <FormComponent />
        </div>
      </div>
    </SectionContainer>
  );
}

function FormComponent() {
  const [status, setStatus] = useState("");

  const FormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    phone: z.string().min(1),
    message: z.string().min(1),
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
      formData.append("phone", form.getValues("phone"));
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                    aria-label="Name"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="yourname@gmail.com"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                    aria-label="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                    aria-label="Phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Message"
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                  aria-label="Message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={status === contactStatuses.loading}
          className="w-full transition-all hover:scale-105"
          aria-label="Send Message"
        >
          {status === contactStatuses.loading ? (
            <span className="flex gap-2">
              <LoaderCircle size={24} className="animate-spin" /> Sending...
            </span>
          ) : (
            <span>Send Message</span>
          )}
        </Button>
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
