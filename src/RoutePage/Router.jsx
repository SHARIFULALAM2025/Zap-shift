import { createBrowserRouter } from 'react-router'
import Root from '../LayoutPage/Root'
import Home from '../Pages/Home/Home/Home'
import Coverage from '../Pages/Coverage/Coverage'
import Error from '../ErrorPage/Error'
import About from '../Pages/About/About'
import AuthLayout from '../Authentication/AuthenticationLayout/AuthLayout'
import Login from '../Authentication/AuthenticationLayout/Login'
import Register from '../Authentication/AuthenticationLayout/Register'
import Private from '../Authentication/PrivatePage/Private'
import Rider from '../Pages/Rider/Rider'
import ParcelSend from '../Pages/Parcel/ParcelSend'
import Dashboard from '../LayoutPage/Dashboard'
import MyParcel from '../Pages/DashboardPage/MyParcel'
import Payment from '../Pages/DashboardPage/payment/Payment'
import PaymentSuccess from '../Pages/DashboardPage/payment/PaymentSuccess'
import PaymentCancelled from '../Pages/DashboardPage/payment/PaymentCancelled'
import paymentHistory from '../Pages/DashboardPage/payment/PaymentHistory'
import RiderHistory from '../Pages/DashboardPage/RiderHistory'
import UserManagement from '../Pages/DashboardPage/UserManagement'
import AdminRoute from '../Authentication/PrivatePage/AdminRoute'


export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <Error></Error>,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'Coverage',
        Component: Coverage,
      },
      {
        path: 'AboutUs',
        Component: About,
      },
      {
        path: 'Rider',
        element: (
          <Private>
            <Rider></Rider>
          </Private>
        ),
      },
      {
        path: 'parcel',
        element: (
          <Private>
            <ParcelSend></ParcelSend>
          </Private>
        ),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <Private>
        <Dashboard></Dashboard>
      </Private>
    ),
    children: [
      {
        path: 'myParcel',
        Component: MyParcel,
      },
      {
        path: 'payment/:id',
        Component: Payment,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancel',
        Component: PaymentCancelled,
      },
      {
        path: 'payment-history',
        Component: paymentHistory,
      },
      {
        path: 'rider-history',
        element:<AdminRoute><RiderHistory></RiderHistory></AdminRoute>,
      },
      {
        path: 'user-management',
        element:<AdminRoute><UserManagement></UserManagement></AdminRoute>
      },
    ],
  },
])
