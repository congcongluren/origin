<template>
    <i :class="`g-icon-${name}`"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GIcon",
  props:{
    name:{
      type:String,
      default: ''
    }
  }
})
</script>