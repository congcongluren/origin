import { App } from "vue";
import Button from "@g-ui/button"; 
import Icon from "@g-ui/icon"; 
import ButtonGroup from '@g-ui/button-group';
import Row from "@g-ui/row";
import Col from "@g-ui/col";

const components = [
  Button,
  Icon,
  ButtonGroup,
  Row,
  Col
];

const install = (app: App): void => {
  components.forEach(component=>{
    app.component(component.name, component)
  })
}


export default {
  install
}