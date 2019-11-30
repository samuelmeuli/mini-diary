import fs from "fs";

import {
	parseDayOneJson,
	parseJrnlJson,
	parseMiniDiaryJson,
} from "../src/renderer/files/import/json";
import { parseDayOneTxt } from "../src/renderer/files/import/txt";
import { referenceDataMd, referenceDataTxt } from "./import-export/referenceData";
import {
	ENCODING,
	PATH_JSON_DAY_ONE,
	PATH_JSON_JRNL,
	PATH_JSON_MINI_DIARY,
	PATH_TXT_DAY_ONE,
} from "./setup/constants";

test("JSON (Day One) import", () => {
	const dayOneJsonStr = fs.readFileSync(PATH_JSON_DAY_ONE, ENCODING);
	const parsed = parseDayOneJson(dayOneJsonStr);
	expect(parsed).toStrictEqual(referenceDataMd);
});

test("JSON (jrnl) import", () => {
	const jrnlJsonStr = fs.readFileSync(PATH_JSON_JRNL, ENCODING);
	const parsed = parseJrnlJson(jrnlJsonStr);
	expect(parsed).toStrictEqual(referenceDataTxt);
});

test("JSON (Mini Diary) import", () => {
	const miniDiaryJsonStr = fs.readFileSync(PATH_JSON_MINI_DIARY, ENCODING);
	const parsed = parseMiniDiaryJson(miniDiaryJsonStr);
	expect(parsed).toStrictEqual(referenceDataMd);
});

test("TXT (Day One) import", () => {
	const dayOneTxtStr = fs.readFileSync(PATH_TXT_DAY_ONE, ENCODING);
	const parsed = parseDayOneTxt(dayOneTxtStr);
	expect(parsed).toStrictEqual(referenceDataTxt);
});
