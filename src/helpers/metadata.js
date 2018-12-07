const { app } = window.require('electron').remote;

const METADATA = {
	application: app.getName(),
	version: app.getVersion()
};


export function getMetadata() {
	return {
		...METADATA,
		dateUpdated: new Date().toString()
	};
}
