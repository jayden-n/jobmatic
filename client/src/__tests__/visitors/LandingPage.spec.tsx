import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LandingPage } from '../../pages';
import { BrowserRouter as Router } from 'react-router-dom';

test('should display landing page', () => {
	render(
		<Router>
			<LandingPage />
		</Router>,
	);

	const welcomeHeading = screen.getByRole('heading', {
		name: /welcome to jobmatic/i,
	});
	const registerLink = screen.getByRole('link', {
		name: /register/i,
	});
	const loginLink = screen.getByRole('link', {
		name: 'Login / Demo Usage',
	});

	expect(welcomeHeading).toBeInTheDocument();
	expect(registerLink).toBeInTheDocument();
	expect(loginLink).toBeInTheDocument();
});

test('should main image when screen size is larger than 992px', () => {
	render(
		<Router>
			<LandingPage />
		</Router>,
	);
	window.innerWidth = 1200;

	const mainImages = screen.getAllByAltText('landing image');
	expect(mainImages.length).toBeGreaterThan(0);
});
