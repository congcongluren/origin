import { App } from 'vue';
import Message from './src/message.vue';

Message.install = (app: App): void => {  
  app.component(Message.name, Message);
}

type IWithInstall<T> = T & { install(app: App): void };
const _Message: IWithInstall<typeof Message> = Message;
export default _Message;