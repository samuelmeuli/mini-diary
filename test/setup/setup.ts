import MockDate from "mockdate";
import moment from "moment-timezone";

// Set date for tests to make `moment()` return the same date as the one used in the sample import/
// export files
MockDate.set("Thu Jan 03 2019 00:00:00 GMT-0800");
moment.tz.setDefault("America/Los_Angeles");
