# Melody — миграция на Vite

Проект был мигрирован с Webpack на Vite.

Основные изменения:
- удалены Webpack-скрипты и конфигурации
- добавлен `vite.config.js` (root: `src`, publicDir: `public`, алиасы `@` -> `src`, `@fonts` -> `public/fonts`)
- пути к изображениям и шрифтам в `src/index.html` и `src/scss/fonts.scss` обновлены на `/images/...` и `/fonts/...` соответственно (файлы лежат в `public/`)
- обновлён `package.json` со скриптами для Vite

Как запустить локально:

```bash
# установить зависимости
npm install

# dev server
npm run dev

# собрать production-билд в dist/
npm run build

# посмотреть билды локально
npm run preview
```

Деплой на GitHub Pages

В проект уже добавлен пакет `gh-pages` и два скрипта в `package.json`:
- `predeploy` — выполняет `npm run build`
- `deploy` — публикует содержимое `dist/` в ветку `gh-pages`:

```bash
# соберёт проект и опубликует dist/ в ветку gh-pages (создаст ветку, если её нет)
npm run deploy
```

Важно:
- `npm run deploy` выполнит `git push` в ваш удалённый репозиторий. Убедитесь, что у вас есть права на запись и что удалённый origin настроен.
- Если вы хотите предварительно проверить результат локально, выполните `npm run build` и `npm run preview`.

IDE-предупреждения

Пути `/images/...` и `/fonts/...` обслуживаются Vite из папки `public/` (см. `vite.config.js`). Некоторые IDE могут показывать предупреждения о нерезолвленных путях — в WebStorm пометьте `public/` как Resources Root. Для VS Code добавлен `.vscode/settings.json` с маппингом для Path Intellisense.

Дополнительно

- Если нужна поддержка старых браузеров (IE11 и т.п.), можно подключить `@vitejs/plugin-legacy`.
- Для очистки старых артефактов Webpack можно удалить `node_modules` и `package-lock.json`, затем выполнить `npm install`.

Если хотите, могу выполнить `npm run deploy` прямо сейчас — но он запушит ветку `gh-pages` в ваш origin. Разрешаете выполнить деплой? Если да, уточните, хотите ли, чтобы я создавал ветку `gh-pages` от текущей ветки (обычно `main` или `master`) или от другой ветки.
