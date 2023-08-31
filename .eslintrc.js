module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'flow-app-server/tsconfig.json',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'no-console': 1,
		'prettier/prettier': 0
	}
}
