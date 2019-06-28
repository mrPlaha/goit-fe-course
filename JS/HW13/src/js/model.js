import v4 from 'uuid/v4'
import * as api from '../services/api';
import * as storage from '../services/storage'

export default class Model {
    constructor() {
        this.items = this.getItems();
    }
    getItems() {
        return storage.get()
    }
    addItem(text) {
        return api.fetchLink(text)
            .then(data => {
                if (!data.error && !this.items.some(el => el.url === data.url)) {
                    data.id = v4();
                    this.items.unshift(data);
                    console.log(data)
                    storage.set(this.items);
                }
                return data
            })
    }
    removeItem(id) {
        this.items = this.items.filter(el => el.id !== id);
        storage.set(this.items)
    }
}