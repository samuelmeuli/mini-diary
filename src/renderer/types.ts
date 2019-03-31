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

interface DiaryFile {
	metadata: Metadata;
	entries: Entries;
}

interface SearchResult {
	ref: string;
	title: string;
	text: string;
}

// Theme

type Theme = "light" | "dark";

type ThemePref = "auto" | Theme;

// Status of import/export/encryption/decryption

type Status = "idle" | "inProgress" | "error";

// Import and export

type ImportFormat = "dayOne" | "jrnl" | "json";

type ExportFormat = "json" | "md" | "pdf" | "txt";

// Banner

type BannerType = "error" | "info";
