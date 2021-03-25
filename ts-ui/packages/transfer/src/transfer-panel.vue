<template>
  <div class="g-transfer__panel">
    列表
    <g-checkbox v-model="allChecked" @change="handleCheckAllChange"
      >全选/反选</g-checkbox
    >
    <div class="g-transfer__body">
      <g-checkbox-group v-model="checked">
        <g-checkbox
          v-for="item in data"
          :key="item[keyProp]"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
          >{{ item[labelProp] }}</g-checkbox
        >
      </g-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { Props } from "./transfer.type";
import GCheckboxGroup from "@g-ui/checkbox-group";
import GCheckbox from "@g-ui/checkbox";
import { useCheck } from "./useCheck";

export default defineComponent({
  name: "GTransferPanel",
  components: {
    GCheckboxGroup,
    GCheckbox,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    props: Object as PropType<Props>,
  },
  setup(props) {
    const panelState = reactive({
      checked: [],
      allChecked: false,
    });

    // 根据props计算出key， 禁用等
    let { keyProp, labelProp, disabledProp, handleCheckAllChange } = useCheck(
      props,
      panelState
    );

    return {
      keyProp,
      labelProp,
      disabledProp,
      handleCheckAllChange,
      ...toRefs(panelState),
    };
  },
});
</script>