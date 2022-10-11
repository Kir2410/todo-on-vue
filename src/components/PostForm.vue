<template>
    <form action="" @submit.prevent>
        <h4>Создание поста</h4>
        <MyInput placeholder="Название поста" v-model="post.title"/>
        <MyInput placeholder="Тело поста" v-model="post.body"/>
        <MyButton class="button" @click="createPost">Создать</MyButton>
    </form>
</template>

<script>
    export default {
        name: "postForm",
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                this.post.id = Date.now();
                this.$emit('create', this.post)
                this.post = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }

    .button {
        margin-top: 15px;
        align-self: flex-end;
    }
</style>
