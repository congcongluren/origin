import { App } from "vue";
import Button from "@g-ui/button"; 
import Icon from "@g-ui/icon"; 


const components = [
  Button,
  Icon
];

const install = (app: App): void => {
  components.forEach(component=>{
    app.component(component.name, component)
  })
}


export default {
  install
}