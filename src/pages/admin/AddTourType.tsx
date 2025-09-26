import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/admin/Tour/AddTourTypeModal";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllToursTypeQuery, useRemoveTourTypeMutation } from "@/redux/feature/tour/tour.api";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddTourType() {
  const { data } = useGetAllToursTypeQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      await removeTourType(tourId).unwrap();
      toast.success("Tour Type removed", { id: toastId });
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
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
                <TableCell>
                  <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
