<template>
    <content>
        <ul id="myUL" v-for="todo in list" v-bind:key="todo.no">
            <li class="checked" @click="cancelList(todo.cancelFlag)">{{ todo.todo }}<span class="close" @click="deleteTodo(todo.no)">x</span></li>
        </ul>
    </content>
</template>
  
<script>
export default {
    props: ['list'],
    data() {
        return {

        }
    },
    methods: {
        deleteTodo(no){
            this.$emit('todo-delete',no)
        },
        cancelList(cancelFlag){
            this.$emit('choose-del', cancelFlag);
        }
    }
}
</script>
  