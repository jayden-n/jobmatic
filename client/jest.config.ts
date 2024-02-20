export default {
	preset: 'ts-jest',
	rootDir: 'src',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.ts',
		'^@app/(.*)$': '<rootDir>/$1',
		'\\.(css)$': 'identity-obj-proxy',
	},
};
