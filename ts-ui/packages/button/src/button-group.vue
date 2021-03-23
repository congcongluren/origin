<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'GButtonGroup'
});
</script>