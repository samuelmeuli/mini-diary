import crypto from 'crypto';
import fs from 'fs';


export function fileExists(filePath) {
	if (!filePath) {
		throw Error('filePath not specified');
	}
	return fs.existsSync(filePath);
}

export function moveFile(oldFilePath, newFilePath) {
	if (!oldFilePath) {
		throw Error('oldFilePath not specified');
	}
	if (!newFilePath) {
		throw Error('newFilePath not specified');
	}
	fs.renameSync(oldFilePath, newFilePath);
}

export function readFile(filePath, hashedPassword) {
	if (!filePath) {
		throw Error('filePath not specified');
	}
	if (!hashedPassword) {
		throw Error('hashedPassword not specified');
	}
	const data = fs.readFileSync(filePath);
	const decipher = crypto.createDecipher('aes192', hashedPassword);
	const fileContent = Buffer.concat([decipher.update(data), decipher.final()]);
	return JSON.parse(fileContent.toString());
}

export function writeFile(filePath, hashedPassword, content) {
	if (!filePath) {
		throw Error('filePath not specified');
	}
	if (!hashedPassword) {
		throw Error('hashedPassword not specified');
	}
	if (!content) {
		throw Error('content not specified');
	}
	if (content === null || typeof content !== 'object') {
		throw Error('content is not an object');
	}
	const cipher = crypto.createCipher('aes192', hashedPassword);
	const encrypted = Buffer.concat([
		cipher.update(Buffer.from(JSON.stringify(content), 'utf8')), cipher.final()
	]);
	fs.writeFileSync(filePath, encrypted);
}
