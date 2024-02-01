<template>
 <!--DataBindingList.vue-->
 <div>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>제품명</th>
        <th>가격</th>
        <th>카테고리</th>
        <th>배송료</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product,idx) in productList" v-show="product.price > 30000"
      v-bind:key="idx"> <!--v:for ->for문-->
      <td>{{idx+1}}</td> <!--index는 0번부터 시작해서 +1-->
      <td>{{product.product_name}}</td>
      <td>{{(product.price).toLocaleString()+'원'}}</td> <!--대한민국의 로케일에 맞추어 아래와 같이 천단위 ,찍힘-->
      <td>{{product.category}}</td>
      <td>{{(product.delivery_price).toLocaleString()+'원'}}</td>
      </tr>
    </tbody>
  </table>
 </div>
  <h3 v-if="score >= 90">A</h3> <!--if문 ->true일 경우 출력/ false면 출력안됨--> 
  <h3 v-else-if="score >= 80">B</h3>
  <h3 v-else>C</h3>

  <h3 v-show="score >= 90">90보다 큽니다.</h3> <!-- data에 적힌조건에 만족하지않으면 display-none 속성으로 바뀜-->
</template>

<script>
export default {
 data() {
   return {
    score:90,
      productList: [
        {"product_name":"기계식키보드","price":25000,"category":"노트북/태블릿","delivery_price":5000},
        {"product_name":"무선마우스","price":12000,"category":"노트북/태블릿","delivery_price":5000},
        {"product_name":"아이패드","price":725000,"category":"노트북/태블릿","delivery_price":5000},
        {"product_name":"태블릿거치대","price":32000,"category":"노트북/태블릿","delivery_price":5000},
        {"product_name":"무선충전기","price":42000,"category":"노트북/태블릿","delivery_price":5000}
      ]
   };
 }
}
</script>
<style>
  table{
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  th,td{
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
</style>