<template>
  <div class="shadow-lg text-white  relative min-h-10 w-full">
    <div
      class="
        absolute
        left-0
        top-1/2
        transform
        -translate-l-1/2 -translate-y-1/2
      "
    >
      <div class="pl-2 flex justify-between">
        <slot name="left"></slot>
      </div>
    </div>
    <div
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <div class="flex justify-between">
        <slot name="center"></slot>
      </div>
    </div>
    <div
      class="
        absolute
        top-1/2
        right-0
        transform
        -translate-r-1/2 -translate-y-1/2
      "
    >
      <div class="flex justify-between">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script setup></script>
