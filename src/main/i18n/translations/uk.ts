import { Translations } from "../../../shared/types";

const translationsUk: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Про {appName}",
	"bring-all-to-front": "Показати всі вікна",
	close: "Закрити",
	copy: "Копіювати",
	cut: "Вирізати",
	edit: "Редагувати",
	file: "Файл",
	help: "Допомога",
	"hide-app": "Сховати {appName}",
	"hide-others": "Сховати решту",
	minimize: "Згорнути",
	paste: "Вставити",
	preferences: "Параметри",
	"quit-app": "Вийти з {appName}",
	redo: "Назад",
	"select-all": "Вибрати все",
	"show-all": "Показати всі",
	speech: "Диктування",
	"start-speaking": "Почати диктування",
	"stop-speaking": "Зупинити диктування",
	undo: "Вперед",
	view: "Перегляд",
	window: "Вікно",
	zoom: "Збільшення",

	// Menu (app-specific)
	export: "Експорт",
	"export-to-format": "Експортувати як {format}",
	import: "Імпорт",
	"import-from-format": "Імпортувати з {format}",
	license: "Ліцензія",
	"lock-diary": "Заблокувати {appName}",
	"next-day": "Наступний день",
	"next-month": "Наступний місяць",
	"previous-day": "Попередній день",
	"previous-month": "Попередній місяць",
	"privacy-policy": "Політика Приватності",
	statistics: "Статистика",
	website: "Веб-сайт",

	// Weekdays
	sunday: "Неділя",
	monday: "Понеділок",
	tuesday: "Вівторок",
	wednesday: "Середа",
	thursday: "Четвер",
	friday: "П’ятниця",
	saturday: "Субота",

	// Theme
	dark: "Темна",
	light: "Світла",
	theme: "Тема",

	// Calendar
	today: "Сьогодні",

	// Editor
	"add-a-title": "Додати заголовок",
	bold: "Жирний",
	bullets: "Маркований список",
	italic: "Курсив",
	list: "Нумерований список",
	"write-something": "Напишіть щось",

	// Search
	clear: "Очистити",
	"no-results": "Немає результатів",
	"no-title": "Без заголовка",
	search: "Пошук",

	// Preferences
	"allow-future-entries": "Дозволити записи в майбутньому часі",
	auto: "Автоматично",
	"diary-entries": "Записи в щоденнику",
	"first-day-of-week": "Перший день тижня",
	no: "Ні",
	"reset-diary": "Скинути щоденник",
	"reset-diary-confirm": "Так, скинути",
	"reset-diary-msg":
		"Ви впевнені, що хочете скинути (видалити) ваш щоденник? Буде видалено всі ваші записи. Дані неможливо буде відновити (якщо немає резервної копії)",

	// Password and directory
	"change-directory": "Змінити папку",
	"change-password": "Змінити пароль",
	"choose-password": "Введіть пароль для вашого щоденника",
	"decryption-error": "Помилка під час розшифрування файлу щоденника",
	"diary-file": "Файл щоденника",
	"file-exists": "В цій папці вже є інший файл",
	"move-error-msg": "Виникла помилка під час переміщення файлу",
	"move-error-title": "Помилка переміщення",
	"move-file": "Перемістити файл",
	"new-password": "Новий пароль",
	password: "Пароль",
	"passwords-no-match": "Паролі не збігаються",
	"repeat-new-password": "Повторити пароль",
	"repeat-password": "Повторити пароль",
	"select-directory": "Вибрати директорію",
	"set-password": "Задати пароль",
	unlock: "Розблокувати",
	"wrong-password": "Невірний пароль",

	// Statistics
	"total-entries": "загалом записів",
	"entries-per-week": "записів на тиждень",
	"streak-best": "безперервних записів (рекордний проміжок)",
	"streak-current": "безперервних записів (поточний проміжок)",
	"total-words": "загалом слів",
	"words-per-entry": "слів у записі",

	// Import
	"import-error-msg": "Виникла помилка під час імпорту",
	"import-error-title": "Помилка імпорту",
	"import-instructions-day-one":
		"Відкрийте застосунок Day One та експортуйте ваш щоденник через меню Файл → Експорт → {формат}. Розархівуйте створений файл. В наступному кроці, виберіть цей файл {format}, щоб імпортувати його в {appName}.",
	"import-instructions-jrnl":
		"Щоб експортувати ваш щоденник jrnl, виконайте цю команду: {command}. В наступному кроці, виберіть створений JSON файл, щоб імпортувати його в {appName}.",
	"import-instructions-mini-diary":
		"Ви можете імпортувати дані з попереднього JSON експорту (в застосунку {appName}), або з JSON файлу такого ж формату.",
	"start-import": "Почати імпорт",

	// Export
	"export-error-msg": "Виникла помилка під час експорту",
	"export-error-title": "Помилка експорту",

	// Other
	loading: "Завантаження",
};

export default translationsUk;
