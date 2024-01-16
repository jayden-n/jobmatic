import { toast } from "react-toastify";
import customFetch from "../utils/api/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import styled from "styled-components";

/* eslint-disable react-refresh/only-export-components */
export const loader = async () => {
	try {
		const res = await customFetch.get("/users/admin/application-stats");
		return res.data;
	} catch (error) {
		toast.error("You are not authorized to access this route!");
		console.log(error?.response?.data?.msg);
		return redirect("/dashboard");
	}
};

const AdminPage = () => {
	const { users, jobs } = useLoaderData();
	return (
		<Wrapper>
			<h1>admin</h1>
		</Wrapper>
	);
};

const Wrapper = styled.div``;
export default AdminPage;
