import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BarChart as BarIcon } from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";
import { useAnalyticsQuery } from "@/redux/feature/profile/profile.api";
import Loader from "@/components/Loader";
import { FaMoneyBill1 } from "react-icons/fa6";
import { useSidebar } from "@/components/ui/sidebar";

export default function Analytics() {
  const { data, isLoading } = useAnalyticsQuery({});
  const { state } = useSidebar();

  const bookingsData = data?.data?.bookingPerTourType;

  const revenueData = data?.data?.revenuePerTourType;
  const transactionData = data?.data?.transaction;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-6 overflow-hidden">
      {/* Top Metrics Cards */}
      <div className={`grid grid-cols-1 ${state === "expanded" ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-4 "} gap-4`}>
        <Card className="cursor-pointer hover:scale-105 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            <CardTitle>Total Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.data?.totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-500" />
            <CardTitle>Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.data?.totalBooking}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <FaMoneyBill1 className="w-6 h-6 text-yellow-500" />
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-1">
            <p className="text-2xl font-bold">{data?.data?.totalRevenue[0].totalRevenue}</p>
            <span className="font-semibold mt-2">bdt</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <BarIcon className="w-6 h-6 text-red-500" />
            <CardTitle>New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.data?.newUser}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className={`grid grid-cols-1 ${state === "expanded" ? "md:grid-cols-1 xl:grid-cols-2" : "md:grid-cols-2"} gap-4`}>
        {/* Bookings by Tour Type */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Tour Type</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData} className="cursor-pointer">
                <XAxis dataKey="tourType" />
                <YAxis dataKey="bookingCount" />
                <Tooltip />
                <Bar dataKey="bookingCount" fill="#ff6900" className="cursor-pointer" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={revenueData} dataKey="revenue" nameKey="tourType" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {revenueData.map((entry: string, index: number) => {
                    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                    return <Cell key={`cell-${index}-${entry}`} fill={randomColor} />;
                  })}
                </Pie>
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full min-w-[600px] md:min-w-[700px] lg:min-w-[800px] border-collapse text-sm md:text-base table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left font-semibold text-gray-700 whitespace-nowrap">ID</th>
                  <th className="p-2 text-left font-semibold text-gray-700 whitespace-nowrap">Tour</th>
                  <th className="p-2 text-left font-semibold text-gray-700 whitespace-nowrap">User</th>
                  <th className="p-2 text-left font-semibold text-gray-700 whitespace-nowrap">Amount</th>
                  <th className="p-2 text-left font-semibold text-gray-700 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionData?.map((transaction: any, index: number) => (
                  <tr key={index} className={`border-b hover:bg-gray-50 transition-colors ${transactionData.length - 1 === index ? "border-b-0" : ""}`}>
                    <td className="p-2 font-semibold text-gray-800 whitespace-nowrap">{index + 1}</td>
                    <td className="p-2 font-semibold whitespace-nowrap text-gray-800">{transaction?.tour?.name}</td>
                    <td className="p-2 font-semibold whitespace-nowrap text-gray-800">{transaction?.user?.name}</td>
                    <td className="p-2 font-semibold text-gray-800 whitespace-nowrap">
                      {transaction?.payment?.amount} <span className="text-sm text-gray-600">bdt</span>
                    </td>
                    <td
                      className={`p-2 font-semibold whitespace-nowrap ${
                        transaction.status === "FAILED" ? "text-red-500" : transaction.status === "CANCEL" ? "text-yellow-500" : "text-green-500"
                      }`}
                    >
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
