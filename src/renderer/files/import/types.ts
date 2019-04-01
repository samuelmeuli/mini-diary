// Day One

export interface DayOneEntry {
	creationDevice: string;
	text: string;
	richText: string;
	uuid: string;
	modifiedDate: string;
	creationDeviceType: string;
	starred: boolean;
	duration: number;
	creationDeviceModel: string;
	creationDate: string;
	creationOSVersion: string;
	creationOSName: string;
	timeZone: string;
}

export interface DayOneFile {
	metadata: {
		version: string;
	};
	entries: DayOneEntry[];
}

// Jrnl

export interface JrnlFile {
	tags: Record<string, string>;
	entries: {
		date: string;
		title: string;
		body: string;
		[key: string]: string;
	}[];
}
