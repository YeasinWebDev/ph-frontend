import { useChangePasswordMutation } from "@/redux/feature/auth/auth.api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useNavigate();

  const [changePassword] = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (oldPassword === "" || newPassword === "") {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password reset successfully!");
      setOldPassword("");
      setNewPassword("");

      router("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-orange-300">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors cursor-pointer">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
