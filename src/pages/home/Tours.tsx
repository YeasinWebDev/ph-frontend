import Loader from "@/components/Loader";
import TourFilters from "@/components/tour/TourFilters";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/feature/tour/tour.api";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Tours() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;

  const { data, isLoading } = useGetAllToursQuery({
    division,
    tourType,
    page, 
    limit: 5, 
  });

  const totalPages = data?.meta?.totalPage;

  if(isLoading){
    return (
      <Loader/>
    )
  }

  
  return (
    <div className="container mx-auto md:px-5 py-8 lg:grid  lg:grid-cols-12 gap-5 relative flex flex-col items-center justify-center md:items-start">
      <TourFilters />
      <div className="md:col-span-9 md:w-full">
        {data?.tours?.map((item) => (
          <div key={item.slug} className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex flex-col md:flex-row w-[18rem] md:w-full">
            <div className="md:w-2/5  flex-shrink-0">
              <img src={item.images[0]} alt={"location image"} className="object-cover w-full h-full " />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-muted-foreground mb-3">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">From ৳{item?.costFrom!.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Max {item.maxGuest} guests</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">From:</span> {item.departureLocation}
                </div>
                <div>
                  <span className="font-medium">To:</span> {item.arrivalLocation}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {item.tourPlan!.length} days
                </div>
                <div>
                  <span className="font-medium">Min Age:</span> {item.minAge}+
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item?.amenities!?.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full">
                    {amenity}
                  </span>
                ))}
                {item?.amenities!?.length > 3 && <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">+{item?.amenities!?.length - 3} more</span>}
              </div>

              <Button asChild className="w-full">
                <Link to={`/tours/${item?.slug}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
        <div className="flex gap-4 mt-4 items-center md:justify-end w-[18rem] md:w-full ">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-primary rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => (prev < totalPages! ? prev + 1 : prev))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-primary rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tours;
