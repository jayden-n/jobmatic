import customFetch from '../api/customFetch';
import { toast } from 'react-toastify';

export const allJobsLoader = async () => {
	console.log('hello');
	try {
		const { data } = await customFetch.get('/jobs');
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};
