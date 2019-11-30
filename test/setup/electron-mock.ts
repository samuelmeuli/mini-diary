// Mock Electron functions (because the Electron process is not available during testing)
module.exports = {
	remote: {
		app: {
			name: "Mini Diary",
			getPath: jest.fn().mockReturnValue("/path/to/mini-diary.txt"),
			getVersion: jest.fn().mockReturnValue("v0.0.0"),
		},
	},
};
