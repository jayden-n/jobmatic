import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LandingPage } from '../pages';
import { BrowserRouter as Router } from 'react-router-dom';
test('demo', () => {
	expect(true).toBe(true);
});

test('should display something', () => {
	render(
		<Router>
			<LandingPage />
		</Router>,
	);
	expect(true).toBeTruthy();
});
