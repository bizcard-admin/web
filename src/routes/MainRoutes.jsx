import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/main/MainLayout';
import CreateCard from '../pages/cards/create/CreateCard';
import CardDetails from '../pages/cards/view/CardDetails';
import ContactList from '../pages/contacts/list/ContactList';
import IntegrationList from '../pages/integrations/list/IntegrationList';
import Analytics from '../pages/analytics/Analytics';
import Profile from '../pages/profile/Profile';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout/>,
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/dashboard/contacts',
      element: <ContactList />
    },
    {
      path: '/dashboard/card',
      element: <CreateCard />
    },
    {
      path: '/dashboard/card-details',
      element: <CardDetails />
    },
    {
      path: '/dashboard/integrations',
      element: <IntegrationList />
    },
    {
      path: '/dashboard/analytics',
      element: <Analytics />
    },
    {
      path: '/dashboard/profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
