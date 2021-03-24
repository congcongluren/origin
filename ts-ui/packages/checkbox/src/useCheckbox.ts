import { computed, getCurrentInstance, useCssModule } from "vue";
import { ICheckboxProps } from "./checkbox.type";

const useModule = (props: ICheckboxProps) => {
  const { emit } = getCurrentInstance();
  const model = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })

  return model;
}



export const useCheckbox = (props: ICheckboxProps) => {
  // 1. 设置一个属性，属性采用modelValue，能更改，更改的时候触发事件

  let model = useModule(props);


  return {
    model
  }
}