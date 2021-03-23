import { App } from "vue";
import Button from "@g-ui/button"; 
import Icon from "@g-ui/icon"; 
import ButtonGroup from '@g-ui/button-group';

const components = [
  Button,
  Icon,
  ButtonGroup
];

const install = (app: App): void => {
  components.forEach(component=>{
    app.component(component.name, component)
  })
}


export default {
  install
}