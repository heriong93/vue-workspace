<template>
  <div>
    <table id="list">
      <thead>
        <tr>
          <th>글번호</th>
          <th>글제목</th>
          <th>조회수</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in list" v-bind:key="board.no">
          <td>{{ board.no }}</td>
          <td @click="showRead(board)">{{ board.title }}</td>
          <td>{{ board.view }}</td>
          <td><button @click="deleteBoard(board.no)">삭제</button></td>
        </tr>
      </tbody>
    </table>
    <button style="float: right" @click="showWrite">글쓰기</button>
  </div>
</template>

<script>
export default {
  props: ['list'], // boardView.vue 에 v-bind:list="boardList" list 속성을 선언해준걸 props로 불러오는 것// 부모 컴포넌트의 전달값을 받은 속성
  data () {
    return {

    }
  },
  methods: {
    showWrite(){
      this.$emit('show-write') //$emit()부모컴포넌트의 등록된 이벤트를 실행시키기 위해 호출하는 것.// 자식 컴포넌트에서 부모 컴포넌트로 보내는 것이 $emit()
      //BoardView.vue 에 선언된 <@show-write="showWrite" />실행

      console.log(this);
      //this.$parent.listView = false; //기능은 다 상위컴퍼넌트에 구현을 하면 편리함. 하위 각각 기능 구현하면 내용이 바뀔 때 하위 모두 변경해야하기 때문에//따라서 이렇게 안함
      //this.$parent.writeView = true; 
      //부모컴포넌트 데이터를 변경
    },
    showRead(board){
      //상세화면 보여주기
      this.$emit('show-read',board);
    },
    deleteBoard(no){ //파라미터 전달. 
      this.$emit('board-delete',no);
    } 
  }
}
</script>
