import { Translations } from "../../../shared/types";

const translationsTr: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "{appName} Hakkında",
	"bring-all-to-front": "Tümünü Öne Çıkart",
	close: "Kapat",
	copy: "Kopyala",
	cut: "Kes",
	edit: "Düzenle",
	file: "Dosya",
	help: "Yardım",
	"hide-app": "{appName}'yi Gizle",
	"hide-others": "Diğerlerini Gizle",
	minimize: "Pencereyi Küçült",
	paste: "Yapıştır",
	preferences: "Tercihler",
	"quit-app": "{appName}'den Çıkış Yap",
	redo: "Yinele",
	"select-all": "Tümünü Seç",
	"show-all": "Tümünü Göster",
	speech: "Ses",
	"start-speaking": "Konuşmaya Başla",
	"stop-speaking": "Konuşmayı Durdur",
	undo: "Geri Al",
	view: "Görüntüle",
	window: "Pencere",
	zoom: "Yakınlaştır",

	// Menu (app-specific)
	export: "Veri Aktar",
	"export-to-format": "{format} formatına aktar",
	import: "Veri Al",
	"import-from-format": "{format} formatından al",
	license: "Lisans",
	"lock-diary": "Günlüğü Kilitle",
	"next-day": "Sonraki Gün",
	"next-month": "Sonraki Ay",
	"previous-day": "Önceki Gün",
	"previous-month": "Önceki Ay",
	"privacy-policy": "Gizlilik Politikası",
	website: "Web Sitesi",

	// Weekdays
	sunday: "Pazar",
	monday: "Pazartesi",
	tuesday: "Salı",
	wednesday: "Çarşamba",
	thursday: "Perşembe",
	friday: "Cuma",
	saturday: "Cumartesi",

	// Theme
	dark: "Karanlık",
	light: "Aydınlık",
	theme: "Tema",

	// Calendar
	today: "Bugün",

	// Editor
	"add-a-title": "Bir başlık ekle",
	bold: "Kalın",
	bullets: "Madde işareti listesi",
	italic: "İtalik",
	list: "Numaralı liste",
	"write-something": "Bir şeyler yaz",

	// Search
	clear: "Temizle",
	"no-results": "Sonuç bulunamadı",
	"no-title": "Başlıksız",
	search: "Arama",

	// Preferences
	"allow-future-entries": "Gelecekte giriş oluşturmaya izin ver",
	auto: "Otomatik",
	"diary-entries": "Günlük girişleri",
	"first-day-of-week": "Haftanın ilk günü",

	// Password and directory
	"change-directory": "Klasörü değiştir",
	"change-password": "Parolayı değiştir",
	"choose-password": "Lütfen günlüğünüz için bir parola girin.",
	"decryption-error": "Günlük dosyasını deşifre ederken bir hata oluştu",
	"diary-file": "Günlük dosyası",
	"file-exists": "Bu klasörde başka bir dosya var",
	"move-error-msg": "Dosyayı taşırken bir hata oluştu",
	"move-error-title": "Taşıma hatası",
	"move-file": "Dosyayı taşı",
	"new-password": "Yeni parola",
	password: "Parola",
	"passwords-no-match": "Parolalar eşleşmiyor",
	"repeat-new-password": "Yeni parolayı tekrar et",
	"repeat-password": "Parolayı tekrar et",
	"select-directory": "Klasör seç",
	"set-password": "Parolayı seç",
	unlock: "Kilidi Aç",
	"wrong-password": "Yanlış parola",

	// Import
	"import-error-msg": "Veri alımı sırasında bir hata oluştu",
	"import-error-title": "Veri alımı hatası",
	"import-instructions-day-one":
		"Day One uygulamasını açıp Klasör → Veri Aktar → {format} seçeneği ile günlüğünüzü aktarın. Oluşan sıkıştırılmış dosyayı çıkartın. {appName}'ye aktarmak için elde ettiğiniz {format} dosyasını sonraki adımda seçin.",
	"import-instructions-jrnl":
		"jrnl günlüğünüzdeki verileri aktarmak için şu komutu kullanın {command}. {appName}'ye aktarmak için oluşturulan JSON dosyasını sonraki adımda seçin.",
	"import-instructions-mini-diary":
		"Daha önceden {appName} veri aktarımı ile oluşturmuş olduğunuz veya aynı formata sahip başka bir JSON dosyasını kullanarak veri alımı yapabilirsiniz.",
	"start-import": "Veri alımını başlat",

	// Export
	"export-error-msg": "Veri aktarımı sırasında bir hata oluştu",
	"export-error-title": "Veri aktarımı hatası",

	// Other
	loading: "Yükleniyor",
};

export default translationsTr;
