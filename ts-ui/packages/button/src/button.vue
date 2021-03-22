<template>
  <button>按钮</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type IButtonType = "primary"| "warning"| "danger" | "info" | "success";

export default defineComponent({
  props:{
    type: {
      type: String as PropType<IButtonType>,
      default: 'parimary',
      validator: (val: string)=> {
        return [

        ].includes(val);
      }
    }
  },
  name: "GButton",
  setup(props, ctx){
  } 
  
})
</script>