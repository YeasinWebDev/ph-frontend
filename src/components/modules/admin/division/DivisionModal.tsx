import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation, useUpdateDivisionMutation } from "@/redux/feature/division/division.api";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  description: string;
}

export function DivisionModal({ isUpdate, division }: { isUpdate?: boolean; division?: any }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [addDivision, { isLoading }] = useAddDivisionMutation();
  const [updateDivision, { isLoading: isUpdating }] = useUpdateDivisionMutation();

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });


  useEffect(() => {
    if (isUpdate && division) {
      form.setValue("name", division.name);
      form.setValue("description", division.description);
      setPreviewUrl(division.thumbnail);
    } else {
      setPreviewUrl(null);
      setImage(null);
    }
  }, [isUpdate, division, form, open]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // ✅ Only append file if a new image was selected
    formData.append("file", image as File);

    if (isUpdate) {
      try {
        await updateDivision({ id: division?._id, formData }).unwrap();
        toast.success("Division updated successfully!");
        setOpen(false);
      } catch (error) {
        toast.error("Update failed!");
        console.error(error);
      }
    } else {
      try {
        await addDivision(formData).unwrap();
        toast.success("Division Added Successfully");
        setOpen(false);
        setImage(null);
        setPreviewUrl(null);
        form.reset();
      } catch (err) {
        console.error(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!isUpdate ? (
          <Button className="cursor-pointer">Add Division</Button>
        ) : (
          <Button className="cursor-pointer">
            <Edit2 />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Update Division" : "Add Division"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Division Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          {/* ✅ Pass both onChange and previewUrl */}
          <SingleImageUploader onChange={setImage} previewUrl={previewUrl} onRemovePreview={() => setPreviewUrl(null)} />
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className="cursor-pointer" disabled={isLoading || isUpdating} type="submit" form="add-division">
            {isUpdate ? "Update" : "Save"} changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
