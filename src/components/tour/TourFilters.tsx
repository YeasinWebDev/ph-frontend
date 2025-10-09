import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/feature/division/division.api";
import { useGetAllToursTypeQuery } from "@/redux/feature/tour/tour.api";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionIsLoading } = useGetDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeIsLoading } = useGetAllToursTypeQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.divisions?.map((item: { _id: string; name: string }) => ({
    label: item.name,
    value: item._id,
  }));

  const tourTypeOptions = tourTypeData?.tourTypes?.map((item: { _id: string; name: string }) => ({
    label: item.name,
    value: item._id,
  }));

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  const FilterContent = (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>

      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select onValueChange={(value) => handleDivisionChange(value)} value={selectedDivision ? selectedDivision : ""} disabled={divisionIsLoading}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select onValueChange={handleTourTypeChange} value={selectedTourType ? selectedTourType : ""} disabled={tourTypeIsLoading}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tour Types</SelectLabel>
              {tourTypeOptions?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block col-span-3 w-full h-[250px] border border-muted rounded-md p-5 lg:sticky top-10 shadow-xl">{FilterContent}</div>

      {/* Mobile/Tablet Popup */}
      <div className="lg:hidden w-full flex md:justify-end mb-4 shadow-xl">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="fixed bottom-6 right-6 shadow-lg bg-primary rounded-full border-1 border-white w-12 h-12">
              <Filter className="h-12 w-12" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            {FilterContent}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
