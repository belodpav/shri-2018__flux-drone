const {assert} = require('chai');
const Dispatcher = require('../../../src/core/dispatcher');

describe('flux-dron/core/dispatcher', () => {
    const disp = new Dispatcher();
    const fakeStore = {
        _state: {},
        reduce() {
        }
    };
    const fakeStore2 = {
        _state: {},
        reduce() {
        }
    };

    // Регестрируем хранилища
    disp.register(fakeStore);
    disp.register(fakeStore2);

    it('Регестрирует хранилище в диспатчере', () => {
        assert.lengthOf(disp._callbacks, 2);
    });

    it('Добавляет иформацию о событии в контейнер логов', () => {
        disp.dispatch({type: 'ADD_ITEM', payload: 'test'});
        assert.lengthOf(disp._logsList, 1);
    });
});
