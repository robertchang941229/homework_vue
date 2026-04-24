import { fileURLToPath, URL } from 'node:url'

import { loadEnv, defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

function youtubeSearchApi(): Plugin {
  return {
    name: 'youtube-search-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', `http://${req.headers.host}`)

        if (req.method !== 'POST' || url.pathname !== '/api/youtube-search') {
          next()
          return
        }

        const env = loadEnv(server.config.mode, process.cwd(), '')
        const apiKey = env.YOUTUBE_API_KEY

        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ error: '缺少 YOUTUBE_API_KEY，請先設定 .env.local' }))
          return
        }

        try {
          const chunks: Uint8Array[] = []
          for await (const chunk of req) chunks.push(chunk)

          const rawBody = Buffer.concat(chunks).toString('utf8')
          const body = rawBody ? JSON.parse(rawBody) : {}
          const query = String(body.query || '').trim()

          if (!query) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify({ error: '請輸入歌名' }))
            return
          }

          const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
          searchUrl.searchParams.set('part', 'snippet')
          searchUrl.searchParams.set('type', 'video')
          searchUrl.searchParams.set('maxResults', '10')
          searchUrl.searchParams.set('q', query)
          searchUrl.searchParams.set('key', apiKey)

          const searchResponse = await fetch(searchUrl)

          if (!searchResponse.ok) {
            throw new Error('YouTube 搜尋失敗，請檢查 API Key 是否正確')
          }

          const searchData = await searchResponse.json()
          const videoIds = (searchData.items || [])
            .map((item: any) => item.id?.videoId)
            .filter(Boolean)

          if (videoIds.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify({ query, topVideo: null }))
            return
          }

          const statsUrl = new URL('https://www.googleapis.com/youtube/v3/videos')
          statsUrl.searchParams.set('part', 'snippet,statistics,contentDetails')
          statsUrl.searchParams.set('id', videoIds.join(','))
          statsUrl.searchParams.set('key', apiKey)

          const statsResponse = await fetch(statsUrl)

          if (!statsResponse.ok) {
            throw new Error('YouTube 影片資料取得失敗')
          }

          const statsData = await statsResponse.json()
          const videos = (statsData.items || [])
            .map((item: any) => ({
              id: item.id,
              title: item.snippet?.title || '未知標題',
              channelTitle: item.snippet?.channelTitle || '未知頻道',
              publishedAt: item.snippet?.publishedAt || '',
              thumbnail:
                item.snippet?.thumbnails?.high?.url ||
                item.snippet?.thumbnails?.medium?.url ||
                item.snippet?.thumbnails?.default?.url ||
                '',
              duration: item.contentDetails?.duration || '',
              url: `https://www.youtube.com/watch?v=${item.id}`,
              viewCount: Number(item.statistics?.viewCount || 0),
            }))
            .sort((a: { viewCount: number }, b: { viewCount: number }) => b.viewCount - a.viewCount)

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ query, topVideo: videos[0] || null }))
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : '伺服器錯誤',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), youtubeSearchApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
