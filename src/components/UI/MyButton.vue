<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "MyButton"
    }
</script>

<style scoped>
    button{
        padding: 15px;
        border: 1px solid steelblue;
        background: none;
        color: steelblue;
        cursor: pointer;
    }
</style>
