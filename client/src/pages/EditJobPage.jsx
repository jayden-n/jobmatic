/* eslint-disable react-refresh/only-export-components */

import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/api/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
	try {
		const { data } = await customFetch.get(`/jobs/${params.id}`);
		// console.log(data);
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect("../all-jobs");
	}
};

export const action = async () => {
	return null;
};

const EditJobPage = () => {
	const { job } = useLoaderData();
	console.log(job);
	return <div>EditJobPage</div>;
};
export default EditJobPage;
