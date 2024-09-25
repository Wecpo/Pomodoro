<template>
  <button class="button">
    <slot />
  </button>
</template>

<style>
.button {
    color: aliceblue;
    background-color: rgb(36, 33, 33);
    border-radius: 5px;
    width: 90px;
    height: 40px;
    margin: 15px;
    font-size: 22px;
    font-weight: bold;
}

.button:hover {
    cursor: pointer;
}
</style>
