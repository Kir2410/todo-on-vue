<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <MyButton
                @click="fetchPosts"
                style="margin-right: 15px"
        >
            Получить посты
        </MyButton>
        <MyButton
                @click="showDialog"
                style="margin: 15px 0"
        >
            Создать пост
        </MyButton>
        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost"/>
        </MyDialog>
        <PostsList :posts="posts" @remove="removePost"/>
    </div>
</template>

<script>
import PostsList from "@/components/PostsList";
import PostForm from "@/components/PostForm";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";

export default {
    components: {MyButton, PostForm, PostsList},
    data() {
        return {
            posts: [],
            dialogVisible: false,
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
            //Оставляем в массиве только те посты, id которых не равен id передаваемого поста
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка!')
            }
        }
    }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        padding: 20px;
    }
</style>
