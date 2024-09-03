import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { authRoutes } from './auth';
import ProtectedRoute from '../components/ProtectedRoutes';
import ProtectedAdminRoute from 'src/components/ProtectedAdminRoutes';

const Error404Page = lazy(() => import('src/pages/404'));
const Home = lazy(() => import('src/pages/Home/Home'));
const AllProducts = lazy(() => import('src/pages/Products/AllProducts'));
const ProductManagement = lazy(() => import('src/pages/Products/ProductManagement'));
const CustomerManagement = lazy(() => import('src/pages/Products/CustomerManagement'));
const HumanResource = lazy(() => import('src/pages/Products/HumanResource'));
const MarketingAutomation = lazy(() => import('src/pages/Products/MarketingAutomation'));
const AnalyticsAndBusinessIntelligence = lazy(() =>
  import('src/pages/Products/AnalyticsAndBusinessIntelligence')
);
const ProductDetails = lazy(() => import('src/pages/Products/ProductDetails'));
const MyOrders = lazy(() => import('src/pages/Account/MyOrders'));
const Orders = lazy(() => import('src/pages/Admin/Orders'));
const Providers = lazy(() => import('src/pages/Admin/Provider'));
const Services = lazy(() => import('src/pages/Admin/Services'));
const About = lazy(() => import('src/pages/About/About'));
const Deals = lazy(() => import('src/pages/Deals/Deals'));

export const routes = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        children: [
          {
            path: 'all',
            element: <AllProducts />,
          },
          {
            path: 'all/:id',
            element: <ProductDetails />,
          },
          {
            path: 'proj_mgmt',
            element: <ProductManagement />,
          },
          {
            path: 'proj_mgmt/:id',
            element: <ProductDetails />,
          },
          {
            path: 'cus_mgmt',
            element: <CustomerManagement />,
          },
          {
            path: 'cus_mgmt/:id',
            element: <ProductDetails />,
          },
          {
            path: 'hum_res',
            element: <HumanResource />,
          },
          {
            path: 'hum_res/:id',
            element: <ProductDetails />,
          },
          {
            path: 'mkt_auto',
            element: <MarketingAutomation />,
          },
          {
            path: 'mkt_auto/:id',
            element: <ProductDetails />,
          },
          {
            path: 'analytics_business_intl',
            element: <AnalyticsAndBusinessIntelligence />,
          },
          {
            path: 'analytics_business_intl/:id',
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'deals',
        element: <Deals />,
      },
      {
        path: 'account',
        children: [
          {
            path: 'orders',
            element: <ProtectedRoute element={<MyOrders />} />,
          },
        ],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'orders',
            element: <ProtectedAdminRoute element={<Orders />} />,
          },
          {
            path: 'providers',
            element: <ProtectedAdminRoute element={<Providers />} />,
          },
          {
            path: 'services',
            element: <ProtectedAdminRoute element={<Services />} />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
  ...authRoutes,
];
