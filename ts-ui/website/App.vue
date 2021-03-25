<template>
  <g-transfer 
    v-model="rightValue" 
    :data="transferData"
    :props="transferPop"
  > </g-transfer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

function useTransfer() {
  const generateData = () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `备选项 ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return ref(data);
  };

  return {
    transferData: generateData(),
    rightValue: ref([1,4]),
    transferPop:{
      key:'key',
      label:'label',
      disabled: 'disabled'
    }
  };
}

export default defineComponent({
  setup() {
    return{
      ...useTransfer()
    }
  },
});
</script>