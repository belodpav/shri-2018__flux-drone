const {genCodeWithData} = reuire('../template/template');

/**
 * Представляет View сущность
 * в flux архитектуре.
 */
class View {
    /**
     * @constructor
     * @param {Node} root
     * @param {Object} store
     * @param {String} temp
     * @param {Object} events
     */
    constructor(root, store, temp, events) {
        this._getData = store.get.bind(store);
        this._temp = temp;
        this._events = events;

        this._node = document.querySelector(root);

        this.update();
    }

    // public methods

    /**
     * Обновляет состояние Представления
     * основываясь на данных Хранилища
     * за которым наблюдает Представление
     */
    update() {
        const data = this._getData();

        const html = genCodeWithData(this._temp, data);
        this._node.innerHTML = html;
        this._initEvents();
    }

    // private methods

    /**
     * Инициализирует события для DOM элементов
     */
    _initEvents() {
        const activeElements = this._node.querySelectorAll('[data-action]');

        activeElements.forEach((el) => {
            const actionPairs = el.getAttribute('data-action').split(',');

            actionPairs.forEach((pair) => {
                const keyVal = pair.split('=');

                el.addEventListener(keyVal[0], this._events[keyVal[1]]);
            });
        });
    }
}

module.exports = View;
