<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
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
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </MyDialog>
    <PostsList
        :posts="sortedAndSearchPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <h3 v-else>Идет загрузка...</h3>
    <div class="observer" v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList";
import PostForm from "@/components/PostForm";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  components: {MyInput, MySelect, MyButton, PostForm, PostsList},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
      ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
        searchQuery: state => state.post.searchQuery
      }),
      ...mapGetters({
        sortedPosts: 'post/sortedPosts',
        sortedAndSearchPosts: 'post/sortedAndSearchPosts'
      })
  },
  watch: {
    // page() {
    //     this.fetchPosts();
    // }
  }
}
</script>

<style>
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

.preloader {

}

.observer {
  height: 30px;
  background: darkorange;
}
</style>
