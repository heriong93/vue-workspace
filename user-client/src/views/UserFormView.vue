
import { readonly } from 'vue';
<!--UserFormView.vue-->

<template>
    <div class="container">
        <h3 class="text-center">{{title}}</h3>
        <div class="row">
            <table class="table">
                <tr>
                    <th>번호</th>
                    <td class="text-center"><input class="form-control" type="number" v-model="userInfo.user_no" readonly>
                    </td> <!--no는 자동부여라서 수정불가. readonly설정-->
                </tr>
                <tr>
                    <th>아이디</th>
                    <td class="text-center"><input class="form-control" type="text" v-model="userInfo.user_id" v-bind:readonly="isUpdated"></td>
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
            <!--첫번째-->
            <!-- <button class="btn btn-info" @click="saveInfo(searchNo)">저장</button> 넘어가는 정보가 있을때- 누구의 정보를 수정할건지 -->
            <!--두번째-->
             <button class="btn btn-info" @click="isUpdated ? updateInfo() : insertInfo()">저장</button> 
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
        return{
            userInfo: { //가능한 서버측에서 사용하는 것으로 하는게 권장
                user_no: null,
                user_id: "",
                user_pwd: "",
                user_name: "",
                user_gender: null,
                user_age: null, //데이터 형식이 달라서 공백 인식x. 사용자 입력 전까지 빈 공간으로 유지하기 위해 null로 지정
                join_date: null
            },
            searchNo: null, //등록 or 수정 넘어오는 값이 이씅면 수정, 없으면 등록 -> 이걸 판별하기 위한 값 
            isUpdated : false
        }
    },
    computed:{
        title(){
            return this.isUpdated ? '회원 정보 수정' : '회원 정보 등록';
        }
    },
    created(){
        this.searchNo = this.$route.query.userId;
        if(this.searchNo != null && this.searchNo != undefined){
            this.getUserInfo();
        }else{
            this.userInfo.join_date = this.getDate('');
        }
    },  
    methods: {
        async getUserInfo(){
            let result = await axios.get(`/api/users/${this.searchNo}`)
                                .catch(err => { console.log(err)}); // '/api/users/' + userId or  `/api/users/${userId}` 둘 다 사용가능
            let info = result.data;

            let newDate = this.getDate(info.join_date);
            info.join_date = newDate;

            this.userInfo = info;
            this.isUpdated = true; //단건조회를 했기 때문에 수정으로 바꿔줘야함
        },
        getDate(value){
            if(value == null) return null;

            let date = value == '' ? new Date() : new Date(value);
            let year = date.getFullYear();
            let month = ('0'+ (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);

            return `${year}-${month}-${day}`;
        },
        saveInfo(id){ //첫번째
            //1) 보낼 데이터 산출
            let info = this.getSendInfo(id);

            //2) ajax
            axios(info)
                .then(result => {
                    let count = result.data.affectedRows;
                    console.log(result.data.affectedRows);
                    if(count == 0){
                        alert('저장되지 않았습니다.내용을 확인해주세요');
                    }else{
                        alert('저장되었습니다');
                        if(result.data.insertId > 0){ //등록일 경우 추가 작업
                            this.userInfo.user_no = result.data.insertId;
                        }  
                    }
                })
                .catch(err => console.log(err));
        },
        getSendInfo(id){
            //method,url, data -> axios 필드명
            let method = '';
            let url = '';
            let data = null;

            if(id == null || id == undefined){ //값이 변경되지 않았거나, 들어오지않았을떄 -> 등록 
                method = 'post';
                url = `/api/users`;
                data = {
                    "param": {
                        user_id: this.userInfo.user_id,
                        user_pwd: this.userInfo.user_pwd,
                        user_name: this.userInfo.user_name,
                        user_gender: this.userInfo.user_gender,
                        user_age: this.userInfo.user_age, 
                        join_date: this.userInfo.join_date
                    }
                };
            }else{ //수정
            method = 'put';
                url = `/api/users/${id}`;
                data = {
                    "param": {
                        user_pwd: this.userInfo.user_pwd,
                        user_name: this.userInfo.user_name,
                        user_gender: this.userInfo.user_gender,
                        user_age: this.userInfo.user_age, 
                        join_date: this.userInfo.join_date
                    }
                };
            }

            return{
                method,
                url,
                data
            }
        }, //두번째 방법
        insertInfo(){
            if(!this.validation()) return;

            let data = {
                "param" :  {
                        user_id : this.userInfo.user_id,
                        user_pwd : this.userInfo.user_pwd,
                        user_name : this.userInfo.user_name,
                        user_gender : this.userInfo.user_gender,
                        user_age : this.userInfo.user_age,
                        join_date : this.userInfo.join_date
                    }
            }

            axios
            .post('/api/users', data)
            .then(result => {
                let user_no = result.data.insertId;
                if(user_no == 0){
                    alert(`등록되지 않았습니다.\n내용을 확인해주세요`)
                }else{
                    alert(`정상적으로 등록되었습니다.`);
                    this.userInfo.user_no = user_no;
                }
            })
            .catch(err => console.log(err));        

        },
        updateInfo(){
            if(!this.validation()) return;

            let data = {
                "param" : {
                        user_pwd : this.userInfo.user_pwd,
                        user_name : this.userInfo.user_name,
                        user_gender : this.userInfo.user_gender,
                        user_age : this.userInfo.user_age,
                        join_date : this.userInfo.join_date
                    }
            };

            axios
            .put(`/api/users/${this.userInfo.user_id}`, data)
            .then(result => {
                let count = result.data.changedRows;
                if(count == 0){
                    alert(`수정되지 않았습니다.\n내용를 확인해주세요`)
                }else{
                    alert(`정상적으로 수정되었습니다.`);
                }                   
            })
            .catch(err => console.log(err));        

        },
        validation(){
            if(this.userInfo.user_id == "" && !this.isUpdated){ //수정모드가 아닐때 
                alert('아이디가 입력되지 않았습니다.');
                return false;
            } 

            if(this.userInfo.user_pwd == ""){
                alert('비밀번호가 입력되지 않았습니다.');
                return false;
            }

            if(this.userInfo.user_name == ""){
                alert('이름이 입력되지 않았습니다.');
                return false;
            }

            return true;
        }
    }
}
</script>