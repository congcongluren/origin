import Row from '../col/src/row';
import { App } from 'vue';

Row.install = (app:App): void => {
  app.component(Row.name, Row)
}


export default Row;