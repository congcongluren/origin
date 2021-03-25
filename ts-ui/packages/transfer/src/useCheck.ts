import { computed, getCurrentInstance, watch } from "vue";
import { ITransferPanelProps, IPanelState } from "./transfer.type";

export const useCheck = (props: ITransferPanelProps, panelState: IPanelState) => {
  const { emit } = getCurrentInstance();
  const labelProp = computed(() => props.props.label);
  const keyProp = computed(() => props.props.key);
  const disabledProp = computed(() => props.props.disabled);

  const checkableData = computed(() => {
    return props.data.filter(item => !item[disabledProp.value]);
  })


  const handleCheckAllChange = (val) => {
    // 将所有数据拿到，通过当前的值来做筛选
    panelState.allChecked = val;
    panelState.checked = val ? checkableData.value.map(item => item[keyProp.value]) : []
  }

  watch(() => panelState.checked, (val) => {
    // 监听checks数据变化，决定全选，反选状态
    let checkKeys = checkableData.value.map(item => item[keyProp.value])
    panelState.allChecked = checkKeys.length > 0 && checkKeys.every(key => panelState.checked.includes(key));

    emit('checked-change', panelState.checked);
  })

  return {
    keyProp, labelProp, disabledProp, handleCheckAllChange
  }

}