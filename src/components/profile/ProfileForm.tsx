
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  district: z.string().optional(),
  postal_code: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const { profile, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      district: profile?.district || "",
      postal_code: profile?.postal_code || "",
    },
  });

  // Update form values when profile changes
  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        district: profile.district || "",
        postal_code: profile.postal_code || "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await updateProfile(values);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
                <Input placeholder="+8801XXXXXXXXX" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Your address" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input placeholder="Your district" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postal_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Your postal code" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
