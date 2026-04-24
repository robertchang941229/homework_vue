<script setup lang="ts">
import { computed, ref } from 'vue'

const songName = ref('')
const loading = ref(false)
const errorMessage = ref('')
const result = ref(null)

const hasResult = computed(() => Boolean(result.value?.topVideo))

const isValidSongName = (value: string) => /^[\p{L}\p{N}\s'’"._-]+$/u.test(value)

const formatDuration = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 'LIVE'

  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)

  const parts =
    hours > 0
      ? [hours, String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')]
      : [minutes, String(seconds).padStart(2, '0')]

  return parts.join(':')
}

const searchSong = async () => {
  const query = songName.value.trim()

  result.value = null
  errorMessage.value = ''

  if (!query) {
    errorMessage.value = '請先輸入歌名'
    return
  }

  if (!isValidSongName(query)) {
    errorMessage.value = '歌名格式有誤，請輸入正常文字'
    return
  }

  loading.value = true

  try {
    const response = await fetch('/api/youtube-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '搜尋失敗')
    }

    if (!data.topVideo) {
      errorMessage.value = '查無此歌，請再試一次'
      return
    }

    result.value = data
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '搜尋失敗'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="search-box">
      <h1>音樂搜尋</h1>
      <p class="hint">輸入名稱後，即顯示結果</p>

      <div class="search-row">
        <input v-model="songName" type="text" placeholder="請輸入歌名" @keyup.enter="searchSong" />
        <button :disabled="loading" @click="searchSong">
          {{ loading ? '搜尋中...' : '搜尋' }}
        </button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div v-if="hasResult" class="result-card">
        <p class="result-label">搜尋結果</p>
        <a class="video-card" :href="result.topVideo.url" target="_blank" rel="noopener noreferrer">
          <div class="video-thumb">
            <img :src="result.topVideo.thumbnail" :alt="result.topVideo.title" />
            <div class="video-overlay">
              <p class="thumb-title">{{ result.topVideo.title }}</p>
              <p class="thumb-subtitle">{{ result.topVideo.channelTitle }}</p>
            </div>
            <span class="video-duration">{{ formatDuration(result.topVideo.duration) }}</span>
          </div>

          <div class="video-meta">
            <p class="video-date">發布時間：{{ result.topVideo.publishedAt.slice(0, 10) }}</p>
            <p class="video-click">觀看次數：{{ result.topVideo.viewCount.toLocaleString() }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f0f;
  color: #f2f2f2;
  padding: 24px;
}

.search-box {
  width: min(100%, 720px);
  padding: 28px;
  border: 1px solid #2f2f2f;
  border-radius: 16px;
  background: #171717;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.hint {
  margin-top: 8px;
  color: #b5b5b5;
  font-size: 14px;
}

.search-row {
  margin-top: 18px;
  display: flex;
  gap: 12px;
}

input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  background: #1c1c1c;
  color: #f2f2f2;
}

input::placeholder {
  color: #8f8f8f;
}

button {
  padding: 12px 16px;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  background: #2c2c2c;
  color: #f2f2f2;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin-top: 14px;
  color: #ff8f8f;
}

.result-card {
  margin-top: 20px;
  padding: 16px;
  border-radius: 12px;
  background: #101010;
  border: 1px solid #2f2f2f;
}

.result-label {
  margin-top: 0;
  margin-bottom: 8px;
  color: #8ab4ff;
  font-weight: 700;
}

.video-card {
  display: block;
  margin-top: 8px;
  border-radius: 18px;
  border: 1px solid #2f2f2f;
  color: inherit;
  text-decoration: none;
  overflow: hidden;
}

.video-card:hover {
  border-color: #8ab4ff;
}

.video-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #222;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.55));
}

.video-overlay {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 1;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.85);
}

.thumb-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.thumb-subtitle {
  margin: 4px 0 0;
  font-size: 14px;
}

.video-duration {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 1;
  padding: 4px 6px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 12px;
}

.video-meta {
  padding: 12px 14px 14px;
}

.video-date,
.video-click {
  margin: 0;
}

.video-date {
  color: #b5b5b5;
}

.video-click {
  margin-top: 6px;
  color: #8ab4ff;
}
</style>
