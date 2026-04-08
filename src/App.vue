<script setup>
// 定義一個變數來『記住』使用者輸入的名字。
import { ref } from 'vue'
// 把圖片檔案帶進來，之後可以直接拿來用。
import photoUrl from '../變形金剛.jpg'
const userInput = ref('')
// 準備一個地方放「要顯示的照片路徑」。
const photoPath = ref('')
// 準備一個地方放「查無此人」要不要出現。
const showNotFound = ref(false)
// 準備一個地方放「確認找到的人名」。
const foundName = ref('')
// 按下按鈕時，讓照片出現。
const showPhoto = () => {
  // 如果名字對得上，就顯示照片；不然就顯示提示字。
  const trimmedName = userInput.value.trim()
  const allowNames = ['變形金剛', '柯博文']
  if (allowNames.includes(trimmedName)) {
    photoPath.value = photoUrl
    showNotFound.value = false
    foundName.value = trimmedName
  } else {
    photoPath.value = ''
    showNotFound.value = true
    foundName.value = ''
  }
}
</script>

<template>
  <div class="page">
    <!-- 在這裡放輸入框，使用 v-model 綁定 userInput，這樣可以記住用戶輸入的值。-->
    <h1>輸入您的名字，按下按鈕後顯示結果</h1>
    <input type="text" v-model="userInput" placeholder="請輸入照片名稱" />
    <button @click="showPhoto">顯示圖片</button>
    <p class="hint">提示：輸入變形金剛或柯博文才會顯示圖片</p>
    <!-- 只有在找到時，才顯示名字。 -->
    <p v-if="foundName">您輸入的名字是：{{ foundName }}</p>
    <!-- 只有在找不到時，才顯示這句話。 -->
    <p v-if="showNotFound">查無此人</p>
    <!-- 這裡是「畫框」，有照片路徑時就會顯示照片。 -->
    <img v-if="photoPath" :src="photoPath" alt="變形金剛" />
  </div>
</template>

<style scoped>
/* 在這裡可新增樣式，如果需要更改畫面外觀 */
/* 讓整個區塊有深色背景。 */
.page {
  background: #0f0f0f;
  color: #f2f2f2;
  min-height: 100vh;
  padding: 24px;
}
input {
  margin-right: 20px;
  padding: 5px;
  background: #1c1c1c;
  color: #f2f2f2;
  border: 1px solid #3a3a3a;
}
input::placeholder {
  color: #b5b5b5;
}
button {
  padding: 5px 10px;
  background: #2c2c2c;
  color: #f2f2f2;
  border: 1px solid #3a3a3a;
}
img {
  display: block;
  margin-top: 12px;
  max-width: 280px;
  border-radius: 16px;
}
.hint {
  margin-top: 6px;
  font-size: 10px;
  color: #b5b5b5;
}
</style>
