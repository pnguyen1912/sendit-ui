import Dashboard from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import LabelImportant from "@material-ui/icons/LabelImportant";

// core components/views for Admin layout
import HomePage from './components/Home/Home';
import UserPage from './components/User/User';
import SendItPage from './components/SendIt/SendIt';

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: Home,
    component: HomePage,
    layout: "",
    requireLogin: false,
  }, {
    path: "/user",
    name: "User",
    icon: Person,
    component: UserPage,
    layout: "",
    requireLogin: true,
  }, {
    path: "/sendit",
    name: "SendIt",
    icon: LabelImportant,
    component: SendItPage,
    layout: "",
    requireLogin: false,
  },

  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "",
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "",
  // }
];

export default dashboardRoutes;
