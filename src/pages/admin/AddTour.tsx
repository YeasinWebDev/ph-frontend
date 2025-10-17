import Loader from "@/components/Loader";
import TourModel from "@/components/modules/admin/Tour/TourModel";
import { Button } from "@/components/ui/button";
import { useDeleteTourMutation, useGetAllToursQuery } from "@/redux/feature/tour/tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AddTour() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllToursQuery({
    page,
    limit: 5,
  });

  const [deleteTour] = useDeleteTourMutation();

  const totalPages = data?.meta?.totalPage;

  if (isLoading) {
    return <Loader />;
  }

  const handelDelete = async(id: string) => {
    await deleteTour(id);
    toast.success("Tour deleted successfully");
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold flex items-center justify-center mb-3">Add Tour</h1>
        <TourModel isUpdate={false} />
      </div>

      <div className="md:col-span-9 md:w-ful flex flex-col items-center justify-center mt-10 lg:mx-20">
        {data?.tours?.map((item) => (
          <div key={item.slug} className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex flex-col md:flex-row w-[18rem] md:w-full">
            <div className="md:w-2/5  flex-shrink-0 relative">
              <img src={item.images[0]} alt={"location image"} className="object-cover w-full h-full " />
              <div className="absolute top-5 right-5 flex gap-2 items-center">
                <Trash2 color="white" size={30} className="bg-red-600 p-1 rounded cursor-pointer" onClick={() => handelDelete(item._id)}/>
                <TourModel isUpdate={true} tour={item}/>
              </div>
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

export default AddTour;
