import is from 'electron-is';

const MOJAVE_VERSION = '10.14.0';

/**
 * Return whether the OS is macOS and runs at least Mojave (v10.14)
 */
export function isAtLeastMojave() {
	return !is.gtRelease(MOJAVE_VERSION);
}
