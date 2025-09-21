import './style.css'
import { appDev } from './todos/app';
import todoStore from './store/todo-store';

todoStore.initStore(); //--> visualizacion en consola 

appDev( '#app' );







