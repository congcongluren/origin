import { defineComponent, h, computed, inject } from "vue";

export default defineComponent({
  name: "GCol",
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  setup(props, { slots }) {
    const gutter = inject('GRow', 0);

    const classs = computed(() => {
      const ret = [];
      const pos = ['span', 'offset'] as const;
      pos.forEach((item) => {
        const size = props[item];
        if (typeof size === 'number' && size > 0) {
          ret.push(`g-col-${item}-${props[item]}`)
        }
      });
      return [
        'g-col',
        ...ret
      ]
    })
    const styles = computed(() => {
      if (gutter !== 0) {
        return {
          paddingLeft: gutter / 2 + 'px',
          paddingRight: gutter / 2 + 'px'
        }
      }
      return {}
    })

    return () => h(props.tag, {
      class: classs.value,
      style:styles.value
    }, slots.default?.())
  }
})