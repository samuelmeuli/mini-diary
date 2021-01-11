import fs from "fs";

import { convertToMiniDiaryJson } from "../src/renderer/files/export/json";
import { convertToDayOneTxt } from "../src/renderer/files/export/txt";
import { referenceDataMd } from "./import-export/referenceData";
import { ENCODING, PATH_JSON_MINI_DIARY_3_4_0, PATH_TXT_DAY_ONE } from "./setup/constants";

jest.mock("electron", () => ({
	remote: {
		app: {
			getVersion: (): string => "v3.4.0",
			getPath: (): string => "dummy",
			name: "Mini Diary",
		},
	},
}));

test("JSON (Mini Diary) export", async () => {
	const miniDiaryJsonStr = fs.readFileSync(PATH_JSON_MINI_DIARY_3_4_0, ENCODING);
	const convertedMiniDiaryJsonStr = await convertToMiniDiaryJson(referenceDataMd);
	expect(JSON.parse(convertedMiniDiaryJsonStr)).toEqual(JSON.parse(miniDiaryJsonStr));
});

test("TXT (Day One) export", async () => {
	const dayOneTxtString = fs.readFileSync(PATH_TXT_DAY_ONE, ENCODING);
	await expect(convertToDayOneTxt(referenceDataMd)).resolves.toStrictEqual(dayOneTxtString);
});

jest.resetModules();
