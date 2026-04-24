# homework1

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 對話學習紀錄（我怎麼問、AI怎麼教）

### 我是怎麼問的

- 我先用「我要一步一步做出畫面」的方式提問，從輸入框到按鈕再到圖片顯示。
- 我要求用小學生能懂的話解釋，並避免專業術語。
- 我會指定我看不懂的地方，直接問「哪一行負責記住名字？」或「v-model、v-if、placeholder 是什麼？」，以及讓他把每一行的程式碼作講解，如果有不清楚地再分別詢問
- 我用「為什麼會出現／不出現」來確認邏輯，例如「為什麼我看不到照片？」
- 我用「我要改成…」的方式提出調整需求，例如提示文字、間距、按鈕位置。

### AI回復

- 使用「盒子」「開關」「畫框」等生活比喻說明資料如何被記住與顯示。
- AI是用分步驟的方式，讓我知道要如何才能開啟網頁及作調整，也會詳細解釋程式碼的功用，讓我可以很快明白程式的意思，也有列出更改的項目及檔案名稱，方便我去作查找
- 使用的模型也會有差別，如果使用GPT-4o輸出的成果會比較不知道在寫甚麼，但用GPT-5.2後，就可以很清楚獲得資料

## 這次的音樂搜尋版

- 這個版本會讓使用者輸入歌名，然後由 YouTube API 查出最熱門的影片。
- 畫面會顯示影片縮圖、名稱、頻道、發布時間與觀看次數。
- 點卡片後會直接開啟 YouTube 影片頁。
- 需要先建立 `.env.local`，放入 `YOUTUBE_API_KEY`。
- 執行方式：直接用 `npm run dev` 啟動前端就可以，Vite 會提供 `/api/youtube-search`。

### `.env.local` 要怎麼寫

```env
YOUTUBE_API_KEY=請換成你自己的GoogleCloud金鑰
```

- 這個 `YOUTUBE_API_KEY` 是你自己在 Google Cloud 申請的 YouTube Data API Key。
- 它不是AI自建的，也不是 GitHub 的金鑰。
- 前端會透過 Vite 的 API 路由去請求 YouTube 資料。
