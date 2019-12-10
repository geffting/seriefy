<template>
  <v-container id="main-header" fluid>
    <v-row id="header-item" justify="start">
      <v-col @click="goHome" xl="1" sm="1" class="icon-home">
        <v-row justify="center">
          <v-icon
            class="site-icon"
          >
            mdi-movie
          </v-icon>
          <h3><span class="site-icon">Se</span>riefy</h3>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script type="text/javascript">
export default {
  name: 'HomeHeader',

  methods: {
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style type="text/css" scoped>
#main-header {
  border-bottom: 2px solid black;
  padding: 0 20px;
  background-color: #3e8d96;
  position: sticky;
  top: 0;
  z-index: 1;
}

a {
  text-decoration: none;
}

#header-item {
  max-width: 1100px;
  margin: auto;
}

#header-item .icon-home {
  cursor: pointer;
}

#header-item .icon-home:hover {
  background-color: #6cb0b8;
}

#header-item h3 {
  color: white;
}

.icon-home .site-icon {
  color: black;
}
</style>
