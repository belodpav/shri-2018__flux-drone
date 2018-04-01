/**
 * Объявляем Константы приложения
 */
const ActionTypes = {
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE'
};

/**
 * Counter - шаблон представления
 * находится в отдельном файле Counter.js
 */

const logger = document.querySelector('.logger');

/**
 * Объявляем flux сущности для построения
 * приложения
 */
const dispatcher = new FluxDrone.Dispatcher(logger);
const store = new FluxDrone.Store({count: 13});
const view = new FluxDrone.View(
    '#root', // Корневой элемент представления
    store,
    Counter, // шаблон Представления
    { // Функции колбэки как ответ на действие пользователя
        increase: () => {
            dispatcher.dispatch({
                type: ActionTypes.INCREASE
            });
        },
        decrease: () => {
            dispatcher.dispatch({
                type: ActionTypes.DECREASE
            });
        }
    }
);

store
.subscribeView(view) // Подписываем представление на изменения store
.defineResponse({ // Определяем функции обработки хранилища для действий
    'INCREASE': function() {
        this._state.count++;
    },
    'DECREASE': function() {
        this._state.count--;
    }
});

dispatcher.register(store);
