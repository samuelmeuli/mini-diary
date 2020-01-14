import crypto from "crypto";
import fs from "fs";

import mv from "move-file";

import { translations } from "../utils/i18n";

const CIPHER = "aes-192-cbc";

export function copyFile(sourcePath: string, destinationPath: string): void {
	fs.copyFileSync(sourcePath, destinationPath);
}

export function fileExists(filePath: string): boolean {
	return fs.existsSync(filePath);
}

export function moveFile(sourcePath: string, destinationPath: string): void {
	if (fileExists(destinationPath)) {
		throw Error(translations["file-exists"]);
	}
	mv.sync(sourcePath, destinationPath);
}

export function readFile(filePath: string): string | Buffer {
	return fs.readFileSync(filePath, { encoding: "utf8" });
}

export function readEncryptedFile(filePath: string, hashedPassword: string): string {
	const data = fs.readFileSync(filePath);
	const decipher = crypto.createDecipher(CIPHER, hashedPassword);
	const fileContent = Buffer.concat([decipher.update(data), decipher.final()]);
	return fileContent.toString();
}

export function writeFile(filePath: string, content: string | Buffer): void {
	fs.writeFileSync(filePath, content);
}

export function writeEncryptedFile(
	filePath: string,
	hashedPassword: string,
	content: string,
): void {
	const cipher = crypto.createCipher(CIPHER, hashedPassword);
	const encrypted = Buffer.concat([cipher.update(Buffer.from(content, "utf8")), cipher.final()]);
	fs.writeFileSync(filePath, encrypted);
}

export function deleteFile(filePath: string): void {
	fs.unlinkSync(filePath);
}
