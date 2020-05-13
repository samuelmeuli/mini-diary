import { Translations } from "../../../shared/types";

const translationsZh: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "关于{appName}",
	"bring-all-to-front": "全部置顶",
	close: "关闭",
	copy: "复制",
	cut: "剪切",
	edit: "编辑",
	file: "文件",
	help: "帮助",
	"hide-app": "隐藏{appName}",
	"hide-others": "隐藏其他所有",
	minimize: "最小化",
	paste: "粘贴",
	preferences: "首选项",
	"quit-app": "退出{appName}",
	redo: "重做",
	"select-all": "全选",
	"show-all": "全部显示",
	speech: "文字转语音",
	"start-speaking": "开始播放",
	"stop-speaking": "停止播放",
	undo: "撤销",
	view: "视图",
	window: "窗口",
	zoom: "缩放",

	// Menu (app-specific)
	export: "导出",
	"export-to-format": "导出为{format}",
	"go-to-date": "跳转到",
	"go-to-today": "回到今天",
	import: "导入",
	"import-from-format": "从{format}导入",
	license: "许可协议",
	"lock-diary": "锁定日记",
	"next-day": "向后1天",
	"next-month": "向后1月",
	"previous-day": "向前1天",
	"previous-month": "向前1月",
	"privacy-policy": "隐私条款",
	statistics: "统计数据",
	website: "官网",

	// Weekdays
	sunday: "星期日",
	monday: "星期一",
	tuesday: "星期二",
	wednesday: "星期三",
	thursday: "星期四",
	friday: "星期五",
	saturday: "星期六",

	// Theme
	dark: "深色",
	light: "浅色",
	theme: "主题",

	// Calendar
	today: "今天",

	// Editor
	"add-a-title": "添加标题",
	bold: "粗体",
	bullets: "项目清单",
	italic: "斜体",
	list: "列表清单",
	"write-something": "写点什么",

	// Search
	clear: "清除",
	"no-results": "无结果",
	"no-title": "无标题",
	search: "查找",

	// Preferences
	"allow-future-entries": "允许创建将来的条目",
	auto: "自动",
	"diary-entries": "日记条目",
	"first-day-of-week": "一周的首日",
	no: "No",
	ok: "OK",
	"reset-diary": "重置日记本",
	"reset-diary-confirm": "是的，我确定",
	"reset-diary-msg": "你确定要重置日记本吗？重置将会删除你的所有内容，并且不能被恢复！",

	// Password and directory
	"change-directory": "更改路径",
	"change-password": "更改密码",
	"choose-password": "请为您的日记本设置一个密码",
	"decryption-error": "加密日记文件发生错误",
	"diary-file": "日记文件",
	"file-exists": "目标路径已存在其他文件",
	"move-error-msg": "移动文件过程中发生了错误",
	"move-error-title": "移动错误",
	"move-file": "移动文件",
	"new-password": "新密码",
	password: "密码",
	"passwords-no-match": "两次输入不一致",
	"repeat-new-password": "重复输入密码",
	"repeat-password": "重复密码",
	"select-directory": "选择路径",
	"set-password": "设置密码",
	unlock: "解锁",
	"wrong-password": "密码错误",

	// Import
	"import-error-msg": "导入过程中发生了错误",
	"import-error-title": "导入错误",
	"import-instructions-day-one":
		"打开Day One并依次点击File → Export → {format}，导出数据文件并解压，然后选择解压后的文件并导入到{appName}.",
	"import-instructions-jrnl":
		"要导出jrnl数据文件，请运行命令 {command}. 然后选择导出的JSON文件并导入到{appName}.",
	"import-instructions-mini-diary":
		"你可以从之前由{appName}导出的JSON文件或者其他保持相同格式的JSON文件导入数据.",
	"start-import": "开始导入",

	// Export
	"export-error-msg": "导出过程中发生了错误",
	"export-error-title": "导出错误",

	// Other
	loading: "启动中",
};

export default translationsZh;
