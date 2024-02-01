<template>
  <div>
   <input type="text" v-model="todo">
   <button @click="addTodo">추가</button>
  </div>
  <div>
    <ul v-for="todo in todoList" v-bind:key="todo.no">
      <li>{{`${todo.no} -${todo.text}`}}
      <button v-on:click="deleteTodo(todo.no)">삭제</button>
    </li>
    </ul>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        todo:'그다음할일', // {no: 3, text: '그다음 할일'},
        todoList: [{no: 1, text: '할일1'},{no: 2, text: '할일2'}]
      }
    },
    methods: {
      addTodo(){ //클릭하면 입력한 값을 todolist에 추가
        let no, text; 
        no = this.todoList[this.todoList.length -1].no + 1;
        console.log(no);
        text = this.todo;
        this.todoList.splice(this.todoList.length, 0,{no,text});
        this.todo = '';
      },
      deleteTodo(no){
        console.log('no:',no); 
        this.todoList = this.todoList.filter(todo=>todo.no == no ? false : true);
      }
    }
  }
</script>
