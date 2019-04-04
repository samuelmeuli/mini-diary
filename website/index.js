/**
 * Based on JavaScript code of Caprine website by Sindre Sorhus (https://sindresorhus.com/caprine)
 */

const APP_STORE_URL = "https://itunes.apple.com/app/mini-diary/id1450296884";
const API_URL = "https://api.github.com/repos/samuelmeuli/mini-diary/releases/latest";

function getAssetExtension() {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.match(/(mac|os x)/)) {
		return "dmg";
	}
	if (userAgent.match(/windows/)) {
		return "exe";
	}
	if (userAgent.match(/linux/)) {
		return "AppImage";
	}
	throw Error("Unrecognized platform");
}

async function updateDownloadUrl() {
	try {
		// Get download URL for current platform
		const assetExtension = getAssetExtension();
		const apiResponse = await fetch(API_URL);

		let downloadUrl;
		if (assetExtension === "dmg") {
			downloadUrl = APP_STORE_URL;
		} else {
			const json = await apiResponse.json();
			downloadUrl = json.assets.filter(asset =>
				asset.browser_download_url.endsWith(assetExtension),
			)[0].browser_download_url;
		}

		// Update download link
		document.getElementById("download-link").href = downloadUrl;
	} catch {
		// Unrecognized platform: Leave default URL for download button, remove "Download for different
		// platform" link
		document.getElementById("all-platforms-link").remove();
	}
}

updateDownloadUrl();
