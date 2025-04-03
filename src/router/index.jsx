import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Expenses from "../pages/Expenses";
import NewExpense from "../pages/NewExpense";
import Trips from "../pages/Trips";
import Approval from "../pages/Approval";
import NewTrip from "../pages/NewTrip";

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

export const privateRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/expenses",
    component: Expenses,
  },
  {
    path: "/newexpense",
    component: NewExpense,
  },
  {
    path: "/trips",
    component: Trips,
  },
  {
    path: "/approval",
    component: Approval,
  },
  {
    path: "/newtrips",
    component: NewTrip,
  },
];
