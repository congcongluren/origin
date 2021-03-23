<template>
  <g-button-group>
    <g-button type="primary" icon="g-icon-arrow-left-bold">上一页</g-button>
    <g-button type="primary">
      下一页
      <i class="g-icon-arrow-right g-icon--right"></i>
    </g-button>
  </g-button-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const useButton = () => {
  const buttonloading = ref(true);
  const buttonClick = () => {
    console.log("handle-click");
  };

  setTimeout(() => {
    buttonloading.value = false;
  }, 1000);
  return {
    buttonClick,
    buttonloading,
  };
};

export default defineComponent({
  setup() {
    return {
      ...useButton(),
    };
  },
});
</script>