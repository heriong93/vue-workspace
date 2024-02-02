<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/board">게시판</router-link> |
    <router-link to="/todo">Todo</router-link>

  </nav>
  <router-view/>
</template>

<script>
export default{
  data () {
    return {
      rootData:'hello' //자식이 아닌 경우 이렇게 데이터를 넘길 수 없음
    }
  },
  provide() { //계층구조 상관없이 부모 컴포넌트에 provide 옵션을 만들면 -> 자식들은 inject 옵션으로 데이터 사용할 수 잇따
    return {
      rootList: 'rootList',
      rootStr: 'rootString'
    }
  }
}
</script>

<style>
@import url("../src/assets/style.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
