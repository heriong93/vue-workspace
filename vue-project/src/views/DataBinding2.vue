<template>
  <select v-model="city">
    <option value="02">서울</option>
    <option value="03">부산</option>
    <option value="04">제주</option>
  </select>
  <label>선택: <input type="checkbox" v-model="checked"></label> <!--true-value="yes" false-value="no"-->
  <p>선택값: {{checked}}</p> <!--value값을 보여줌-->
 <label><input type="checkbox" v-model="checkItems" value="01">서울</label>
 <label><input type="checkbox" v-model="checkItems" value="02">부산</label>
 <label><input type="checkbox" v-model="checkItems" value="03">제주</label>
 <label><input type="checkbox" v-model="checkItems" value="04">대전</label>
 <p>선택값: {{checkItems}}</p>
</template>

<script>
export default {
  data(){ //이 프로퍼티 안에 지정해줘야함//데이터바인딩 알아서 적용시켜 화면을 바꿔줌
    return {
      city: '04',
      checked: true,
      checkItems: []
    }
  }
  /*,
  computed: {
    orderItems(){
     return this.checkItems.sort()
    }
  } */
}
</script>
