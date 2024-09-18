<template>
    <button class="timerButton">
        <slot></slot>
    </button>
</template>

<style>
.timerButton {
    color: aliceblue;
    background-color: rgb(36, 33, 33);
    border-radius: 5px;
    width: 90px;
    height: 40px;
    margin: 15px;
    font-size: 22px;
    font-weight: bold;
}

.timerButton:hover {
    cursor: pointer;
}
</style>