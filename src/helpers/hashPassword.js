import crypto from 'crypto';


export default function hashPassword(password) {
	const salt = 'KvAUQORXF8OBYXcYmIwHBpahc7I9Td+qe+H1/eGTaXvI9XfRLngERiC4ufpfx4mqvQgITb0t+ns840lJcRRTKQmF65vje5/Wfb99Nsu6kxDudTiM5pKUcmn36fEJ9/lhFIyBd18Unouh3OiTxO+5xhGugtujNARLijOzkDkYy/8=';
	try {
		const hash = crypto.pbkdf2Sync(password, salt, 500000, 64, 'sha512');
		return hash.toString('hex');
	} catch (e) {
		throw Error(`Error while hashing password: ${e.message}`);
	}
}
