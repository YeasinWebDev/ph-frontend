import { DivisionModal } from "@/components/modules/admin/division/DivisionModal";
import { useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/feature/division/division.api";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function AddDivision() {
  const [page, setPage] = useState(1);
  const [deleteDivision] = useDeleteDivisionMutation();
  const { data ,isLoading } = useGetDivisionsQuery({
    page,
    limit: 5,
  });

  const meta = data?.meta;
  const divisions = data?.divisions;

  const handleRemoveDivision = async (divisionId: string) => {
    try {
      await deleteDivision(divisionId).unwrap();
      toast.success("Division deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Deletion failed!");
    }
  };

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      {/* Header Section */}
      <div className="flex items-center justify-center flex-col mb-6">
        <h1 className="text-3xl font-bold mb-3 text-center">Add Division</h1>
        <DivisionModal />
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto border rounded-md shadow">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[700px]">Description</TableHead>
              <TableHead className="text-right w-[150px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {divisions && divisions.length > 0 ? (
              divisions.map((item: { _id: string; name: string; thumbnail?: string; description?: string }) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-2">
                      <img src={item?.thumbnail || "/placeholder.png"} alt={item?.name} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell className="text-gray-600 max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">{item?.description || "No description"}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <DeleteConfirmation onConfirm={() => handleRemoveDivision(item._id)}>
                      <Button variant="destructive" className="cursor-pointer">
                        <Trash2 className="w-6 h-6" />
                      </Button>
                    </DeleteConfirmation>
                    <DivisionModal isUpdate={true} division={item} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-3xl ">
                  No divisions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6">
        {meta && divisions?.length > 0 && (
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-primary text-white rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2">
              Page {page} of {meta?.totalPage}
            </span>
            <button
              onClick={() => setPage((prev) => (prev < meta?.totalPage! ? prev + 1 : prev))}
              disabled={page === meta?.totalPage}
              className="px-4 py-2 bg-primary text-white rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
