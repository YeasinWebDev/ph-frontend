import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import { CalendarIcon, Edit, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatISO } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTourMutation, useGetAllToursTypeQuery, useUpdateTourMutation } from "@/redux/feature/tour/tour.api";
import { useGetDivisionsQuery } from "@/redux/feature/division/division.api";
import Loader from "@/components/Loader";
import MultipleImageUploader from "@/components/MultipleImageUploader ";
import toast from "react-hot-toast";

function TourModel({ isUpdate, tour }: { isUpdate?: boolean; tour?: any }) {
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState<(File | string)[]>([]);
  const { data: TourTypeData, isLoading: isTourTypeLoading } = useGetAllToursTypeQuery(undefined);
  const { data: divisionData, isLoading: isDivisionLoading } = useGetDivisionsQuery(undefined);
  const [addTour, { isLoading }] = useCreateTourMutation();
  const [updateTour, { isLoading: isUpdateLoading }] = useUpdateTourMutation();
  const defaultValues = {
    name: "",
    description: "",
    location: "",
    costFrom: "",
    startDate: new Date(),
    endDate: new Date(),
    departureLocation: "",
    arrivalLocation: "",
    include: [{ value: "" }],
    exclude: [{ value: "" }],
    amenities: [],
    tourPlan: [],
    maxGuest: "",
    minAge: "",
    division: "",
    tourType: "",
  };

  const form = useForm({ defaultValues });

  useEffect(() => {
    const loadTourData = async () => {
      if (isUpdate && tour) {
        form.reset({
          name: tour.name,
          description: tour.description,
          location: tour.location,
          costFrom: tour.costFrom,
          startDate: new Date(tour.startDate),
          endDate: new Date(tour.endDate),
          departureLocation: tour.departureLocation,
          arrivalLocation: tour.arrivalLocation,
          include: tour.include?.map((v: string) => ({ value: v })) || [{ value: "" }],
          exclude: tour.exclude?.map((v: string) => ({ value: v })) || [{ value: "" }],
          amenities: tour.amenities || [],
          tourPlan: tour.tourPlan || [],
          maxGuest: tour.maxGuest,
          minAge: tour.minAge,
          division: tour.division,
          tourType: tour.tourType,
        });

        setImages(tour.images);
      }
    };

    loadTourData();
  }, [isUpdate, tour, form]);

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({
    control: form.control,
    name: "include",
  });

  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({
    control: form.control,
    name: "exclude",
  });

  if (isTourTypeLoading || isDivisionLoading) {
    return <Loader />;
  }

  const divisionOptions = divisionData?.divisions?.map((division: { _id: string; name: string }) => ({
    value: division._id,
    label: division.name,
  }));

  const tourTypeOptions = TourTypeData?.tourTypes?.map((tourType: { _id: string; name: string }) => ({
    value: tourType._id,
    label: tourType.name,
  }));

  const handleSubmit = async () => {
    if (isUpdate) {
      handleUpdateTour(form.getValues());
    } else {
      handleCreateTour(form.getValues());
    }
  };

  async function urlToFile(url: string, filename: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const ext = blob.type.split("/")[1];
    const name = filename || `image-${Date.now()}.${ext}`;
    return new File([blob], name, { type: blob.type });
  }

  const handleUpdateTour = async (data: any) => {
    try {
      const existingUrls = images.filter((img) => typeof img === "string") as string[];
      const newFiles = images.filter((img) => img instanceof File) as File[];

      // ✅ convert existing urls to files
      const existingFiles = await Promise.all(existingUrls.map((url, i) => urlToFile(url, `existing-${i}.jpg`)));

      const allFiles = [...existingFiles, ...newFiles];

      const tourData = {
        ...data,
        startDate: formatISO(data.startDate),
        endDate: formatISO(data.endDate),
        costFrom: Number(data.costFrom),
        maxGuest: Number(data.maxGuest),
        minAge: Number(data.minAge),
        include: data.include.map((item: { value: string }) => item.value),
        exclude: data.exclude.map((item: { value: string }) => item.value),
      };

      const formData = new FormData();

      allFiles.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("data", JSON.stringify(tourData));

      await updateTour({ id: tour._id, formData }).unwrap();

      toast.success("Tour updated successfully");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update tour");
    }
  };

  const handleCreateTour = async (data: any) => {
    try {
      // Create tour data with correct date format
      const tourData = {
        ...data,
        startDate: formatISO(data.startDate),
        endDate: formatISO(data.endDate),
        costFrom: Number(data.costFrom),
        maxGuest: Number(data.maxGuest),
        minAge: Number(data.minAge),
        include: data.include.map((item: { value: string }) => item.value),
        exclude: data.exclude.map((item: { value: string }) => item.value),
      };

      // Create FormData
      const formData = new FormData();

      // Append files
      images.forEach((image) => {
        formData.append("files", image);
      });

      formData.append("data", JSON.stringify(tourData));

      // Send to backend
      await addTour(formData).unwrap();

      toast.success("Tour added successfully");
      setOpen(false);
      form.reset(defaultValues);
      setImages([]);
    } catch (error) {
      toast.error("Failed to add tour");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isUpdate ? <Edit size={30} color="white" className="cursor-pointer bg-green-600 p-1 rounded" /> : <Button className="cursor-pointer">Add Tour</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] overflow-y-scroll h-[90vh] p-0 md:p-4">
        <DialogHeader className="flex items-center justify-center my-5">
          <DialogTitle className="text-2xl">Add Tour</DialogTitle>
        </DialogHeader>
        <Card className="border-0">
          <CardContent>
            <Form {...form}>
              <form id="add-tour-form" className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="costFrom"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="departureLocation"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Departure Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="arrivalLocation"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Arrival Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>Division</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isDivisionLoading}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisionOptions?.map((item: { label: string; value: string }) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tourType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tour Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isTourTypeLoading}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tourTypeOptions?.map((option: { value: string; label: string }) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="maxGuest"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Max Guest</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minAge"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Minimum Age</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5 flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-5 items-stretch flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="h-[205px] resize-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex-1 mt-5">
                    <MultipleImageUploader value={images} onChange={setImages} />
                  </div>
                </div>
                <div className="border-t border-muted w-full "></div>
                <div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Included</p>
                    <Button type="button" variant="outline" size="icon" onClick={() => appendIncluded({ value: "" })}>
                      <Plus />
                    </Button>
                  </div>

                  <div className="space-y-4 mt-4">
                    {includedFields.map((item, index) => (
                      <div className="flex gap-2" key={item.id}>
                        <FormField
                          control={form.control}
                          key={item.id}
                          name={`include.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button onClick={() => removeIncluded(index)} variant="destructive" className="!bg-red-700" size="icon" type="button">
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Excluded</p>
                    <Button type="button" variant="outline" size="icon" onClick={() => appendExcluded({ value: "" })}>
                      <Plus />
                    </Button>
                  </div>

                  <div className="space-y-4 mt-4">
                    {excludedFields.map((item, index) => (
                      <div className="flex gap-2" key={item.id}>
                        <FormField
                          control={form.control}
                          name={`exclude.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button onClick={() => removeExcluded(index)} variant="destructive" className="!bg-red-700" size="icon" type="button">
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-5">
            <Button className="cursor-pointer" type="button" onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit" form="add-tour-form" disabled={isLoading || isUpdateLoading}>
              {isLoading || isUpdateLoading ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default TourModel;
