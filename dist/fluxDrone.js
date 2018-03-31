/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/dispatcher.js":
/*!********************************!*\
  !*** ./src/core/dispatcher.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Представляет dispatcher сущность\n * в flux архитектуре.\n * Имеет api для регистрации хранилищ\n * (stores) и отправки действия с\n * данными всем хранилищам\n * @class\n */\nvar Dispatcher = function () {\n    /**\n     * @constructor\n     * @param {Node} logEl - target DOM элемент для логов\n     * @param {Bool} isConsoleLog\n     */\n    function Dispatcher(logEl, isConsoleLog) {\n        _classCallCheck(this, Dispatcher);\n\n        this._callbacks = [];\n        this._logsList = []; // Массив с логами\n        this._isConsoleLog = isConsoleLog || false;\n\n        this._logEl = logEl || null;\n    }\n\n    // public methods\n    /**\n     * Регестрирует Хранилище в Диспетчере\n     * @method\n     * @param {function} store\n     */\n\n\n    _createClass(Dispatcher, [{\n        key: 'register',\n        value: function register(store) {\n            if (store && store.reduce) {\n                this._callbacks.push(store.reduce.bind(store));\n            } else {\n                throw Error('You have to pass correct store object!');\n            }\n        }\n\n        /**\n         * Отправляет Объект с действием всем подписанным\n         * хранилищам\n         * @method\n         * @param {Object} action\n         */\n\n    }, {\n        key: 'dispatch',\n        value: function dispatch(action) {\n            this._callbacks.forEach(function (cb) {\n                return cb(action);\n            });\n            this._pushLog(action);\n        }\n\n        // private methods\n        /**\n         * Добавлет информацию о текущем действии в\n         * логи\n         * @method\n         * @param {Object} action\n         */\n\n    }, {\n        key: '_pushLog',\n        value: function _pushLog(action) {\n            var logItem = {\n                date: Date.now(),\n                type: action.type\n            };\n\n            this._logsList.push(logItem);\n            this._printLog(logItem);\n        }\n\n        /**\n         *\n         * @param {Object} logItem\n         */\n\n    }, {\n        key: '_printLog',\n        value: function _printLog(logItem) {\n            if (this._logEl !== null) {\n                this._printLogToDOM(logItem);\n            }\n\n            if (this._isConsoleLog) {\n                this._printLogToConsole();\n            }\n        }\n\n        /**\n         * Добавляет информацию о передаваемом дествии\n         * в контейнер логов в DOM\n         * @method\n         * @param {Object} logItem\n         */\n\n    }, {\n        key: '_printLogToDOM',\n        value: function _printLogToDOM(logItem) {\n            var el = document.createElement('p');\n\n            el.innerText = this._genLogString(logItem);\n            this._logEl.appendChild(el);\n        }\n\n        /**\n         * Добавляет информацию о передаваемом дествии\n         * в контейнер логов в DOM\n         * @method\n         * @param {Object} logItem\n         */\n\n    }, {\n        key: '_printLogToConsole',\n        value: function _printLogToConsole(logItem) {\n            console.log(this._genLogString(logItem));\n        }\n\n        /**\n         * Возвращает строку с информацией\n         * о текущем действии\n         * @param {Object} logItem\n         * @return {String}\n         */\n\n    }, {\n        key: '_genLogString',\n        value: function _genLogString(logItem) {\n            var strDate = new Date(logItem.date).toISOString();\n\n            return strDate + ' Type: ' + logItem.type;\n        }\n    }]);\n\n    return Dispatcher;\n}();\n\nmodule.exports = Dispatcher;\n\n//# sourceURL=webpack:///./src/core/dispatcher.js?");

/***/ }),

/***/ "./src/core/store.js":
/*!***************************!*\
  !*** ./src/core/store.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Представляет Store сущность\n * в flux архитектуре.\n * @class\n */\nvar Store = function () {\n    /**\n     * @constructor\n     * @param {Object} state - init объект с данными\n     * @param {[Object]} observers - наблюдатели за хранилищем\n     */\n    function Store(state, observers) {\n        _classCallCheck(this, Store);\n\n        this._observers = observers || [];\n        this._state = state || {};\n        this._actionsWithResponse = {};\n    }\n\n    // public methods\n\n    /**\n     * Возвращает текущее состояние\n     * хранилища\n     * @method\n     * @return {Object}\n     */\n\n\n    _createClass(Store, [{\n        key: \"get\",\n        value: function get() {\n            return this._state;\n        }\n\n        /**\n         * Устанавливает новое состояние хранилища\n         * @method\n         * @param {Object} state\n         */\n\n    }, {\n        key: \"setState\",\n        value: function setState(state) {\n            this._state = state;\n        }\n\n        /**\n         * Проверяет, подписано ли хранилище\n         * на передаваемое действие и если подписано\n         * выполняет соответсвующие действия\n         * @method\n         * @param {Object} action\n         */\n\n    }, {\n        key: \"reduce\",\n        value: function reduce(action) {\n            var responses = this._actionsWithResponse;\n\n            if (responses.hasOwnProperty(action.type)) {\n                responses[action.type].call(this, action.payload);\n                this._notifyObservers();\n            }\n        }\n\n        /**\n         * Подписывает Представление на\n         * и изменение состояния хранилища,\n         * при этом представление должно\n         * иметь метод update()\n         * @method\n         * @param {Object} observer\n         * @return {Object}\n         */\n\n    }, {\n        key: \"subscribeView\",\n        value: function subscribeView(observer) {\n            if (observer.update) {\n                this._observers.push(observer.update.bind(observer));\n            }\n\n            return this;\n        }\n\n        /**\n         * Добавлет в хранилище ответы\n         * в виде каллбэков на заданные\n         * действия приложения\n         * @param {Object} data\n         * @return {Object}\n         */\n\n    }, {\n        key: \"defineResponse\",\n        value: function defineResponse(data) {\n            for (var key in data) {\n                if (data.hasOwnProperty(key)) {\n                    this._actionsWithResponse[key] = data[key];\n                }\n            }\n\n            return this;\n        }\n\n        // private methods\n\n        /**\n         * Уведомляет слушателей об изменении\n         * состояния хранилища\n         * @method\n         */\n\n    }, {\n        key: \"_notifyObservers\",\n        value: function _notifyObservers() {\n            var observers = this._observers;\n\n            observers.forEach(function (cb) {\n                return cb();\n            });\n        }\n    }]);\n\n    return Store;\n}();\n\n;\n\nmodule.exports = Store;\n\n//# sourceURL=webpack:///./src/core/store.js?");

/***/ }),

/***/ "./src/core/view.js":
/*!**************************!*\
  !*** ./src/core/view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar _require = __webpack_require__(/*! ../template/template */ \"./src/template/template.js\"),\n    genCodeWithData = _require.genCodeWithData;\n\n/**\n * Представляет View сущность\n * в flux архитектуре.\n */\n\n\nvar View = function () {\n    /**\n     * @constructor\n     * @param {Node} root\n     * @param {Object} store\n     * @param {String} temp\n     * @param {Object} events\n     */\n    function View(root, store, temp, events) {\n        _classCallCheck(this, View);\n\n        this._getData = store.get.bind(store);\n        this._temp = temp;\n        this._events = events;\n\n        this._node = document.querySelector(root);\n\n        this.update();\n    }\n\n    // public methods\n\n    /**\n     * Обновляет состояние Представления\n     * основываясь на данных Хранилища\n     * за которым наблюдает Представление\n     */\n\n\n    _createClass(View, [{\n        key: 'update',\n        value: function update() {\n            var data = this._getData();\n\n            var html = genCodeWithData(this._temp, data);\n            this._node.innerHTML = html;\n            this._initEvents();\n        }\n\n        // private methods\n\n        /**\n         * Инициализирует события для DOM элементов\n         */\n\n    }, {\n        key: '_initEvents',\n        value: function _initEvents() {\n            var _this = this;\n\n            var activeElements = this._node.querySelectorAll('[data-action]');\n\n            activeElements.forEach(function (el) {\n                var actionPairs = el.getAttribute('data-action').split(',');\n\n                actionPairs.forEach(function (pair) {\n                    var keyVal = pair.split('=');\n\n                    el.addEventListener(keyVal[0], _this._events[keyVal[1]]);\n                });\n            });\n        }\n    }]);\n\n    return View;\n}();\n\nmodule.exports = View;\n\n//# sourceURL=webpack:///./src/core/view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Dispatcher = __webpack_require__(/*! ./core/dispatcher */ \"./src/core/dispatcher.js\");\nvar Store = __webpack_require__(/*! ./core/store */ \"./src/core/store.js\");\nvar View = __webpack_require__(/*! ./core/view */ \"./src/core/view.js\");\n\nvar FluxDrone = {\n    Store: Store,\n    Dispatcher: Dispatcher,\n    View: View\n};\n\nconsole.log(FluxDrone);\n\nwindow.FluxDrone = FluxDrone;\n\nmodule.exports = FluxDrone;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/template/template.js":
/*!**********************************!*\
  !*** ./src/template/template.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Возвращает строку с подставленными\n * данными\n * @param {String} srcTemplate\n * @param {Object} data\n * @return {String}\n */\nfunction genCodeWithData(srcTemplate, data) {\n    var pattern = /{{(.*?)}}/g;\n    var matches = srcTemplate.match(pattern);\n    var html = srcTemplate;\n\n    matches.forEach(function (item) {\n        var val = null;\n        item = item.replace('{{', '');\n        item = item.replace('}}', '');\n\n        var itemPath = item.trim().split('.');\n        var obj = data;\n\n        for (var i = 0; i < itemPath.length; i++) {\n            obj = obj[itemPath[i]];\n        }\n\n        if (obj !== undefined) {\n            val = obj;\n        }\n\n        html = html.replace('{{' + item + '}}', val);\n    });\n\n    return html;\n}\n\nmodule.exports = { genCodeWithData: genCodeWithData };\n\n//# sourceURL=webpack:///./src/template/template.js?");

/***/ })

/******/ });