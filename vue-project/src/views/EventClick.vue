<template>
  <div>
    <button v-on:click="increaseCounter">Add 1</button> <!--onclick 이벤트-->
    <p>Counter is : {{counter}}</p>
    <button v-on:click="increaseCounter2(3)">Increase</button> <!--매개값이 있는 onclick 이벤트-->
    <button v-on:click="one(),two()">다중호출</button> 
    <select v-model="city" @change="changeSelect"> <!--v-on:change == @change-->
      <option value="1">서울</option>
      <option value="2">부산</option>
      <option value="3">제주</option>
    </select>
  </div>
</template>

<script>
export default{
  data() {
    return{
      counter: 0,
      city: '1'
    }
  },
  methods: {  //이벤트 등록 여러개 할 수 있음
    increaseCounter(){
      console.log('increaseCounter')
      this.counter = this.counter +parseInt(this.city);
      
    },
    increaseCounter2(num){
      this.counter = this.counter + num;
    },
    one(){
      alert('one')
    },
    two(){
      alert('two')
    },
    changeSelect(){
      alert(this.city)  //선택된 값으로 출력됨
    }
  },
  beforeUpdate(){
    //data변경 생기기 전에 필요처리를 구현
    console.log('beforeUpdate')
  },
  updated(){
    //변경 후 필요처리 구현
    console.log('updated')
  }
}
</script>