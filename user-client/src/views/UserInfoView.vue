<template>
    <div class="container">
        <h1>회원 정보 조회</h1>
        <div class="row">
            <table>
                <tr>
                    <th>번호</th>
                    <td>{{ userInfo.user_no }}</td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td>{{ userInfo.user_id }}</td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td>{{ userInfo.user_pwd}}</td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>{{ userInfo.user_name }}</td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td>{{ userGender }}</td> <!--computed:-->
                </tr>
                <tr>
                    <th>나이</th>
                    <td>{{ userInfo.user_age}}</td>
                </tr>
                <tr>
                    <th>가입일자</th>
                    <td>{{joinDate}}</td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info col-4" @click="goToUpdate(userInfo.user_id)">수정</button> <!-- 넘어가는 정보가 있을때- 누구의 정보를 수정할건지-->
            <router-link to="/" class="btn btn-success col-4" >목록</router-link> <!--main 링크가 가지고 있는 속성으로 이동. 그냥 이동만 할때-->
            <button class="btn btn-warning col-4" @click="deleteInfo(userInfo.user_id)">삭제</button> <!--axios를 적용시킬 것. -->
        </div>
    </div>
</template>

<script>
import axios from 'axios' //아래 사용하기 위해 등록해주는 것
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    computed : {
        //성별
        userGender(){
            let result = null;
            if(this.userInfo.user_gender == "M"){
                result = "남";
            }else if(this.userInfo.user_gender == "F"){
                result = "여";
            }
            return result;
        },
      /*  userGender(){
            let map = {
                "M" : "남", 이런 방법도 있음
                "F" : "여"
            };
        */  

        //가입날짜 : 년 월 일
        joinDate(){
            let result = null;
            if(this.userInfo.join_date != null){
                let date = new Date(this.userInfo.join_date);
                let year = date.getFullYear();
                let month = ('0'+ (date.getMonth()+1)).slice(-2);
                let day = ('0'+date.getDate()).slice(-2);

                result = `${year}년${month}월${day}일`;
            }
            return result;
        }
    },
    created() {
        let searchNo = this.$route.query.userId; //받는건 $route 요청하는건 $router
        this.getUserInfo(searchNo);
        //console.log(searchNo);
    },
    methods: {
        async getUserInfo(userId) {
            //http://localhost:3000/users/admin
            //api/users/admin 이렇게 바뀐다는 것 -> vue.config.js에서 등록함

            let result = await axios.get(`/api/users/${userId}`).catch(err => { console.log(err) }); // '/api/users/' + userId or  `/api/users/${userId}` 둘 다 사용가능
            let info = result.data;
            //let newDate = this.dateFormat(info.join_date); //db 날짜포멧이랑 맞지않기때문에 변환 
           // info.join_date = newDate;
            this.userInfo = info;
        },  
        async goToUpdate(userId){  //수정폼 컴포넌트 호출
            console.log(userId);
            this.$router.push({path:'/userForm',query: {"userId":userId}}); //index.js에 있는 path 확인 . query는 필드명: 변수명 
        },
        deleteInfo(userId){ 
            // 서버에 해당 데이터를 삭제
            axios
            .delete('/api/users/' + userId)
            .then(result => {
                if(result.data.affectedRows != 0 && result.data.changedRows == 0){ //삭제 되는 경우 affectedRows, changedRows 둘 다 수정이 됨
                    alert(`정상적으로 삭제되었습니다.`);
                    this.$router.push({path : '/'}); //삭제는 라우터가 작동해야함. 
                }else{
                    console.log(result);
                    alert(`삭제되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                }
                
            })
            .catch(err => console.log(err));

        }
    }
}
</script>