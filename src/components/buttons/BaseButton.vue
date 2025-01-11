<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<style>
.base-button {
  color: aliceblue;
  background-color: rgb(36, 33, 33);
  border-radius: 8px;
  width: 100px;
  height: 40px;
  margin: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  box-shadow: 0 8px 12px rgba(7, 2, 2, 0.2);
  transition:
    box-shadow 0.2s,
    color 0.2s;
}

.base-button:hover {
  cursor: pointer;
  color: rgb(196, 196, 196);
  box-shadow: 12px 12px 12px rgba(7, 2, 2, 0.2);
}
</style>
