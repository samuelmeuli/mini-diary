declare module "*.png" {
	const value: any;
	export = value;
}

declare module "*.svg" {
	const value: any;
	export = value;
}

declare module "markdown-draft-js";

declare module "strip-markdown";

// TODO: Remove once https://github.com/yuehu/word-count/pull/5 is merged
declare module "word-count" {
	export default function count(data: string): number;
}
