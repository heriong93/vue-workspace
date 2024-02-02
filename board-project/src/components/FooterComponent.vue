<template>
  <footer>
    <h3>2강 입니다</h3>
  </footer>
    <div v-html="data"></div>
    <slot name="header"></slot>
    <slot></slot> <!--아무 이름 안정하면 v-slot:default 로 출력됨-->
    <slot name="footer"></slot> <!--html템플릿을 그대로 사용--> <!-- <template v-slot:default><p>Hello, World</p>  --> 
</template>
<script>
export default{
  props: ['data']
}
</script>