<template>
  <div id="app">
    <!--<p>Teste</p>
    <p>
      <router-link to="/app/list">Go to List</router-link>
      <router-link to="/app/add">Go to Add</router-link>
    </p>
    <router-view></router-view>-->

    <List></List>
    <!--<Add></Add>-->
    <!--<Edit></Edit>-->
    <!--<View></View>-->
  </div>
</template>

<script>

import List from './list.vue'
// import Add from './add.vue'
// import Edit from './edit.vue'
// import View from './view.vue'

export default {
  components: {
    List
    // Add
    // Edit
    // View
  }
}

</script>

<style>
body {
    margin-top: 50px
  }
</style>
