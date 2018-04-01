## Flux-drone
[![Build Status](https://travis-ci.org/belodpav/shri-2018__flux-drone.svg?branch=master)](https://travis-ci.org/belodpav/shri-2018__flux-drone)

Flux-drone - фреймворк позволяющий стоить приложения на flux архитектуре.

![Flux arcitecture. Made by @facebook](asserts/img-00.png)

Фреймворк состоит из трех основных компонентов:
- Store
- View
- Dispatcher

### Использование

Чтобы использовать Flux-drone в своем проекте, необходимо подключить его в свой проект:

```javascript
    <script src="fluxDrone.min.js"></script>
```

CDN:

[production](https://cdn.rawgit.com/belodpav/shri-2018__flux-drone/master/dist/fluxDrone.min.js)

[development](https://cdn.rawgit.com/belodpav/shri-2018__flux-drone/master/dist/fluxDrone.js)

### Dispatcher

Конструктор диспетчера:

`FluxDrone.Dispatcher(logEl, isConsoleLog)`

где logEl и isConsoleLog необязательные параметры.
logEl - dom узел куда надо записывать логи приложения;
isConsoleLog {Bool} - значение true включает логгирование в консоль.

*Пример:*

`const dispatcher = new FluxDrone.Dispatcher();`

Для регистрации хранилища в диспетчере, воспользуйтесь методом register():

*Пример:*

`dispatcher.register(store);`

Для генерации действия необходимо воспользоваться методом dispatch():

*Пример:*

`dispatcher.dispatch({type: ADD_NAME, payload: 'Flux-drone'});`

### Store

Конструктор хранилища:

`FluxDrone.Store(state, observers)`
где state - init состояние данных хранилища;
observers - массив наблюдателей хранилища(необязательный параметр)

*Пример:*

`const store = new FluxDrone.Store({name: 'Flux-drone'});`

Для получения текущего состояния хранилища:

`const state = store.get();`

Для подписки наблюдателя можно воспользоваться методом subscribeView():

```javascript
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
```

Функция defineResponse() позволяет инициализировать
колбэки для изменения состояния хранилища.

## View. Flux-drone/view

Для фреймворка flux-drone написано представление с собственной системой
шаблонизации. Flux-drone/view может быть использована независимо от фреймворка ;)

Пример определения шаблона:

```javascript
const Counter = `
<button data-action="click=decrease" class="button button_type_inc">-</button>
    <span class="label" data-deps="count">{{count}}</span>
<button data-action="click=increase" class="button button_type_dec">+</button>
`.trim();
```

С помощью объявления двойных скобок `{{}}` определяем места куда надо вставить передаваемые в шаблонизатор значения.
Например: `<span>Hello, {{name}}</span>` при этом данные в шаблонизатор мы должны передать в виде: `{name: 'Flux-drone'}`, в результате шаблонизации получим:

 `<span>Hello, Flux-drone</span>`

Чтобы узнать более подробнее про шаблонизацию обратите внимание на функцию-шаблонизатор: src/template/template.js

С помощью атрибутов `data-deps` мы определяем поля состояния хранилища от которых зависит
данный элемент. Если в хранилище произойдут изменения, то перерендериваться будут только те DOM узлы которых непосредствено касается это изменение.

Запись `data-deps="age, name"` в шаблоне
`<span data-deps="age, name">Hello {{name}}! Are you {{age}} years old?</span>`
Что элемент будет перендериваться только если в хранилище будут изменены поля `name и age`.
(Открыть на codepen)[https://codepen.io/belodpav/pen/aYGjMY?editors=0010]

Атрибуттами `data-action` в коде шаблонов мы определяем реакцию DOM узла на действие пользователя. Так запись `data-action="click=decrease"` означает что данный элемент на событие
`click` будет вызывать реакцию(функцию определенную при создании view) `increase`.
Можно навешивать несколько событий на один элемент. Например:

```javascript
const Counter = `
<button data-action="click=sayHello,mouseleave=sayBye">Click</button>
`.trim();
```

Здесь при нажатии на кнопку будет вызвана рекция sayHello, а при выходе курсора за кнопку
рекция sayBye.

Пример создания Представления(в рамках использования настоящего фреймворка):

```javascript
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
```


## Examples

Примеры использования фремворка можно найти в папке examples

## Файловая структура репозитория

    /asserts - картинки и пр. вспомогательные документы для README.md

    /dist - собранные dev и prod версии фреймворка

    /examples - примеры приложений на Flux-drone

    /src - исходники фреймворка

    - /core - ядро фреймворка, состоит из 3 компонентов

    - /helpers - вспомогательные функции

    - /template - шаблонизатор Flux-drone/tempEngine

    /test - тесты для фреймворка