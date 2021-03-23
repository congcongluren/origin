<template>
  <button :class="classs" @click="handleClick">
    <i v-if="loading" class="g-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon" ></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

type IButtonType = "primary" | "warning" | "danger" | "info" | "success" | "default";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<IButtonType>,
      default: "parimary",
      validator: (val: string) => {
        return ["primary", "warning", "danger", "info", "success"].includes(
          val
        );
      },
    },
    icon: {
      type: String,
      default: "",
    },
    disabled: Boolean,
    loading: Boolean,
    round: Boolean,
  },
  emits:['click'],
  name: "GButton",
  setup(props, ctx) {
    const classs = computed(() => [
      "g-button", 
      "g-button--" + props.type,
      {
        "is-disabled": props.disabled,
        "is-loading": props.loading,
        "is-round": props.round
      }
    ]);

    const handleClick = (e) => {
      ctx.emit('click', e);
    }
    return {
      classs,
      handleClick
    };
  },
});
</script>