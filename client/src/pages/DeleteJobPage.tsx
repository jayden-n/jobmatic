import { toast } from 'react-toastify';
import customFetch from '../utils/api/customFetch';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

/* eslint-disable react-refresh/only-export-components */
export const action =
	(queryClient: QueryClient) =>
	async ({ params }: ActionFunctionArgs) => {
		try {
			await customFetch.delete(`/jobs/${params.id}`);
			queryClient.invalidateQueries(['jobs']);
			toast.success('Job deleted successfully!');
		} catch (error: any) {
			toast.error(error?.response?.data?.msg);
		}
		return redirect('../all-jobs');
	};
