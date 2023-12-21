import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	// console.log(error);
	return (
		<>
			<h1>Error Page</h1>
			<Link to='/'>Back Home</Link>
			<p>{error.status}</p>
		</>
	);
};
export default ErrorPage;
