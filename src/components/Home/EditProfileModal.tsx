import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendCodeMutation, useUpdateProfileMutation, useVerifyUserMutation } from "@/redux/feature/profile/profile.api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  image: FileList;
  phone: string;
  address: string;
  verificationCode?: string;
};

interface EditProfileModalProps {
  user: any;
  refetch: () => void;
}

export default function EditProfileModal({ user, refetch }: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
      phone : user?.phone || "",
      address : user?.address || "",
    },
  });

  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [verifyUser, { isLoading: verifying }] = useVerifyUserMutation();
  const [sendCode, { isLoading: sending }] = useSendCodeMutation();

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image?.[0]) {
      formData.append("file", data.image[0]); // ✅ correct field name
    }
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    try {
      await updateProfile({
        id: user?._id,
        formData, 
      }).unwrap();

      toast.success("Profile updated successfully!");
      refetch();
      setOpen(false);
    } catch (error) {
      toast.error("Update failed!");
      console.error(error);
    }
  };

  const handleVerify = async (code: string) => {
    await verifyUser({ email: user?.email, otp: code });
    setShowVerifyInput(false);
    refetch();
    toast.success("You verified successfully");
  };

  const handleSendCode = async () => {
    await sendCode({ name: user?.name, email: user?.email });
    setShowVerifyInput(true);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex items-center gap-2 mt-10 cursor-pointer">
        <Button>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input {...register("name")} placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Phone</label>
            <Input type="number" {...register("phone")} placeholder="Your phone number" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Address</label>
            <Input {...register("address")} placeholder="Your address" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Profile Image</label>
            <Input type="file" {...register("image")} className="cursor-pointer" />
          </div>

          {!user?.isVerified && !showVerifyInput && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Verify your account</label>
              <Button disabled={sending} type="button" variant="outline" className="w-fit cursor-pointer" onClick={() => handleSendCode()}>
                Verify
              </Button>
            </div>
          )}

          {showVerifyInput && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Verify your account</label>
              <div className="flex gap-2">
                <Input placeholder="Enter verification code" {...register("verificationCode")} />
                <Button type="button" onClick={() => handleVerify((document.querySelector('input[name="verificationCode"]') as HTMLInputElement)?.value)} disabled={verifying}>
                  Submit
                </Button>
              </div>
              <p className="text-sm text-primary/80 mx-auto">Please check your email for the verification code</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={updating}>
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
