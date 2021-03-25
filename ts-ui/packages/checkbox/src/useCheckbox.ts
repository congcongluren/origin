import { computed, getCurrentInstance, inject, WritableComputedRef } from "vue";
import { ICheckboxGroupProvide, ICheckboxProps } from "./checkbox.type";

const useCheckboxGroup = () => {
  const checkboxGroup = inject<ICheckboxGroupProvide>('GCheckboxGroup', {});
  const isGroup = checkboxGroup.name === 'GCheckboxGroup';
  return {
    isGroup,
    checkboxGroup
  }
}


const useModule = (props: ICheckboxProps) => {
  const { emit } = getCurrentInstance();
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const store = computed(()=>checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue);
  const model = computed({
    get() {
      return isGroup ? store.value : props.modelValue
    },
    set(val) {
      if(isGroup) { // 组的更新方法，会覆盖自己的更新方法
        return checkboxGroup.changeEvent(val)
      }
      emit('update:modelValue', val)
    }
  })

  return model;
}

const useCheckboxStatus = (props: ICheckboxProps, model: WritableComputedRef<unknown>) => {
  const isChecked = computed(() => {
    const value = model.value;
    if (Array.isArray(value)) { // 父组件传递过来数组，判断子组件选中
      return value.includes(props.label)
    } else {
      return value
    }
  })

  return isChecked;
}

const useEvent = () => {
  const { emit } = getCurrentInstance();
  const handleChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    const changeVal = target.checked ? true : false;

    emit('change', changeVal);
  }
  return handleChange;
}

export const useCheckbox = (props: ICheckboxProps) => {
  // 1. 设置一个属性，属性采用modelValue，能更改，更改的时候触发事件
  let model = useModule(props);

  // 2. 给checkbox设置一个checked状态，更改checkbox选中，或者取消选中需要获取到checked的状态
  const isChecked = useCheckboxStatus(props, model);

  // 3. 创造一个change事件
  const handleChange = useEvent()

  // 每次状态变化，调用changeEvent触发更新
  return {
    model,
    isChecked,
    handleChange
  }
}