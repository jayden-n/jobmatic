import { useContext } from 'react';
import { AllJobsContext } from '../pages/AllJobsPage.js';

export const useAllJobsContext = () => useContext(AllJobsContext);
