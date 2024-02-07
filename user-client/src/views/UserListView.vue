<template>
    <div class="container">
      <h1>전체 회원 조회</h1>
      <table class="table table-striped">
        <caption>Total : {{ cnt }}</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>아이디</th>
            <th>이름</th>
            <th> 성별</th>
            <th> 가입날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="idx" v-for="(user,idx) in userList" @click="goToUserInfo(user.user_id)">
            <td>{{ user.user_no }}</td>
            <td>{{ user.user_id }}</td>
            <td>{{ user.user_name }}</td>
            <td v-text="user.user_gender" />
            <td>{{ getDate(user.join_date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            userList : []
        }
    },
    computed : {
        cnt() { //값
            return this.userList.length;
        }
    },
//     ,
//     watch: { //프로세스 
//     userList(newQuestion, oldQuestion){
//         console.log('이전:', oldQuestion);
//         alert('데이터가 변경되었습니다');
//         console.log('이후:', newQuestion);
//     }
// }
created() {
    this.getUserList() //비동기 작업
    },
    methods: {
    async getUserList() { // 동기 작업
      let result = await axios.get('/api/users').catch(err => { console.log(err) });
      let list = result.data;
      this.userList = list;
    },
    goToUserInfo(userId){
        this.$router.push({path : '/userInfo', query : {"userId": userId}}); //라우터는 통신방식.무조건 get방식. body존재x path: 넘길 경로 / query:는 넘기는 value=>"field명" : 매개변수 넘어온값. 새롭게 불려지는 컴퍼넌트에 전해지는 값.index.js로 등록하기
       // this.$router.push({name : 'userInfo', query : {"userId": userId}}); //path, name 둘 중 하나만 등록하면 됨
    }, 
    getDate(edate) {
      let eDate = new Date(edate);

      let year = eDate.getFullYear();
      let month = ('0' + (eDate.getMonth() + 1)).slice(-2);
      let day = ('0' + (eDate.getDate())).slice(-2);

      let result = year + '.' + month + '.' + day;

      return result;
    }
  }
}
</script>