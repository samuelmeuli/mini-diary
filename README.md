<div align="center">
  <img src="website/img/app-icon.png" height="140">
  <h1>Mini Diary</h1>
  <strong>Simple and secure journal app</strong>
  <img src="website/img/screenshot-1.png" width="100%" alt="Screenshot">
</div>

## Download

- **Mac:**
  - [App Store](https://itunes.apple.com/app/mini-diary/id1450296884) (sandboxed)
  - [DMG](https://github.com/samuelmeuli/mini-diary/releases/latest) (not sandboxed, allows storing diary file anywhere on disk)
- **[Windows](https://minidiary.app)**
- **[Linux](https://minidiary.app)**

You can find all available download formats [here](https://github.com/samuelmeuli/mini-diary/releases/latest).

## Features

- Beautiful and clean design
- Encryption
- Basic text formatting (bold, italics, lists)
- Full-text search
- Light and dark themes
- Various import and export formats
- Localization in multiple languages
- Statistics
- Keyboard shortcuts

## Import/Export Formats

**Import formats:**

- [JSON (Day One)](./tests/import-export/files/jsonDayOne.json)
- [JSON (jrnl)](./tests/import-export/files/jsonJrnl.json)
- [JSON (Mini Diary)](./tests/import-export/files/jsonMiniDiary.json)
- [TXT (Day One)](./tests/import-export/files/txtDayOne.txt)

**Export formats:**

- [JSON (Mini Diary)](./tests/import-export/files/jsonMiniDiary.json)
- Markdown
- PDF
- [TXT (Day One)](./tests/import-export/files/txtDayOne.txt)

## Contributing

### Features and Bugs

Suggestions and contributions are always welcome! Please first discuss changes via issue before submitting a pull request.

### Adding missing translations

The list of all English strings can be found in [`en.ts`](./src/main/i18n/translations/en.ts). If there are translations missing for your language and you'd like to help with the translation, you can add the translated strings to your language's file in [`src/main/i18n/translations`](./src/main/i18n/translations) and submit a PR.

### Adding a new language

If the app isn't translated into your language yet and you'd like to help out, you can easily add translations with the following steps:

1. The translation files can be found in [`src/main/i18n/translations`](./src/main/i18n/translations). Duplicate the [`en.ts`](./src/main/i18n/translations/en.ts) file as `[LANG].ts`, where `[LANG]` is the [shortcode of your language](https://electronjs.org/docs/api/locales).
2. In the file you just created, replace the English translations with your own.
3. Import your file in the `ALL_TRANSLATIONS` object in [`src/main/i18n/i18n.ts`](./src/main/i18n/i18n.ts).
4. Add your language shortcode to the `electronLanguages` array in [`package.json`](./package.json).
5. Run the app in your language (see steps below) and make sure that the translations fit into the app (e.g. that they aren't too long for input fields).
6. Submit a PR. Thanks for your help!

## Development

The application is built with Electron and React. To run or build the app yourself, you'll need to have Node.js and Yarn installed.

### Running the app

1. Clone this repository: `git clone REPO_URL`
2. Navigate into the project directory: `cd mini-diary`
3. Install the dependencies: `yarn`
4. Run the app: `yarn start`

### Building the app

After cloning the repo and installing the dependencies, run `yarn build`. The packaged app can be found in the `dist` folder.
