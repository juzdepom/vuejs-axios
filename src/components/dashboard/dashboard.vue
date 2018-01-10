<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <div v-if="user!=null">
      <p>Your email address is {{ user.email }}</p>
      <p>Your age is {{ user.age }}</p>
      <template v-if="hobbies != null">
        <template v-if="hobbies.length > 1">
          <p>Your hobbies are: <span v-for="hobby in hobbies">{{ hobby }}, </span></p>
        </template>
        <template v-if="hobbies.length > 0 && hobbies.length < 2">
          <p>Your hobby is: {{ hobbies[0] }} </p>
        </template>
      </template>


    </div>

  </div>
</template>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>

<script type="text/javascript">
  import axios from 'axios'

  export default {
    computed: {
      user(){
        return (this.$store.getters.user!=null) ? this.$store.getters.user : null
      },
      hobbies(){
        return (this.user!=null) ? this.user.hobbies : null
      }
    },
    beforeCreate(){
      // this.$store.dispatch('fetchUser')
    }
  }
</script>
