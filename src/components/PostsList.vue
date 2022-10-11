<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <PostItem
                  v-for="post in posts"
                  :post="post"
                  :key="post.id"
                  @remove="$emit('remove', post)"
        />
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

</style>
