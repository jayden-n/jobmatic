import { useContext } from 'react';
import { AllJobsContext } from '../pages/AllJobsPage.jsx';

export const useAllJobsContext = () => useContext(AllJobsContext);
