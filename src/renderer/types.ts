// Diary

export type IndexDate = string;

export interface DiaryEntry {
	dateUpdated: string;
	title: string;
	text: string;
}

export type Entries = Record<IndexDate, DiaryEntry>;

export interface MiniDiaryJson {
	metadata: Metadata;
	entries: Entries;
}

export interface Metadata {
	application: string;
	version: string;
	dateUpdated: string;
}

// App

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Theme

export type Theme = "light" | "dark";

export type ThemePref = "auto" | Theme;

// Banner

export type BannerType = "error" | "info";

// Process status (import/export/encryption/decryption)

export type Status = "idle" | "inProgress" | "error";

// Import and export

export type ImportFormat = "jsonDayOne" | "jsonJrnl" | "jsonMiniDiary" | "txtDayOne";

export type ExportFormat = "jsonMiniDiary" | "md" | "pdf" | "txtDayOne";

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

export interface DayOneJson {
	metadata: {
		version: string;
	};
	entries: DayOneEntry[];
}

export interface JrnlEntry {
	date: string;
	title: string;
	body: string;
	[key: string]: string;
}

export interface JrnlJson {
	tags: Record<string, string>;
	entries: JrnlEntry[];
}

// DiaryEntry after conversion of MiniDiaryJson's entries into array (required for MiniDiaryJson
// import)
export interface ListDiaryEntry extends DiaryEntry {
	indexDate: string;
}

export type ImportEntry = string | DayOneEntry | DiaryEntry | JrnlEntry;
