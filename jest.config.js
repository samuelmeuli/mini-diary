module.exports = {
	moduleNameMapper: {
		electron: "<rootDir>/tests/setup/electron-mock.js",
	},
	setupFiles: ["<rootDir>/tests/setup/setup.js"],
};
