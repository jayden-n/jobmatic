import { useContext } from 'react';
import { DashboardContext } from '../pages/DashboardPage.jsx';

export const useDashboardContext = () => useContext(DashboardContext);
