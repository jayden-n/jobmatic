import { toast } from "react-toastify";
import customFetch from "../utils/api/customFetch";
import { redirect } from "react-router-dom";

/* eslint-disable react-refresh/only-export-components */
export const action = async ({ params }) => {
	try {
		await customFetch.delete(`/jobs/${params.id}`);
		toast.success("Job deleted successfully!");
	} catch (error) {
		toast.error(error?.response?.data?.msg);
	}
	return redirect("../all-jobs");
};
