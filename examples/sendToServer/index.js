// Константы приложения
const ActionTypes = {
    POST_MESSAGE: 'POST_MESSAGE',
    GET_MESSAGE: 'GET_MESSAGE',
    INPUT: 'INPUT'
};

/**
 * Отправляет данные на сервер
 * @param {String} data
 * @return {Promise}
 */
function sendToServer(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Сервер принял данные ' + data);
        }, 2000);
    });
}

/**
 * App - шаблон представления
 * находится в отдельном файле App.js
 */


const log = document.querySelector('.log');

/**
 * Объявляем flux сущности для построения
 * приложения
 */
const dispatcher = new FluxDrone.Dispatcher(log, true);
const store = new FluxDrone.Store({answer: '', message: ''});
const view = new FluxDrone.View(
    '#root', // Корневой элемент представления
    store,
    App, // шаблон Представления
    { // Функции колбэки как ответ на действие пользователя
        onInput: (e) => {
            dispatcher.dispatch({
                type: ActionTypes.INPUT,
                payload: e.target.value
            });
        },
        sendToServer: () => {
            const msg = store.get().message;
            dispatcher.dispatch({
                type: ActionTypes.POST_MESSAGE
            });

            sendToServer(msg)
            .then((res) => {
                dispatcher.dispatch({
                    type: ActionTypes.GET_MESSAGE,
                    payload: res
                });
            });
        }
    }
);

store
.subscribeView(view) // Подписываем представление на изменения store
.defineResponse({ // Определяем функции обработки хранилища для действий
    'GET_MESSAGE': function(payload) {
        this._state.answer = payload;
    },
    'INPUT': function(payload) {
        this._state.message = payload;
    }
});

// Регестрируем хранилище в диспетчере
dispatcher.register(store);
