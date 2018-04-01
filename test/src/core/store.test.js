const {assert} = require('chai');
const Store = require('../../../src/core/store');

describe('flux-dron/core/store', () => {
    const store = new Store({count: 0});

    it('Устанавливает и получает новое состояние хранилища', () => {
        store.setState({count: 228});

        assert.deepEqual(store.get(), {count: 228});
    });

    it('Подписывает представление на изменения хранилища', () => {
        const fakeView = {
            update() {
            }
        };
        const fakeView2 = {
            update() {
            }
        };
        const fakeView3 = { // Не валидное представление.
            hello() {
            }
        };

        store
        .subscribeView(fakeView)
        .subscribeView(fakeView2)
        .subscribeView(fakeView3);

        assert.lengthOf(store._observers, 2);
    });
});
