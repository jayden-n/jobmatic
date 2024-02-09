import { useContext } from 'react';
import { DashboardContext } from '../pages/DashboardPage.js';

export const useDashboardContext = () => useContext(DashboardContext);
