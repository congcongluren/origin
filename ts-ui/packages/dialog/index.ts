import { App } from 'vue';
import Dialog from './src/dialog.vue';

Dialog.install = (app: App): void => {  
  app.component(Dialog.name, Dialog);
}

type IWithInstall<T> = T & { install(app: App): void };
const _Dialog: IWithInstall<typeof Dialog> = Dialog;
export default _Dialog;