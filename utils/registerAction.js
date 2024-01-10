import customFetch from "../client/src/utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const registerAction = async ({ request }) => {
	// getting form data values
	const formData = await request.formData();
	// turn data values into an object
	const data = Object.fromEntries(formData);

	// must always return something:
	try {
		await customFetch.post("/auth/register", data);
		toast.success("Registration successful!");
		return redirect("/login");
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};
