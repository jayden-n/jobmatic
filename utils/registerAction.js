import customFetch from "../client/src/utils/customFetch";
import { redirect } from "react-router-dom";

export const registerAction = async ({ request }) => {
	// getting form data values
	const formData = await request.formData();
	// turn data values into an object
	const data = Object.fromEntries(formData);

	// must always return something:
	try {
		await customFetch.post("/auth/register", data);
		return redirect("/login");
	} catch (error) {
		console.log(error);
		return error;
	}
};
