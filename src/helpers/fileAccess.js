import crypto from 'crypto';
import fs from 'fs';


export function fileExists(filePath) {
	return fs.existsSync(filePath);
}

export function moveFile(oldFilePath, newFilePath) {
	fs.renameSync(oldFilePath, newFilePath);
}

export function readFile(filePath, password) {
	const data = fs.readFileSync(filePath);
	const decipher = crypto.createDecipher('aes192', password);
	const fileContent = Buffer.concat([decipher.update(data), decipher.final()]);
	return JSON.parse(fileContent.toString());
}

export function writeFile(filePath, password, content) {
	const cipher = crypto.createCipher('aes192', password);
	const encrypted = Buffer.concat([
		cipher.update(Buffer.from(JSON.stringify(content), 'utf8')), cipher.final()
	]);
	fs.writeFileSync(filePath, encrypted);
}
