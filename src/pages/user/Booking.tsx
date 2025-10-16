import Loader from "@/components/Loader";
import { useMyBookingQuery } from "@/redux/feature/booking/booking.api";
import { useState } from "react";
import { Link } from "react-router";

function Booking() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All'); 

  const { data, isLoading } = useMyBookingQuery({
    page,
    limit: 5,
    status: statusFilter, 
  });

  const myBooking = data?.data;
  const meta = data?.meta;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex flex-col justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-center md:text-left">My Bookings</h2>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1); 
            setStatusFilter(e.target.value);
          }}
          className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-black"
        >
          <option value="All">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETE">Complete</option>
          <option value="CANCEL">Cancel</option>
        </select>
      </div>

      {myBooking?.length === 0 ? (
        <h2 className="text-center text-lg text-gray-500 font-medium">No Booking Found</h2>
      ) : (
        <div className="space-y-4 w-full">
          {myBooking?.map((booking:any) => (
            <div key={booking._id} className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-xl p-3 shadow-sm hover:shadow-md transition">
              {/* Left: Tour Info */}
              <div className="flex items-center gap-4">
                <img src={booking.tour.images[0]} alt={booking.tour.name} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{booking.tour.name}</h3>
                  <p className="text-sm text-gray-500">{booking.tour.location}</p>
                  <p className="text-sm text-gray-400">{new Date(booking.tour.startDate).toLocaleDateString()}</p>
                  <Link to={`/tours/${booking.tour.slug}`} className="text-sm text-orange-500 hover:underline">
                    View Tour
                  </Link>
                </div>
              </div>

              {/* Right: Booking Info */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-3 md:mt-0">
                <div className="w-14 flex flex-col items-center justify-center gap-2">
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-semibold">{booking.guestCount || 1}</p>
                </div>

                <div className="w-20 flex flex-col items-center justify-center gap-2">
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="font-semibold text-green-600">৳{booking.totalPrice || booking.tour.costFrom}</p>
                </div>

                <div className="w-24 flex flex-col items-center justify-center gap-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === "COMPLETE"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "CANCEL"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "PENDING"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta?.totalPage > 1 && (
        <div className="flex gap-4 mt-6 items-center md:justify-end w-[18rem] md:w-full">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-primary rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">
            Page {page} of {meta?.totalPage}
          </span>
          <button
            onClick={() => setPage((prev) => (prev < meta?.totalPage ? prev + 1 : prev))}
            disabled={page === meta?.totalPage}
            className="px-4 py-2 bg-primary rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Booking;
