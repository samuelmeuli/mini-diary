import { is } from "electron-util";
import { release } from "os";
import { gte } from "semver";

const MOJAVE_VERSION = "10.14.0";

/**
 * Identify and return version of macOS
 * Source: electron-is by delvedor, MIT License
 */
function getMacosVersion(): string {
	const actual = release().split(".");
	return `10.${parseInt(actual[0], 10) - 4}.${actual[1]}`;
}

/**
 * Determine whether the current version of macOS is at least Mojave (which is the first version to
 * support Dark Mode)
 */
export function isAtLeastMojave(): boolean {
	if (!is.macos) {
		throw Error("The `isAtLeastMojave` function should only be called on macOS");
	}
	return gte(getMacosVersion(), MOJAVE_VERSION);
}
