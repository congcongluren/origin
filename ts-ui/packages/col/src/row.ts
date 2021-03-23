import { defineComponent, h, computed, provide } from "vue";

export default defineComponent({
  name:"GRow",
  props:{
    tag: {
      type: String,
      default: 'div'
    },
    gutter:{
      type: Number,
      default: 0
    },
    justify:{
      type: String,
      default: 'start'
    }
  },
  setup(props, {slots}){

    provide('GRow', props.gutter);

    const classs = computed(()=>[
      'g-row',
      props.justify !== 'start' ? `is-justify-${props.justify}` : ''
    ]);

    const styles = computed(()=>{
      let ret = {
        marginLeft: '',
        marginRight: ''
      }

      if (props.gutter) {
        ret.marginRight = ret.marginLeft = `-${props.gutter/2}px`
      }

      return ret
    })

    return () => h(props.tag, {
      class: classs.value, 
      style: styles.value
    }, slots.default?.())
  }
})