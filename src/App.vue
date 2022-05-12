<template>
  <Nav />
  <Header />

  <main class="form-signin">
    <router-view />
  </main>
</template>

<script>
import Nav from "@/components/Nav";
import Header from "@/components/Header";

export default {
  components: { Nav, Header },
};
</script>
