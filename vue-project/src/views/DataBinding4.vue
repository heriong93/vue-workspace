<template> <!--class binding-->
 <div class="container" v-bind:class="simpleClass">
  Hello
 </div>
 <div class="container" v-bind:class="{active:activeValue, 'text-red': redValue}"> <!-- text-red 는 따옴표 안에 묶어야 - 인식안됨-->
  Hola
 </div>
 <div class="container" v-bind:class="[activeClass, redClass]"> 
  Alo
 </div>
  <div class="container" style="color:red; background:yellow">
    style1
    </div>
  <div class="container" v-bind:style="{color:att1,background:att2}">
    style2
    </div>
  <div class="container" v-bind:style="colorStyle">
    style2
    </div>
</template>

<script>
export default {
  data(){ //이 프로퍼티 안에 지정해줘야함//데이터바인딩 알아서 적용시켜 화면을 바꿔줌
    return {
     simpleClass: 'active text-red', //두개를 같이 지정해줄 수도 있음

     activeValue: true,
     redValue: false,

     activeClass: 'active',
     redClass: 'text-red',

     att1: 'red', //3가지 다른 방법 다 적용 가능
     att2: 'yellow',
     //colorStyle: 'color:red; background:yellow',
     colorStyle: {
      color: 'red',
      background: 'yellow'
     }
    }
},
mounted(){
  console.log(this) //console 의 target 으로 열어보면 그 안에 적용된 변수 모두 확인 가능 this.000 으로 불러올 수 있다
},
methods: { //이벤트 실행함수

}
}
</script>
<style>
.container{
  width: 100%;
  height: 50px;
  align-content: center;
}
.active{
  background-color: yellow;
  font-weight: bold;
}
.text-red{
  color: red;
}
</style>
