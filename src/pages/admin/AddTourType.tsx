import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import Loader from "@/components/Loader";
import { AddTourTypeModal } from "@/components/modules/admin/Tour/AddTourTypeModal";
import UpdateTourTypeModel from "@/components/modules/admin/Tour/UpdateTourTypeModel";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllToursTypeQuery, useRemoveTourTypeMutation } from "@/redux/feature/tour/tour.api";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddTourType() {
  const { data, isLoading } = useGetAllToursTypeQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      await removeTourType(tourId).unwrap();
      toast.success("Tour Type removed", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex flex-col items-center justify-center gap-2 my-8">
        <h1 className="text-3xl font-semibold mb-2">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.tourTypes?.map((item: { _id: string; name: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">{item?.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
                    <Button size="sm" className="p-4.5 cursor-pointer">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                  <UpdateTourTypeModel tourTypeId={item._id} name={item.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
