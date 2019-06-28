import EventEmitter from '../services/event-emitter';
export default class View extends EventEmitter {
    constructor() {
        super();
        this.modal = document.querySelector('.js-modal-backdrop');
        this.closeMod = this.modal.querySelector('div[data-action="close-modal"]')
        this.closeMod.addEventListener('click', this.handleCloseModal.bind(this));

        this.form = document.querySelector('form');
        this.inputLink = this.form.querySelector('input');
        this.cards = document.querySelector('.cards');
        this.input = document.querySelector('input')

        this.form.addEventListener('submit', this.handleAdd.bind(this));
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.init = this.init.bind(this);
    }
    handleAdd(evt) {
        evt.preventDefault();
        const {
            value
        } = this.input;
        if (value === '') return;
        this.emit('add', value);
    }
    createCard(card) {

        const item = document.createElement('div');
        item.dataset.id = card.id;
        item.classList.add('card');

        const buttonRemove = document.createElement('div');
        buttonRemove.classList.add('close-btn');
        buttonRemove.dataset.action = 'remove'

        const image = document.createElement('img');
        image.src = card.image;
        image.alt = card.title;

        const title = document.createElement('a');
        title.href = card.url;
        title.target = 'blank'
        title.innerHTML = `<h3 class="title">${card.title}</h3>`

        const descr = document.createElement('p');
        descr.textContent = card.description;
        descr.classList.add('descr');

        item.append(buttonRemove, image, title, descr);
        this.appendEventListners(item);

        return item;
    }
    addCard(card) {
        const item = this.createCard(card);
        this.form.reset();
        this.cards.insertBefore(item, this.cards.children[0]);
    }

    appendEventListners(item) {
        const removeBtn = item.querySelector('[data-action="remove"]');

        removeBtn.addEventListener('click', this.handleRemove.bind(this));
    }
    handleRemove({
        target
    }) {
        const parent = target.closest('.card');
        this.emit('remove', parent.dataset.id);
    }

    removeCard(id) {
        const item = this.cards.querySelector(`[data-id="${id}"]`);
        this.cards.removeChild(item);
    }

    openModal(message) {
        this.modal.classList.remove('modal-hidden');
        const textarea = this.modal.querySelector('.modal-text')
        textarea.textContent = message;
        console.log(this)
    }

    handleCloseModal() {
        this.emit('close-modal');
    }
    closeModal() {
        this.modal.classList.add('modal-hidden');
    }

    init(cards) {
        const elements = cards.map(card => this.createCard(card));
        this.cards.append(...elements);
    }

}