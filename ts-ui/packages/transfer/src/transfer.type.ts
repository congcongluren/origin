export type Key = string | number

export type DataItem = {
  key: Key,
  label: string,
  disabled: boolean
}
export type Props = {
  key: string,
  label: string,
  disabled: string
}
export interface ITransferProps {
  data?: DataItem[], // 所有的数据
  modelValue?: Key[], // 右边框的索引
  props?: Props // 数据别名
}

export interface ITransferPanelProps {
  data: any[],
  props?: Props
}

export interface IPanelState {
  allChecked: boolean,
  checked: Key[]
}