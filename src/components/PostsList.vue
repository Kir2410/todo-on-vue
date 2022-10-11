<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="posts-list">
            <PostItem
                    v-for="post in posts"
                    :post="post"
                    :key="post.id"
                    @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <div v-else>
        <h3 style="color: darkred">Список постов пуст</h3>
    </div>
</template>

<script>
    import PostItem from "@/components/PostItem";
    export default {
        name: "postsList",
        components: {PostItem},
        props: {
            posts: {
                type: Array,
                required: true //делает этот параметр обязательным
            }
        }
    }
</script>

<style scoped>
    .posts-list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .posts-list-enter-active,
    .posts-list-leave-active {
        transition: all .3s ease;
    }

    .posts-list-enter-from,
    .posts-list-leave-to {
        opacity: 0;
        transform: translateX(130px)
    }

    .posts-list-move {
        transition: transform .4s ease;
    }
</style>
