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
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Представляет dispatcher сущность\n * в flux архитектуре.\n * Имеет api для регистрации хранилищ\n * (stores) и отправки действия с\n * данными всем хранилищам\n * @class\n */\nvar Dispatcher = function () {\n    /**\n     * @constructor\n     * @param {Node} logEl - target DOM элемент для логов\n     * @param {Bool} isConsoleLog\n     */\n    function Dispatcher(logEl, isConsoleLog) {\n        _classCallCheck(this, Dispatcher);\n\n        this._callbacks = [];\n        this._logsList = []; // Массив с логами\n        this._isConsoleLog = isConsoleLog || false;\n\n        this._logEl = logEl || null;\n    }\n\n    // public methods\n    /**\n     * Регестрирует Хранилище в Диспетчере\n     * @method\n     * @param {function} store\n     */\n\n\n    _createClass(Dispatcher, [{\n        key: 'register',\n        value: function register(store) {\n            if (store && store.reduce) {\n                this._callbacks.push(store.reduce.bind(store));\n            } else {\n                throw Error('You have to pass correct store object!');\n            }\n        }\n\n        /**\n         * Отправляет Объект с действием всем подписанным\n         * хранилищам\n         * @method\n         * @param {Object} action\n         */\n\n    }, {\n        key: 'dispatch',\n        value: function dispatch(action) {\n            this._callbacks.forEach(function (cb) {\n                return cb(action);\n            });\n            this._pushLog(action);\n        }\n\n        // private methods\n        /**\n         * Добавлет информацию о текущем действии в\n         * логи\n         * @method\n         * @param {Object} action\n         */\n\n    }, {\n        key: '_pushLog',\n        value: function _pushLog(action) {\n            var logItem = {\n                date: Date.now(),\n                type: action.type\n            };\n\n            this._logsList.push(logItem);\n            this._printLog(logItem);\n        }\n\n        /**\n         *\n         * @param {Object} logItem\n         */\n\n    }, {\n        key: '_printLog',\n        value: function _printLog(logItem) {\n            if (this._logEl !== null) {\n                this._printLogToDOM(logItem);\n            }\n\n            if (this._isConsoleLog) {\n                this._printLogToConsole(logItem);\n            }\n        }\n\n        /**\n         * Добавляет информацию о передаваемом дествии\n         * в контейнер логов в DOM\n         * @method\n         * @param {Object} logItem\n         */\n\n    }, {\n        key: '_printLogToDOM',\n        value: function _printLogToDOM(logItem) {\n            var el = document.createElement('p');\n\n            el.innerText = this._genLogString(logItem);\n            this._logEl.appendChild(el);\n        }\n\n        /**\n         * Добавляет информацию о передаваемом дествии\n         * в контейнер логов в DOM\n         * @method\n         * @param {Object} logItem\n         */\n\n    }, {\n        key: '_printLogToConsole',\n        value: function _printLogToConsole(logItem) {\n            console.log(this._genLogString(logItem));\n        }\n\n        /**\n         * Возвращает строку с информацией\n         * о текущем действии\n         * @param {Object} logItem\n         * @return {String}\n         */\n\n    }, {\n        key: '_genLogString',\n        value: function _genLogString(logItem) {\n            var strDate = new Date(logItem.date).toISOString();\n\n            return strDate + ' Type: ' + logItem.type;\n        }\n    }]);\n\n    return Dispatcher;\n}();\n\nmodule.exports = Dispatcher;\n\n//# sourceURL=webpack:///./src/core/dispatcher.js?");

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
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar _require = __webpack_require__(/*! ../template/template */ \"./src/template/template.js\"),\n    tempEngine = _require.tempEngine;\n\nvar _require2 = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\"),\n    getID = _require2.getID;\n\n/**\n * Представляет View сущность\n * в flux архитектуре.\n */\n\n\nvar View = function () {\n    /**\n     * @constructor\n     * @param {Node} root\n     * @param {Object} store\n     * @param {String} temp\n     * @param {Object} events\n     */\n    function View(root, store, temp, events) {\n        _classCallCheck(this, View);\n\n        this._getData = store.get.bind(store);\n        this._temp = temp;\n        this._events = events;\n\n        this._node = document.querySelector(root);\n        this._srcNode = document.createElement('div');\n\n        this._init();\n    }\n\n    // public methods\n\n    /**\n     * Обновляет состояние Представления\n     * основываясь на данных Хранилища\n     * за которым наблюдает Представление\n     * Обновляем только те элементы, которые\n     * завязаны на получение данных из хранилища\n     */\n\n\n    _createClass(View, [{\n        key: 'update',\n        value: function update() {\n            var _this = this;\n\n            var data = Object.assign({}, this._getData());\n            var keys = Object.keys(data);\n\n            keys.filter(function (key) {\n                return data[key] !== _this._curState[key];\n            }).forEach(function (key) {\n                return _this._updateNodeAll(key, data[key]);\n            });\n\n            this._curState = Object.assign({}, data);\n        }\n\n        // private methods\n\n        /**\n         * Инициализирует Представление\n         */\n\n    }, {\n        key: '_init',\n        value: function _init() {\n            var data = this._getData();\n\n            this._srcNode.innerHTML = this._temp;\n            this._node.innerHTML = tempEngine(this._temp, data);\n\n            this._curState = Object.assign({}, data);\n\n            this._initEvents(this._node);\n            this._buildDepsTree();\n        }\n\n        /**\n         * Обновляет все DOM элементы\n         * зависимые от ключа key\n         * @param {String} key\n         * @param {*} val\n         */\n\n    }, {\n        key: '_updateNodeAll',\n        value: function _updateNodeAll(key, val) {\n            var _this2 = this;\n\n            var elements = this._depsTree;\n\n            elements.forEach(function (el) {\n                if (el.keys.indexOf(key) !== -1) {\n                    var parent = el.parent;\n                    var newNode = _this2._updateNode(el.temp);\n\n                    el.real = _this2._replaceNode(el.real, newNode);\n\n                    _this2._initEvents(parent);\n                }\n            });\n        }\n\n        /**\n         * Возвращает новый Node\n         * построенный на шаблоне\n         * но еще не вставленный в DOM\n         * @param {Node} el\n         * @return {Node}\n         */\n\n    }, {\n        key: '_updateNode',\n        value: function _updateNode(el) {\n            var node = {\n                tempHTML: el.outerHTML,\n                wrap: document.createElement('div')\n            };\n\n            node.wrap.innerHTML = tempEngine(node.tempHTML, this._getData());\n\n            return node.wrap.firstChild;\n        }\n\n        /**\n         *  Возвращает ссылку на обновленный DOM\n         *  элемент\n         * @param {Node} oldNode\n         * @param {Node} newNode\n         * @return {Node}\n         */\n\n    }, {\n        key: '_replaceNode',\n        value: function _replaceNode(oldNode, newNode) {\n            var id = getID();\n            newNode.setAttribute('data-key', id);\n\n            oldNode.replaceWith(newNode);\n\n            var newRealNode = this._node.querySelector('[data-key=\"' + id + '\"]');\n\n            newRealNode.removeAttribute('data-key');\n\n            return newRealNode;\n        }\n\n        /**\n         *  Строит дерево зависимостей DOM\n         *  эелементов от полей состояния хранилища\n         */\n\n    }, {\n        key: '_buildDepsTree',\n        value: function _buildDepsTree() {\n            var depsTree = [];\n            var depsTemp = this._srcNode.querySelectorAll('[data-deps]');\n            var deps = this._node.querySelectorAll('[data-deps]');\n\n            deps.forEach(function (el, i) {\n                var keys = el.getAttribute('data-deps').split(',');\n\n                depsTree.push({\n                    keys: keys.map(function (key) {\n                        return key.trim();\n                    }),\n                    real: el,\n                    temp: depsTemp[i]\n                });\n            });\n\n            this._depsTree = depsTree;\n        }\n        /**\n         * Инициализирует события для DOM элементов\n         * внутри элемента elem\n         * @param {Node} elem\n         */\n\n    }, {\n        key: '_initEvents',\n        value: function _initEvents(elem) {\n            var _this3 = this;\n\n            if (!elem) return;\n            var activeElements = elem.querySelectorAll('[data-action]');\n\n            activeElements.forEach(function (el) {\n                var actionPairs = el.getAttribute('data-action').split(',');\n\n                actionPairs.forEach(function (pair) {\n                    var keyVal = pair.split('=');\n\n                    el.addEventListener(keyVal[0], _this3._events[keyVal[1]]);\n                });\n            });\n        }\n    }]);\n\n    return View;\n}();\n\nmodule.exports = View;\n\n//# sourceURL=webpack:///./src/core/view.js?");

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Возвращает уникальный id\n * @return {*}\n */\nfunction getID() {\n    return Date.now();\n};\n\nmodule.exports = {\n    getID: getID\n};\n\n//# sourceURL=webpack:///./src/helpers/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Dispatcher = __webpack_require__(/*! ./core/dispatcher */ \"./src/core/dispatcher.js\");\nvar Store = __webpack_require__(/*! ./core/store */ \"./src/core/store.js\");\nvar View = __webpack_require__(/*! ./core/view */ \"./src/core/view.js\");\n\nvar FluxDrone = {\n    Store: Store,\n    Dispatcher: Dispatcher,\n    View: View\n};\n\nwindow.FluxDrone = FluxDrone;\n\nmodule.exports = FluxDrone;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/template/template.js":
/*!**********************************!*\
  !*** ./src/template/template.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Возвращает строку с подставленными\n * данными\n * @param {String} srcTemplate\n * @param {Object} data\n * @return {String}\n */\nfunction tempEngine(srcTemplate, data) {\n    var pattern = /{{(.*?)}}/g;\n    var matches = srcTemplate.match(pattern);\n    var html = srcTemplate;\n\n    matches.forEach(function (item) {\n        var val = null;\n        item = item.replace('{{', '');\n        item = item.replace('}}', '');\n\n        var itemPath = item.trim().split('.');\n        var obj = data;\n\n        for (var i = 0; i < itemPath.length; i++) {\n            obj = obj[itemPath[i]];\n        }\n\n        if (obj !== undefined) {\n            val = obj;\n        }\n\n        html = html.replace('{{' + item + '}}', val);\n    });\n\n    return html;\n}\n\nmodule.exports = { tempEngine: tempEngine };\n\n//# sourceURL=webpack:///./src/template/template.js?");

/***/ })

/******/ });