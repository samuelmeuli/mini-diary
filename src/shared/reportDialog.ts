import unhandled from "electron-unhandled";
import { debugInfo, openNewGitHubIssue } from "electron-util";

/**
 * Catch unhandled errors and promise rejections. Display error dialog with report button. Reporting
 * will create a new GitHub issue with information about the error, app version and platform
 */
export default function initReportDialog(): void {
	unhandled({
		reportButton: (error): void => {
			openNewGitHubIssue({
				user: "samuelmeuli",
				repo: "mini-diary",
				body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`,
			});
		},
	});
}
