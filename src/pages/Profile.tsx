import EditProfileModal from "@/components/Home/EditProfileModal";
import Loader from "@/components/Loader";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { useNavigate } from "react-router";

export default function UserProfileCard() {
  const { data, isLoading,refetch } = useUserInfoQuery({});
  const router = useNavigate();
  const user = data?.data;

  if (!user && !isLoading) {
    router("/");
  }
  if (isLoading) return <Loader />;
  const created = new Date(user?.createdAt).toLocaleString();
  const updated = new Date(user?.updatedAt).toLocaleString();


  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className=" overflow-hidden">
        <div className="flex flex-col items-center justify-center space-x-6 md:p-6 gap-10">
          <img
            src={user?.picture || "https://img.favpng.com/15/23/12/health-person-icon-in-blue-circle-pLHYWZJL.jpg"}
            alt={`${user?.name} avatar`}
            className="w-28 h-28 rounded-full object-cover border shadow-sm mx-auto"
            onError={(e) => (e.currentTarget.src = "https://img.favpng.com/15/23/12/health-person-icon-in-blue-circle-pLHYWZJL.jpg")  }
          />

          <div className="mt-4 text-center flex-1">
            <div className="flex items-start gap-12">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-semibold ">{user?.name}</h2>
                <p className="text-sm  mt-1">{user?.email}</p>
                <p className="text-sm  mt-1 font-semibold"> phone: {user?.phone || "N/A"}</p>
                <p className="text-sm  mt-1 font-semibold">address: {user?.address || "N/A"}</p>
              </div>

              <div className="items-center sm:space-x-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide border ${
                    user?.isActive === "ACTIVE" ? "bg-green-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
                  }`}
                >
                  {user?.isActive}
                </span>

                {user?.isVerified ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100">Verified</span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100">Unverified</span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Role</p>
                <p className="font-medium">{user?.role}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-400">Bookings</p>
                <p className="font-medium">{user?.bookings?.length ?? 0}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-400">Guides</p>
                <p className="font-medium">{user?.guides?.length ?? 0}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-400">Auth</p>
                <p className="font-medium">{user?.auths?.length > 0 ? user?.auths?.map((a: any) => a.provider).join(", ") || "—" : "Credential"}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-500 flex flex-col items-start">
              <p>
                <span className="font-medium text-slate-700">Created:</span> {created}
              </p>
              <p className="mt-1">
                <span className="font-medium text-slate-700">Updated:</span> {updated}
              </p>
            </div>

            <EditProfileModal user={user} refetch={refetch}/>
          </div>
        </div>
      </div>
    </div>
  );
}
