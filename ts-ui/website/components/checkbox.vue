<template>
  {{ checkVal }}
  <g-checkbox-group v-model="checkVal" @change="checkboxChange">
    <g-checkbox v-for="c in checks" :key="c" :label="c"></g-checkbox>
  </g-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
function useCheckbox() {
  const checkVal = ref(["shanghai", "shenzhen"]);
  const checks = reactive(["shanghai", "beijing", "tianjin", "shenzhen"]);
  const checkboxChange = (val) => {
    console.log(val);
  };

  return {
    checkVal,
    checkboxChange,
    checks,
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