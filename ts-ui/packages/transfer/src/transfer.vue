<template>
  <div class="g-transfer">
    <GTransferPanel
      :data="sourceData"
      :props="props"
      @checked-change="onSourceCheckedChange"
    ></GTransferPanel>
    <div class="g-transfer__buttons">
      <g-button icon="g-icon-arrow-left-bold" @click="addToLeft" :disabled="rightChecked.length === 0" type="primary"></g-button>
      &nbsp;
      <g-button icon="g-icon-arrow-right-bold" @click="addToRight" :disabled="leftChecked.length === 0" type="primary"></g-button>
    </div>
    <GTransferPanel
      :data="targetData"
      :props="props"
      @checked-change="onTargetCheckedChange"
    ></GTransferPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import GTransferPanel from "./transfer-panel.vue";
import GButton from "@g-ui/button";
import { DataItem, Key, Props } from "./transfer.type";
import { useComputedData } from "./useComputedData";

export default defineComponent({
  name: "GTransfer",
  components: {
    GTransferPanel,
    GButton,
  },
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },
    modelValue: {
      type: Array as PropType<Key[]>,
    },
    props: {
      type: Object as PropType<Props>,
      default: () => ({
        lable: "lable",
        key: "key",
        disabled: "disabled",
      }),
    },
  },
  emits: ["checked-change"],
  setup(props, {emit}) {
    // 1. 数据分成两部分 左右
    let { propsKey, sourceData, targetData } = useComputedData(props);

    const checkedState = reactive({
      leftChecked: [],
      rightChecked: [],
    });

    const onSourceCheckedChange = (leftValue) => {
      checkedState.leftChecked = leftValue;
    };
    const onTargetCheckedChange = (rightValue) => {
      checkedState.rightChecked = rightValue;
    };
    const addToLeft = () => {
      const currentValue = props.modelValue.slice(0);
      checkedState.rightChecked.forEach(item=>{
        let index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      console.log(currentValue);
      
      emit('update:modelVlaue', currentValue)
    }
    const addToRight = () => {
    }

    return {
      onSourceCheckedChange,
      onTargetCheckedChange,
      sourceData,
      targetData,
      ...toRefs(checkedState),
      addToLeft,
      addToRight
    };
  },
});
</script>