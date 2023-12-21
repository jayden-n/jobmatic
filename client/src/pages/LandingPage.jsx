import styled from "styled-components";
import main from "../assets/images/main.svg";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<Wrapper>
			<nav>
				<img src={logo} alt='jobmatic' className='logo' />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
						itaque autem hic cum voluptatem earum a quis! Commodi nam sunt quo
						voluptatibus nemo nesciunt iure pariatur deleniti aut autem.
						Quibusdam, totam quia.
					</p>
					<Link to='/register' className='btn register-link'>
						Register
					</Link>
					<Link to='/login' className='btn'>
						Login / Demo
					</Link>
				</div>

				<img src={main} alt='landing image' className='img main-img' />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

export default LandingPage;
