import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { useForgetPasswordMutation, useLoginMutation } from "@/redux/feature/auth/auth.api";
import { loginFormSchema, type LoginFormSchemaType } from "@/validation/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { ApiError } from "@/types";

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();
  const [forgetPassword] = useForgetPasswordMutation();
  const onSubmit = async (data: LoginFormSchemaType) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
      const error = err as { data?: ApiError };
      toast.error(error.data?.message!);
    }
  };

  const handleForgetPassword = async () => {
    const email = form.getValues("email");
    if (email === "") {
      return toast.error("Please enter your email");
    }

    try {
      await forgetPassword({ email }).unwrap();
      toast.success("Please check your email to reset your password");
    } catch (error: any) {
      toast.error(error?.data?.message!);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
            <p onClick={handleForgetPassword} className="text-center text-[12px] text-gray-400 font-semibold cursor-pointer">
              Forget your password?
            </p>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>

        <Button
          onClick={() => {
            window.location.href = `${config.baseUrl}/auth/google`;
          }}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
