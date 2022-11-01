<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <MyInput
                v-model="searchQuery"
                placeholder="Поиск..."
        />
        <div class="app__buttons">
            <MyButton
                    @click="showDialog"
                    style="margin: 15px 0"
            >
                Создать пост
            </MyButton>
            <MySelect
                    v-model="selectedSort"
                    :options="sortOptions"
            />
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost"/>
        </MyDialog>
        <PostsList :posts="sortedAndSearchPosts" @remove="removePost"/>
        <div class="page__wrapper">
            <div
                    class="page"
                    :class="{
                        'current-page': page === pageNumber
                    }"
                    v-for="pageNumber in totalPages"
                    :key="pageNumber"
                    @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div>
    </div>
</template>

<script>
import PostsList from "@/components/PostsList";
import PostForm from "@/components/PostForm";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
    components: {MyInput, MySelect, MyButton, PostForm, PostsList},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ],
            searchQuery: ''
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
        changePage(pageNumber) {
            this.page = pageNumber;
        },
        async fetchPosts() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка!')
            } finally {
                this.isPostsLoading = false;
            }
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        page() {
            this.fetchPosts();
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

    .app__buttons {
        display: flex;
        justify-content: space-between;
    }

    .page__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
    }

    .page {
        border: 1px solid dimgrey;
        padding: 10px;
        cursor: pointer;
        margin-right: 5px;
    }

    .current-page {
        border: 2px solid steelblue;
    }
</style>
