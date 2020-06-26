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
	PATH_JSON_MINI_DIARY_3_3_0,
	PATH_JSON_MINI_DIARY_3_4_0,
	PATH_TXT_DAY_ONE,
} from "./setup/constants";

jest.mock("uuid", () => ({ v4: (): string => "00000000-0000-0000-0000-000000000000" }));

test("JSON (Day One) import", () => {
	const dayOneJsonStr = fs.readFileSync(PATH_JSON_DAY_ONE, ENCODING);
	const parsed = parseDayOneJson(dayOneJsonStr);
	expect(parsed).toEqual(referenceDataMd);
});

test("JSON (jrnl) import", () => {
	const jrnlJsonStr = fs.readFileSync(PATH_JSON_JRNL, ENCODING);
	const parsed = parseJrnlJson(jrnlJsonStr);
	expect(parsed).toEqual(referenceDataTxt);
});

test("JSON (Mini Diary) import", () => {
	const miniDiaryJsonStr = fs.readFileSync(PATH_JSON_MINI_DIARY_3_3_0, ENCODING);
	const parsed = parseMiniDiaryJson(miniDiaryJsonStr);
	expect(parsed).toEqual(referenceDataMd);
});

test("JSON (Mini Diary) import file exported from new version", () => {
	const miniDiaryJsonStr = fs.readFileSync(PATH_JSON_MINI_DIARY_3_4_0, ENCODING);
	const parsed = parseMiniDiaryJson(miniDiaryJsonStr);
	expect(parsed).toEqual(referenceDataMd);
});

test("TXT (Day One) import", () => {
	const dayOneTxtStr = fs.readFileSync(PATH_TXT_DAY_ONE, ENCODING);
	const parsed = parseDayOneTxt(dayOneTxtStr);
	expect(parsed).toEqual(referenceDataTxt);
});

jest.resetModules();
