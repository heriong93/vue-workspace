<template>
  <div>
    <HeaderComponent />
    <BoardList v-if="listView" v-bind:list="BoardList" @show-write="showWrite" @board-delete="deleteBoard"
      @show-read="showRead" />
    <!--v-bind:list="BoardList"=> BoardList라는 변수를 list라는 값에 담아 넘기는것. @show-write="showWrite" methods로 정의-->
    <BoardWrite v-if="writeView" v-on:save-board="saveBoard" /> <!--save-board라는 이벤트 정의. 실제 처리는 saveBoard함수가 -->
    <BoardRead v-if="readView" v-bind:board="board" @show-list="showList" />
    <FooterComponent v-bind:data="htmlData"> <!--html 전달-->
      <template v-slot:header>header에 들어갈 내용</template>
      <template v-slot:footer>footer에 들어갈 내용</template>
      <template v-slot:default><p>Hello, World</p></template>
    </FooterComponent> 
  </div>
</template>

<script>
import BoardList from '../components/BoardList.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import BoardWrite from '../components/BoardWrite.vue'
import BoardRead from '../components/BoardRead.vue'

export default {
  data() {
    return {
      listView: true,
      writeView: false, //처음에는 목록만 보여줘야하니 false. 나중에 methods로 바꿔줌
      readView: false,
      board: {}, //상세화면에 보여줄 데이터
      BoardList: [
        { no: 1, title: 'Vue는 좋아요', content: '프레임워크입니다', view: 1 },
        { no: 2, title: '좋은 아침입니다', content: '행복한 금요일이네요', view: 1 },
        { no: 3, title: '점메추?', content: '오늘은 김치찜각이죠', view: 4 }
      ],
      htmlData: '<p>Hello</p>'
    }
  },
  components: {
    BoardList, // 앞은 템플릿 안에 선언된 태그.BoardList: BoardList 뒤는 import한 파일 이름.속성=값이면 하나만 써도 된다
    HeaderComponent,
    FooterComponent,
    BoardWrite,
    BoardRead
  },
  methods: {
    showWrite() { //등록화면 보여주는 기능 
      this.listView = false;
      this.writeView = true;
    },
    showList() { //목록 보여주는 기능
      this.listView = true;
      this.writeView = false;
      this.readView = false;
    },
    showRead(board) { //상세화면 보여주는 기능
      console.log(board); //글번호 활용해서 하나씩 증가 
      this.listView = false;
      this.writeView = false;
      this.readView = true; //목록 글 보여주도록
      this.board = board;
      //board.view ++;
      //글번호의 인덱스를 찾아서 현재 조회수를 파악하고 증가하기 
      let idx = -1; //해당위치의 값을 새로운 값으로 변경하기 위해서 .에러방지 해 찾아도 없는 인덱스 값을 넣어줌 
      let viewCnt = 0;
      for (let i = 0; i < this.BoardList.length; i++) {
        if (this.BoardList[i].no == board.no) {
          idx = i; //어차피 여기서 idx값 바꿔줌
          viewCnt = this.BoardList[i].view;
          break;
        }
      }
      let brd = { no: board.no, title: board.title, content: board.content, view: ++viewCnt };
      this.BoardList.splice(idx, 1, brd); //새로운 값으로 변경
    },
    saveBoard(title, content) { //신규글 등록
      console.log(title, content);
      let idx = this.BoardList.length - 1; //마지막데이터의 index
      let no = parseInt(this.BoardList[idx].no) + 1; //새로운 데이터의 no 
      let board = { no, title, content, view: 0 }
      if (board.title == '' || board.content == '') {
        alert('내용을 입력하세요');
      } else {
        this.BoardList.splice(this.BoardList.length, 0, board); //(index번호,대체할 수,입력할 내용)
        this.showList();
      }
    },
    deleteBoard(no) { //글삭제
      console.log(no);
      this.BoardList = this.BoardList.filter(board => board.no == no ? false : true); //같으면 false 담기지 않고, true여야 담김//테스트를 통과한 요소로만 필터링 합니다

    }
  }
}
</script>
