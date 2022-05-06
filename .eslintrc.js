module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:import/recommended',
		'plugin:react/recommended',
		'airbnb',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/prop-types': [0],
		'default-param-last': [0],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@src', './src'],
					['@util', './src/util'],
					['@redux', './src/redux'],
				],
			},
		},
	},
};
