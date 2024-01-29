import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../api/customFetch";

export const loginAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	// display the errors to the client before it hits server
	const errors = { msg: "" };
	if (data.password.length < 3) {
		errors.msg = "Password too short...";
		return errors;
	}

	try {
		await customFetch.post("/auth/login", data);
		toast.success("Login successful!");
		return redirect("/dashboard");
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};
