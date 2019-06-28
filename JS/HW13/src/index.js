import Model from './js/model'
import View from './js/view'
import Controller from './js/controller';
import EventEmitter from './services/event-emitter';
import './style.css';
const model = new Model;
const view = new View;
new Controller(model, view);