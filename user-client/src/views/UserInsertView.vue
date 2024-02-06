<!--UserInsertView.vue-->
<template>
    <div class="container">
        <h1>회원 정보 등록</h1>
        <div class="row">
            <table class="table">
                <tr>
                    <th>번호</th>
                    <td class="text-center"><input class="form-control" type="number" v-model="userInfo.user_no" readonly>
                    </td> <!--no는 자동부여라서 수정불가. readonly설정-->
                </tr>
                <tr>
                    <th>아이디</th>
                    <td class="text-center"><input class="form-control" type="text" v-model="userInfo.user_id"></td>
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
                        <!-- <input type="checkbox" true-value="예" false-value="아니요" v-model="chkVal"> -->
                    </td> <!--computed:-->
                </tr>
                <tr>
                    <th>나이</th>
                    <td class="text-center"><input class="form-control" type="number" v-model="userInfo.user_age" min="0"
                            max="150"></td>
                </tr>
                <tr>
                    <th>가입일자</th>
                    <td class="text-center"><input class="form-control" type="date" v-model="userInfo.join_date"></td>
                    <!--yyyy-MM-dd로 인식됨. mysql로 넘기기 쉬움-->
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info" @click="insertInfo(), validation()">저장</button> <!-- 넘어가는 정보가 있을때- 누구의 정보를 수정할건지-->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            //chkVal: "아니오"
            userInfo: { //가능한 서버측에서 사용하는 것으로 하는게 권장
                user_no: null,
                user_id: "",
                user_pwd: "",
                user_name: "",
                user_gender: null,
                user_age: null, //데이터 형식이 달라서 공백 인식x. 사용자 입력 전까지 빈 공간으로 유지하기 위해 null로 지정
                join_date: null
            }
        }
    },
    methods: {
        insertInfo() {
            //1) 유효성 체크 
            if (!this.validation()) return; // validation 이 false일때 유효성체크가 진행되도록 ! 걸어줌.아래로 내려갈 수 있도록
            //2) ajax

            //2-1)실제 보낼 데이터 선별
            let data = this.getSendData(); //반드시 객체 or 배열이여야함(json이 인정하는 포맷)
            //2-2) axios 를 이용해 ajax

            axios
                .post('/api/users', data)
                .then(result => {
                    //3)결과처리
                    console.log(result);
                    let user_no = result.data.insertId;
                    if(user_no == 0){
                        alert('등록되지 않았습니다.\n 메세지를 확인해주세요\n ${result.data.message}')
                    }else{
                        alert(`정상적으로 등록되었습니다.`);
                        this.userInfo.user_no = user_no; //다시 값을 넣는 것-> 등록 시 회원번호 보여지도록
                    }
                })
                .catch(err => console.log(err));
        },
        validation() { //유효성 체크 용
            if (this.userInfo.user_id == "") {
                alert('아이디가 입력되지 않았습니다');
                return false;
            }
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
            let obj = this.userInfo
            let delData = ["user_no"];
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