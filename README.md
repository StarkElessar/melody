# Melody — миграция на Vite

Проект был мигрирован с Webpack на Vite.

Основные изменения:
- удалены Webpack-скрипты и конфигурации
- добавлен `vite.config.js` (root: `src`, publicDir: `assets`, алиасы `@` -> `src`, `@fonts` -> `assets/fonts`)
- пути к изображениям и шрифтам в `src/index.html` и `src/scss/fonts.scss` обновлены на `/images/...` и `/fonts/...` соответственно
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

Примечания и проверки:
- Файлы из папки `assets/` обслуживаются как статические файлы (publicDir), поэтому в коде используйте `/images/...` и `/fonts/...`.
- Если вы предпочитаете, можно переместить `src/index.html` в корень и убрать `root` в `vite.config.js`.
- Убедитесь, что `jquery` импортируется в `src/index.js` и если нужно, доступен глобально (window.$ = $).

Если хотите, могу выполнить дополнительные улучшения: автоматическое определение env-переменных, подключение плагина для legacy-браузеров, или удаление оставшихся webpack-зависимостей из `package-lock.json` и node_modules.
