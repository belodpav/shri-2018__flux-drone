/**
 * Представляет Store сущность
 * в flux архитектуре.
 * @class
 */
class Store {
    /**
     * @constructor
     * @param {Object} state - init объект с данными
     * @param {[Object]} observers - наблюдатели за хранилищем
     */
    constructor(state, observers) {
        this._observers = observers || [];
        this._state = state || {};
        this._actionsWithResponse = {};
    }

    // public methods

    /**
     * Возвращает текущее состояние
     * хранилища
     * @method
     * @return {Object}
     */
    get() {
        return this._state;
    }

    /**
     * Устанавливает новое состояние хранилища
     * @method
     * @param {Object} state
     */
    setState(state) {
        this._state = state;
    }

    /**
     * Проверяет, подписано ли хранилище
     * на передаваемое действие и если подписано
     * выполняет соответсвующие действия
     * @method
     * @param {Object} action
     */
    reduce(action) {
        const responses = this._actionsWithResponse;

        if (responses.hasOwnProperty(action.type)) {
            responses[action.type].call(this, action.payload);
            this._notifyObservers();
        }
    }

    /**
     * Подписывает Представление на
     * и изменение состояния хранилища,
     * при этом представление должно
     * иметь метод update()
     * @method
     * @param {Object} observer
     * @return {Object}
     */
    subscribeView(observer) {
        if (observer.update) {
            this._observers.push(observer.update.bind(observer));
        }

        return this;
    }

    /**
     * Добавлет в хранилище ответы
     * в виде каллбэков на заданные
     * действия приложения
     * @param {Object} data
     * @return {Object}
     */
    defineResponse(data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this._actionsWithResponse[key] = data[key];
            }
        }

        return this;
    }

    // private methods

    /**
     * Уведомляет слушателей об изменении
     * состояния хранилища
     * @method
     */
    _notifyObservers() {
        const observers = this._observers;

        observers.forEach((cb) => cb());
    }
};

module.exports = Store;
