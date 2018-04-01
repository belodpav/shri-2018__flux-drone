const {tempEngine} = require('../template/template');
const {getID} = require('../helpers');

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
        this._srcNode = document.createElement('div');

        this._init();
    }

    // public methods

    /**
     * Обновляет состояние Представления
     * основываясь на данных Хранилища
     * за которым наблюдает Представление
     * Обновляем только те элементы, которые
     * завязаны на получение данных из хранилища
     */
    update() {
        const data = Object.assign({}, this._getData());
        const keys = Object.keys(data);

        keys
        .filter((key) => data[key] !== this._curState[key])
        .forEach((key) => this._updateNodeAll(key, data[key]));

        this._curState = Object.assign({}, data);
    }


    // private methods

    /**
     * Инициализирует Представление
     */
    _init() {
        const data = this._getData();

        this._srcNode.innerHTML = this._temp;
        this._node.innerHTML = tempEngine(this._temp, data);

        this._curState = Object.assign({}, data);

        this._initEvents(this._node);
        this._buildDepsTree();
    }

    /**
     * Обновляет все DOM элементы
     * зависимые от ключа key
     * @param {String} key
     * @param {*} val
     */
    _updateNodeAll(key, val) {
        const elements = this._depsTree;

        elements.forEach((el) => {
            if (el.keys.indexOf(key) !== -1) {
                const parent = el.parent;
                const newNode = this._updateNode(el.temp);

                el.real = this._replaceNode(el.real, newNode);

                this._initEvents(parent);
            }
        });
    }

    /**
     * Возвращает новый Node
     * построенный на шаблоне
     * но еще не вставленный в DOM
     * @param {Node} el
     * @return {Node}
     */
    _updateNode(el) {
        const node = {
            tempHTML: el.outerHTML,
            wrap: document.createElement('div')
        };

        node.wrap.innerHTML = tempEngine(node.tempHTML, this._getData());

        return node.wrap.firstChild;
    }

    /**
     *  Возвращает ссылку на обновленный DOM
     *  элемент
     * @param {Node} oldNode
     * @param {Node} newNode
     * @return {Node}
     */
    _replaceNode(oldNode, newNode) {
        const id = getID();
        newNode.setAttribute('data-key', id);

        oldNode.replaceWith(newNode);

        const newRealNode = this._node.querySelector('[data-key="' + id + '"]');

        newRealNode.removeAttribute('data-key');

        return newRealNode;
    }

    /**
     *  Строит дерево зависимостей DOM
     *  эелементов от полей состояния хранилища
     */
    _buildDepsTree() {
        const depsTree = [];
        const depsTemp = this._srcNode.querySelectorAll('[data-deps]');
        const deps = this._node.querySelectorAll('[data-deps]');

        deps.forEach((el, i) => {
            const keys = el.getAttribute('data-deps').split(',');

            depsTree.push({
                keys: keys.map((key) => key.trim()),
                real: el,
                temp: depsTemp[i]
            });
        });

        this._depsTree = depsTree;
    }
    /**
     * Инициализирует события для DOM элементов
     * внутри элемента elem
     * @param {Node} elem
     */
    _initEvents(elem) {
        if (!elem) return;
        const activeElements = elem.querySelectorAll('[data-action]');

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
