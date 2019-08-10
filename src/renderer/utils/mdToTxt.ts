import remark from "remark";
import stringify from "remark-stringify";
import strip from "strip-markdown";

/**
 * Remove formatting characters (e.g. "*" for bold) from the provided Markdown string
 */
export default async function mdToTxt(md: string): Promise<string> {
	const txt = await remark()
		// Remove Markdown formatting (except for list bullets/numbers)
		.use(strip, { keep: ["list", "listItem"] })
		// Convert remaining Markdown to string
		.use(stringify, { listItemIndent: "1" })
		.process(md);
	return txt.contents.toString();
}
