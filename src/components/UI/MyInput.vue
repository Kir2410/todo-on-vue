<template>
    <input class="input"
           type="text"
           :value="modelValue"
           @input="updateInput"
    >
</template>

<script>
    export default {
        name: "MyInput",
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .input {
        width: 100%;
        margin-top: 15px;
        padding: 15px;
        border: 1px solid steelblue;
    }
</style>
