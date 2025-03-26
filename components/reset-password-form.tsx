"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { resetPassword } from "@/lib/firebase/auth";
import { toast } from "sonner";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordRest = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      toast.success("Password reset link sent.");
      router.push("/signin"); // Navigate to the home page
    } catch (error) {
      toast.error("Error resetting password.");
      console.error("Error resetting password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex items-center justify-center text-center">
          <div className="border-2 border-gray-600 p-4 rounded-full">
            <LockIcon />
          </div>
          <CardTitle className="text-2xl">Trouble logging in?</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordRest}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                loader={isSubmitting}
                disabled={!email || isSubmitting}
              >
                Send
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
            <div className="mt-8 p-2 rounded text-center text-sm border">
              <a href="/signin">Back to login</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
