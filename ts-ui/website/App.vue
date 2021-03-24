<template>
  {{ checkVal }}
  <g-checkbox v-model="checkVal"> checkbox </g-checkbox>
  <g-checkbox-group></g-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
function useCheckbox() {
  const checkVal = ref(true);

  return {
    checkVal,
  };
}

export default defineComponent({
  setup() {
    return {
      ...useCheckbox(),
    };
  },
});
</script>