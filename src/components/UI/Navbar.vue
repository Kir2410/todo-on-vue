<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue3</div>
        <div class="navbar__buttons">
          <MyButton @click="$router.push('/posts')">Страница с постами</MyButton>
          <MyButton @click="$router.push('/about')" style="margin-left: 20px">О приложении</MyButton>
          <MyButton @click="$router.push('/store')" style="margin-left: 20px">Store</MyButton>
        </div>
    </div>
</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style scoped>
    .navbar {
      height: 50px;
      background-color: lightsteelblue;
      box-shadow: 2px 2px 4px dimgray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
</style>