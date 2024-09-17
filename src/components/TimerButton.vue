<template>
    <button class="timerButton">
        <slot></slot>
    </button>
</template>

<style>
.timerButton {
    color: aliceblue;
    background-color: rgb(148, 83, 83);
    border-radius: 5px;
    width: 50px;
    height: 30px;
}

.timerButton:hover {
    cursor: pointer;
}
</style>