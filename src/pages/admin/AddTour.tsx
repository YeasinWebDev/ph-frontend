import Loader from "@/components/Loader";
import TourModel from "@/components/modules/admin/Tour/TourModel";
import TourFilters from "@/components/tour/TourFilters";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useDeleteTourMutation, useGetAllToursQuery } from "@/redux/feature/tour/tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

function AddTour() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const { state } = useSidebar();
  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;
  const { data, isLoading } = useGetAllToursQuery({
    division,
    tourType,
    page,
    limit: 5,
  });

  const [deleteTour] = useDeleteTourMutation();

  const totalPages = data?.meta?.totalPage;

  if (isLoading) {
    return <Loader />;
  }

  const handelDelete = async (id: string) => {
    await deleteTour(id);
    toast.success("Tour deleted successfully");
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold flex items-center justify-center mb-3">Add Tour</h1>
        <TourModel isUpdate={false} />
        <TourFilters />
      </div>

      <div
        className={`grid grid-cols-1 ${
          state === "expanded" ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        }  place-items-center mx-auto gap-5 mt-5 w-full`}
      >
        {data?.tours?.map((item) => (
          <div
            key={item.slug}
            className={`border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex flex-col w-[20rem] md:w-[22rem] ${
              state === "expanded" ? "lg:w-[22rem] xl:w-[23rem] 2xl:w-[25rem]" : "lg:w-[25rem] xl:w-[25rem]"
            }`}
          >
            {/* Left Image Section */}
            <div className="flex-shrink-0 relative">
              <img src={item.images[0]} alt="location image" className="object-cover w-full h-[300px] " />
              <div className="absolute top-5 right-5 flex gap-2 items-center">
                <Trash2 color="white" size={30} className="bg-red-600 p-1 rounded cursor-pointer" onClick={() => handelDelete(item._id)} />
                <TourModel isUpdate={true} tour={item} />
              </div>
            </div>

            {/* Right Info Section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              {/* Content */}
              <div>
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
              </div>

              {/* View Details Button - fixed at bottom */}
              <Button asChild className="w-full mt-auto">
                <Link to={`/tours/${item?.slug}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {data && data?.tours?.length > 4 && (
        <div className="flex gap-4 mt-4 items-center justify-center">
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
      )}
    </div>
  );
}

export default AddTour;
