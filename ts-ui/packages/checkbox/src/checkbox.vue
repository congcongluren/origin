<template>
  <div class="g-checkbox">
    <span class="g-checkbox__input">
      <input
        type="checkbox"
        v-model="model"
        @change="handleChange"
        :checked="isChecked"
        :name="name"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :value="label"
      />
    </span>
    <span class="g-checkbox-loabel">
      <slot>{{label}}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCheckbox } from "./useCheckbox";

export default defineComponent({
  name: "GCheckbox",
  props: {
    name: String,
    type: String,
    indeterminate: Boolean,
    checked: Boolean,
    disabled: Boolean,
    label: [String, Number, Boolean],
    modelValue: [String, Number, Boolean],
  },
  emits: ["update:modelValue", "change"],
  setup(props) {
    return useCheckbox(props);
  },
});
</script>