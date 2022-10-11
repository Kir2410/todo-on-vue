<template>
    <div class="post">
        <div class="">
            <div class="post-title">
                <strong>Название:</strong> {{ post.title }}
            </div>
            <div class="post-body">
                <strong>Описание:</strong> {{ post.body }}
            </div>
        </div>
        <div class="post__buttons">
            <MyButton @click="$emit('remove', post)">Удалить</MyButton>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostItem",
        props: {
            post: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style scoped> /* scoped делает стили доступными только внутри компоненты */
    .post {
        margin-top: 15px;
        padding: 15px;
        border: 2px solid steelblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
