<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email!=null">Your email address is {{ email }}</p>
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
      email(){
        const email = (this.$store.getters.user!=null) ? this.$store.getters.user.email : ""
        return email
      }
    },
    beforeCreate(){
      this.$store.dispatch('fetchUser')
    }
  }
</script>
