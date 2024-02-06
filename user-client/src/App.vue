<template>
  <div>
    <!-- Header 실존태그 아님 => 실존하는 HTML 태그로 변환 필요 -->
    <!-- 작성하는 태그와 실제 구현되는 태그 다름 => 태그간 매핑 알아야할 필요 -->
    <Header />
    <router-view />
  </div>
</template>
<script>
  import Header from './layouts/HeaderComponent.vue'

  export default {
    components : {
      Header
    }
  }
</script>