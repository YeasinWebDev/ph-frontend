import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/feature/division/division.api";
import { useGetAllToursTypeQuery } from "@/redux/feature/tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 w-full">
      {/* Division Select */}
      <div className="min-w-[100px]">
        <Select onValueChange={handleDivisionChange} value={selectedDivision || ""} disabled={divisionIsLoading}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Division" />
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

      {/* Tour Type Select */}
      <div className="min-w-[100px]">
        <Select onValueChange={handleTourTypeChange} value={selectedTourType || ""} disabled={tourTypeIsLoading}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Tour Type" />
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

      {/* Clear Filter Button */}
      <div>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
    </div>
  );

  return <div className=" w-full rounded-md p-5 sticky top-0 bg-white">{FilterContent}</div>;
}
