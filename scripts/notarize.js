/* eslint-disable */

const { notarize } = require("electron-notarize");
const pkg = require("../package.json");

exports.default = async context => {
	const { appOutDir, electronPlatformName } = context;

	if (electronPlatformName === "darwin") {
		return notarize({
			appBundleId: pkg.build.appId,
			appPath: `${appOutDir}/${pkg.productName}.app`,
			appleApiKey: process.env.INPUT_APPLE_API_KEY_ID,
			appleApiIssuer: process.env.INPUT_APPLE_API_KEY_ISSUER,
		});
	}
};
