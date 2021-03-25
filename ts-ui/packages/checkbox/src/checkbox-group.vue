<template>
  <div class="z-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";

export default defineComponent({
  name: "GCheckboxGroup",
  props: {
    modelValue: Array,
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit }) {
    // 将props属性创造出一个新的，传给子
    const modelValue = computed(() => props.modelValue);
    const changeEvent = (val) => {
      emit("change", val);
      emit("update:modelValue", val);
    };
    provide("GCheckboxGroup", {
      name: "GCheckboxGroup",
      modelValue,
      changeEvent,
    });
  },
});
</script>