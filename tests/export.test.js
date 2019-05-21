import fs from "fs";

import { convertToMiniDiaryJson } from "../src/renderer/files/export/json";
import { convertToDayOneTxt } from "../src/renderer/files/export/txt";
import { referenceDataMd } from "./import-export/referenceData";
import { ENCODING, PATH_JSON_MINI_DIARY, PATH_TXT_DAY_ONE } from "./setup/constants";

test("JSON (Mini Diary) export", async () => {
	const miniDiaryJsonStr = fs.readFileSync(PATH_JSON_MINI_DIARY, ENCODING);
	await expect(convertToMiniDiaryJson(referenceDataMd)).resolves.toStrictEqual(miniDiaryJsonStr);
});

test("TXT (Day One) export", async () => {
	const dayOneTxtString = fs.readFileSync(PATH_TXT_DAY_ONE, ENCODING);
	await expect(convertToDayOneTxt(referenceDataMd)).resolves.toStrictEqual(dayOneTxtString);
});
