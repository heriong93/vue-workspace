<template>
  <h3>Hello, {{msg}}</h3>
  <div>{{htmlStr}}</div> <!--<p style ="color:red">Hello</p>로 하나의 string으로 출력됨-->
  <div v-html="htmlStr"></div> <!--html구문으로 구분되 Hello빨간색으로 출력됨. v-text로 하면 문자열로 구분되서 위와 같이 출력-->
  <input type="text" v-model="vmodel"/>
  <p>{{vmodel}}</p> <!--input창의 내용을 실시간으로 출력해줌-->
  <textarea cols="30" rows="10" v-model="message"></textarea>
</template>

<script>
export default {
  data(){ //이 프로퍼티 안에 지정해줘야함//데이터바인딩 알아서 적용시켜 화면을 바꿔줌
    return {
      msg: 'World',
      htmlStr: '<p style ="color:red">Hello</p>',
      vmodel:'Nice',
      message: '여러라인의 값을 \n입력받을 수 있는\ntextarea'
    }
  }
}
</script>
