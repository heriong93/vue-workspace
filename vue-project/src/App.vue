<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/binding">데이터바인딩</router-link> |
    <router-link to="/binding2">데이터바인딩2</router-link> |
    <router-link to="/binding3">데이터바인딩3</router-link> |
    <router-link to="/binding4">데이터바인딩4</router-link> |
    <router-link to="/binding5">데이터바인딩리스트</router-link> |
    <router-link to="/eventclick">이벤트 클릭</router-link> |
    <router-link to="/eventtodo">클릭이벤트2</router-link> |
    <router-link to="/computedview">이벤트3</router-link> 

  </nav>
  <router-view/>
</template>

<style>
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
