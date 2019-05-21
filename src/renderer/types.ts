// Diary

type IndexDate = string;

interface DiaryEntry {
	dateUpdated: string;
	title: string;
	text: string;
}

type Entries = Record<IndexDate, DiaryEntry>;

interface Metadata {
	application: string;
	version: string;
	dateUpdated: string;
}

interface SearchResult {
	ref: string;
	title: string;
	text: string;
}

// Theme

type Theme = "light" | "dark";

type ThemePref = "auto" | Theme;

// Banner

type BannerType = "error" | "info";

// Process status (import/export/encryption/decryption)

type Status = "idle" | "inProgress" | "error";

// Import and export

type ImportFormat = "jsonDayOne" | "jsonJrnl" | "jsonMiniDiary" | "txtDayOne";

type ExportFormat = "jsonMiniDiary" | "md" | "pdf" | "txtDayOne";

interface DayOneEntry {
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

interface DayOneJson {
	metadata: {
		version: string;
	};
	entries: DayOneEntry[];
}

interface JrnlJson {
	tags: Record<string, string>;
	entries: {
		date: string;
		title: string;
		body: string;
		[key: string]: string;
	}[];
}

interface MiniDiaryJson {
	metadata: Metadata;
	entries: Entries;
}
