import { defineComponent, openBlock, createBlock } from 'vue';

// type IButtonType = "primary"| "warning"| "danger" | "info" | "success";
var script = defineComponent({
    props: {
    // type: {
    //   type: String as PropType<IButtonType>,
    //   default: 'parimary',
    //   validator: (val: string)=> {
    //     return [
    //     ].includes(val);
    //   }
    // }
    },
    name: "GButton",
    setup(props, ctx) {
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", null, "按钮"))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Button = script;

export default _Button;
