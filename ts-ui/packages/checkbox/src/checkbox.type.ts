import { ComputedRef } from "vue";

export interface ICheckboxProps {
  indeterminate?: boolean,
  checked?: boolean,
  name?: string,
  disabled?: boolean,
  label?: string | boolean| number,
  modelValue?: string | boolean| number
}

export interface ICheckboxGroupProvide {
  modelValue?: ComputedRef,
  changeEvent?: (val: unknown)=>void,
  name?: string
}