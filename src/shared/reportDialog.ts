import unhandled from "electron-unhandled";
import { debugInfo, openNewGitHubIssue } from "electron-util";

/**
 * Returns the default text for a new GitHub issue (includes stack trace, app version, platform and
 * error description)
 */
function getIssueText(stack: string | undefined): string {
	return `**Stack trace:**

\`\`\`
${stack}
\`\`\`

---

**Environment:**

\`\`\`
${debugInfo()}
\`\`\`

---

**Error description:**

<!-- Please provide a detailed description of what caused the error: What were you doing in the app, after what action did the error occur? -->`;
}

/**
 * Catches unhandled errors and promise rejections. Displays an error dialog. Clicking the "Report"
 * button opens a new GitHub issue with information about the error
 */
export default function initReportDialog(): void {
	unhandled({
		reportButton: (error): void => {
			openNewGitHubIssue({
				user: "samuelmeuli",
				repo: "mini-diary",
				body: getIssueText(error.stack),
			});
		},
	});
}
