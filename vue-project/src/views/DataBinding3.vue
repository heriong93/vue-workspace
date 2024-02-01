<template>
 <label>선택: <input type="checkbox" true-value="yes" false-value="no" v-model="checked"></label> 
  <p>선택값: {{checked}}</p> <!--value값을 보여줌-->
  <label>text 속성: <input type="text" v-bind:value="ival"></label> <!--v-model=>value라는 속성에 바인딩이 된다-->
  <p>값: {{ival}} </p>
<!--v-bind: attribute의 값을 바인딩-->
  <img :src="imgSrc" :width="imgWidth"> <!--v-bind:src 이걸 짧게 :src 이렇게도 쓸 수 있음 -->
  <input type="text" v-model="textStr">
  <button v-bind:disabled="textStr == ''">Click</button> <!--input의 값이 없으면 비활성화. 있으면 false로 이기때문에 disabled 풀림-->
</template>

<script>
export default {
  data(){ //이 프로퍼티 안에 지정해줘야함//데이터바인딩 알아서 적용시켜 화면을 바꿔줌
    return {
     checked: 'yes',
     ival: 'sample',
     checkVal: true,
     imgSrc: 'https://kr.vuejs.org/images/logo.png',
     imgWidth: '100px',
     //isTrue: true,
     textStr: ''
    }
}
}
</script>
