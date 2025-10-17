import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateTourTypeMutation } from "@/redux/feature/tour/tour.api";
import { Edit2 } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

function UpdateTourTypeModel({name,tourTypeId}:{name:string,tourTypeId:string}) {
  const form = useForm({
    defaultValues: {
      name: name,
    },
  });
  const [UpdateTourType] = useUpdateTourTypeMutation();

  const onSubmit = async (data: FieldValues) => {
    const res = await UpdateTourType({id:tourTypeId, name: data.name }).unwrap();
    
    if (res.success) {
      toast.success("Tour Type Updated");
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Edit2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Tour Type</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="update-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Type Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tour Type Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" form="update-tour-type">
                update changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default UpdateTourTypeModel;
