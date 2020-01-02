import logger from "electron-log";
import unhandled from "electron-unhandled";

export function initLogger(): void {
	// Set log level for writing to file
	logger.transports.file.level = "info";

	// Catch unhandled errors and promise rejections, log them instead of crashing
	unhandled({
		logger: err => logger.error(err),
		showDialog: false,
	});
}
