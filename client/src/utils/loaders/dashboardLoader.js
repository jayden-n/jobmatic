import { redirect } from "react-router-dom";
import customFetch from "../api/customFetch";

export const dashboardLoader = async () => {
	try {
		const { data } = await customFetch.get("/users/current-user");
		return data;
	} catch (error) {
		// if any issues with JWT, send user back to homepage
		return redirect("/");
	}
};
