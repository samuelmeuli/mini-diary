import MockDate from "mockdate";

// Set date for tests to make `new Date()` return the same date as the one used in the sample
// import/export files. The timezone is set using an environment variable in `package.json`
MockDate.set("Tue Jan 01 2019 00:00:00 GMT+0000");
