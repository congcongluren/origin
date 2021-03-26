import { App } from "vue";
import Button from "@g-ui/button"; 
import Icon from "@g-ui/icon"; 
import ButtonGroup from '@g-ui/button-group';
import Row from "@g-ui/row";
import Col from "@g-ui/col";
import Checkbox from "@g-ui/checkbox";
import CheckboxGroup from "@g-ui/checkbox-group";
import Transfer from '@g-ui/transfer';
import Message from '@g-ui/message';
import Dialog from '@g-ui/dialog';

const components = [
  Button,
  Icon,
  ButtonGroup,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Transfer,
  Message,
  Dialog
];

const install = (app: App): void => {
  components.forEach(component=>{
    app.component(component.name, component)
  })
}


export default {
  install
}