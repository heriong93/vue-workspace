<template>
    <div class="container">
        <h1>회원 정보 수정</h1>
        <div class="row">
            <table class="table">
                <tr>
                    <th>번호</th>
                    <td>{{ userInfo.user_no }}
                    </td> <!--no는 자동부여라서 수정불가. readonly설정-->
                </tr>
                <tr>
                    <th>아이디</th>
                    <td>{{ userInfo.user_id }}</td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td class="text-center"><input class="form-control" type="password" v-model="userInfo.user_pwd"></td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td class="text-center"><input class="form-control" type="text" v-model="userInfo.user_name"></td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td class="text-center">
                        남<input type="radio" value="M" v-model="userInfo.user_gender">
                        <!--vue입장에서는 주로 데이터 참고할때 name/id 필요없음-->
                        여<input type="radio" value="F" v-model="userInfo.user_gender">
                    </td> <!--computed:-->
                </tr>
                <tr>
                    <th>나이</th>
                    <td class="text-center"><input class="form-control" type="number" v-model="userInfo.user_age" min="0"
                            max="150"></td>
                </tr>
                <tr>
                    <th>가입날짜</th>
                    <td class="text-center"><input class="form-control" type="date" v-model="userInfo.join_date"></td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info" @click="updateInfo(), validation()">저장</button> <!-- 넘어가는 정보가 있을때- 누구의 정보를 수정할건지-->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            userInfo: {
                user_no: null,
                user_id: "",
                user_pwd: "",
                user_name: "",
                user_gender: null,
                user_age: null,
                join_date: null
            }
        }
    },
    created() {
        let searchId = this.$route.query.userId; //통신 정보 받는건 $route 요청하는건 $router
        this.getUserInfo(searchId);
        console.log(searchId);
    },
    methods: {
        async getUserInfo(userId) {
            let result = await axios.get('/api/users/' + userId).catch(err => { console.log(err) }); // '/api/users/' + userId or  `/api/users/${userId}` 둘 다 사용가능
            let info = result.data;
            let newDate = this.dateFormat(info.join_date);
            info.join_date = newDate;
            this.userInfo = info;
        },
        dateFormat(value){
            let result = null;
            if(value != null){
                let date = new Date(value);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth()+1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);
                result = `${year}-${month}-${day}`;
            }
            return result;
        },
        updateInfo() {
            // 1) 유효성 체크
            if (!this.validation()) return;

            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();

            // 2-2) axios 이용해 ajax
            axios
                .put('/api/users/' + this.userInfo.user_id, data)
                .then(result => {
                    //3)결과처리
                    console.log(result.data);
                    let user_no = result.data.affectedRows;
                    if (user_no == 0) {
                        alert('수정되지 않았습니다.\n 메세지를 확인해주세요\n ${result.data.message}')
                    } else {
                        alert(`정상적으로 수정되었습니다.`);
                        this.$router.push({ path: '/userInfo' , query: {'userId' : this.userInfo.user_id}}); //다시 값을 넣는 것-> 등록 시 회원번호 보여지도록
                    }
                })
                .catch(err => console.log(err));
        },
        validation() { //유효성 체크 용
            if (this.userInfo.user_pwd == "") {
                alert('비밀번호가 입력되지 않았습니다');
                return false;
            }
            if (this.userInfo.user_name == "") {
                alert('이름이 입력되지 않았습니다');
                return false;
            }
            return true;
        },
        getSendData() {
            let obj = this.userInfo;
            let delData = ["user_no", "user_id"]; //업데이트 되면 안되는 대상
            let newObj = {};
            let isTargeted = null;
            for (let field in obj) {
                isTargeted = false;
                for (let target of delData) {
                    if (field == target) {
                        isTargeted = true;
                        break;
                    }
                }
                if (!isTargeted) {
                    newObj[field] = obj[field];
                }
            }
            let sendData = {
                "param": newObj
            }
            return sendData;
        }

    }
}
</script>