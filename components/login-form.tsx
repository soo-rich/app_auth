"use client";

import { cn } from "@/lib/utils";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Eye, EyeClosed } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    resolver: valibotResolver(
      v.object({
        username: v.pipe(
          v.string(),
          v.minLength(3, "Username must be at least 3 characters long"),
        ),
        password: v.pipe(
          v.string(),
          v.minLength(6, "Password must be at least 6 characters long"),
        ),
      }),
    ),
    defaultValues: {
      username: "admin",
      password: "admin123",
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res && res.error === null) {
      // Vars

      router.push("/home");
    } else {
      if (res?.error) {
        const error =
          res.error === "CredentialsSignin"
            ? "Invalid username or password"
            : res.error;
        console.log(error);
        toast.error(error);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full items-center gap-6"
          >
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="text"
                      required
                      {...field}
                      {...(errors.username && { "aria-invalid": "true" })}
                    />
                    {errors.username && (
                      <FieldDescription className="text-red-500">
                        {errors.username.message}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    {" "}
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <InputGroup>
                        <InputGroupInput
                          placeholder="Card number"
                          id="password"
                          type={show ? "text" : "password"}
                          required
                          {...field}
                          {...(errors.password && { "aria-invalid": "true" })}
                        />
                        <InputGroupAddon align="inline-end">
                          {show ? (
                            <Eye
                              className="cursor-pointer"
                              onClick={() => setShow(false)}
                            />
                          ) : (
                            <EyeClosed
                              className="cursor-pointer"
                              onClick={() => setShow(true)}
                            />
                          )}
                        </InputGroupAddon>
                      </InputGroup>

                      {errors.password && (
                        <FieldDescription className="text-red-500">
                          {errors.password.message}
                        </FieldDescription>
                      )}
                    </Field>
                  </>
                )}
              />

              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Default credentials: admin / adminpassword
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
