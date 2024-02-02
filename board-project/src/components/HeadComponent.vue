<template>
    <div id="myDIV" class="header">
        <h2 style="margin:5px">My To Do List</h2>
        <input type="text" id="myInput" v-model="content">
        <span @click="addTodo" class="addBtn">Add</span>
    </div>
</template>
  
<script>
export default {
    data (){
        return {
            content : ''
        }
    },
    methods: {
        addTodo(){
            this.$emit('save-todo',this.content);
            this.content = ''
        }
    }
}
</script>
  