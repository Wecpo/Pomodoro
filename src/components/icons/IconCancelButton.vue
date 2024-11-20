<template>
  <div class="cancelButton">
    <svg
      id="Layer_1" fill="#000000" height="25px" width="25px" version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512" xml:space="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
      <g id="SVGRepo_iconCarrier"> <g>
        <g>
          <path
            d="M320,112H192V48h-32L0,208l160,160h32v-64h160c88.365,0,112,71.635,
               112,160h48V304C512,197.962,426.038,112,320,112z"
          />
        </g>
      </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.cancelButton {
  position: absolute;
  top: -40px;
  right: 160px;
}

svg:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
