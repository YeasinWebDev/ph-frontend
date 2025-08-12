import AddTour from '@/pages/admin/AddTour';
import AddTourType from '@/pages/admin/AddTourType';
import Analytics  from '@/pages/admin/Analytics';
const AdminSidebar = [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics
        }
      ],
    },
    {
      title: "Tour Management",
      url: "#",
      items: [
        {
          title: "Add Tour",
          url: "/admin/add-tour",
          component: AddTour
        },
        {
          title: "Add Tour Type",
          url: "/admin/add-tour-type",
          component: AddTourType
        }
      ],
    }
  ]

export default AdminSidebar