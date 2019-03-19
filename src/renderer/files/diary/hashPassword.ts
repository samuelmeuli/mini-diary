import crypto from "crypto";

const CIPHER = "sha512";
const ITERATIONS = 500000;
const KEY_BYTE_LENGTH = 64;
const SALT =
	"KvAUQORXF8OBYXcYmIwHBpahc7I9Td+qe+H1/eGTaXvI9XfRLngERiC4ufpfx4mqvQgITb0t+ns840lJcRRTKQmF65vje5/Wfb99Nsu6kxDudTiM5pKUcmn36fEJ9/lhFIyBd18Unouh3OiTxO+5xhGugtujNARLijOzkDkYy/8=";

export function hashPassword(password: string): string {
	try {
		const hash = crypto.pbkdf2Sync(password, SALT, ITERATIONS, KEY_BYTE_LENGTH, CIPHER);
		return hash.toString("hex");
	} catch (err) {
		throw Error(`Error while hashing password: ${err.toString()}`);
	}
}
