<template>
    <table id="list">
      <tr>
        <td style="width: 50px;">글제목</td>
        <td>{{board.title}}</td>
      </tr>
      <tr style="height: 200px;">
        <td style="width: 50px;">내용</td>
        <td colspan="2">{{board.content}}</td>
      </tr>    
    </table>
    <button style="float: right;" v-on:click="showList" >목록</button>
    </template>
    
  <script>
    export default {
        props: ['board'],
      data (){
        return {
          
        }
      },
      methods:{
       showList(){
        this.$emit('show-list');
       }
      }
    }
  </script>
  