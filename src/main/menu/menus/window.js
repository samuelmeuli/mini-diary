const { translate } = require("../../i18n/i18n");

module.exports = {
	label: translate("window"),
	role: "window",
	submenu: [
		{
			label: translate("minimize"),
			role: "minimize",
		},
		{
			label: translate("close"),
			role: "close",
		},
	],
};
