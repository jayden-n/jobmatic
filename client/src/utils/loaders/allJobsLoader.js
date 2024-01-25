import customFetch from '../api/customFetch';
import { toast } from 'react-toastify';

export const allJobsLoader = async ({ request }) => {
	// console.log(request.url);
	const params = Object.fromEntries([
		// turn the url query values into object
		...new URL(request.url).searchParams.entries(),
	]);

	try {
		const { data } = await customFetch.get('/jobs', {
			// pass in the params thru axios
			params,
		});
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};
