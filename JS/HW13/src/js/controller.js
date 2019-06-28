export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.init(this.model.items)
        this.view.on('close-modal', this.handleCloseModal.bind(this));
        this.view.on('add', this.addCard.bind(this));
        this.view.on('remove', this.removeCard.bind(this));
    }

    addCard(text) {
        const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (pattern.test(text)) {
            this.model.addItem(text).then(data => {
                if (data.error) {
                    this.view.openModal(`Ошибка! ${data.description}`)
                    return
                }
                if (!data.id) {
                    this.view.openModal('Cсылка уже есть в коллекции!')
                    return
                }
                this.view.addCard(data);
                return
            });
        } else {
            this.view.openModal('Не валидная ссылка!')
        }
    }

    removeCard(id) {
        this.model.removeItem(id);
        this.view.removeCard(id);
    }
    handleCloseModal() {
        this.view.closeModal();
    }

}