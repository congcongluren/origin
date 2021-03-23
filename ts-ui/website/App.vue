<template>
  <div>
    <g-row>
      <g-col :span="6">
        <div style="background:red">111</div>
      </g-col>
      <g-col :span="6" :offset="6">
        <div style="background:green">222</div>
      </g-col>
      <g-col :span="6">
        <div style="background:pink">333</div>
      </g-col>
    </g-row>
    <hr />
    <g-row :gutter="10">
      <g-col :span="8">
        <div style="background:red">111</div>
      </g-col>
      <g-col :span="8">
        <div style="background:green">222</div>
      </g-col>
      <g-col :span="8">
        <div style="background:pink">333</div>
      </g-col>
    </g-row>
    <hr />
    <g-row justify="space-around">
      <g-col :span="3">
        <div style="background:red">111</div>
      </g-col>
      <g-col :span="3">
        <div style="background:green">222</div>
      </g-col>
      <g-col :span="3">
        <div style="background:pink">333</div>
      </g-col>
    </g-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {}
});
</script>