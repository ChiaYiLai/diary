<template>
  <footer class="px-4 py-8 dark:bg-taupe-950">
    <address class="not-italic text-xs text-taupe-400 text-center">
      &copy; Powered by
      <a href="https://chiayilai.github.io/resume/" target="_blank">Chia Yi Lai</a>
    </address>
  </footer>
  <Btn size="icon" @click="randomDiary" class="fixed right-12 bottom-12"><span class="material-symbols-rounded">question_mark</span></Btn>
</template>

<script setup lang="ts">
const { randomDiary } = useDiaryStore()
</script>
