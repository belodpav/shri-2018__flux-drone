const {assert} = require('chai');
const {tempEngine} = require('../../../src/template/template');

describe('flux-dron/templating', () => {
    it('Подставляет значение переменной в шаблон', () => {
        const srcTmp = `
            <div class="block">
                <h2 class="block__title">{{title}}</h2>
                <span>This is a block</span>
            </div>
        `.trim();
        const expectedResult = `
            <div class="block">
                <h2 class="block__title">World</h2>
                <span>This is a block</span>
            </div>
        `.trim();

        const data = {
            title: 'World'
        };

        const htmlResult = tempEngine(srcTmp, data);

        assert.equal(expectedResult, htmlResult);
    });

    it('Подставляет значение переменной в шаблон'
        + ' при разной глубине объекта с данными', () => {
        const srcTmp = `
            <div class="block">
                <h2 class="block__title">{{block.title}}</h2>
                <span>Number {{number}}</span>
            </div>
        `.trim();
        const expectedResult = `
            <div class="block">
                <h2 class="block__title">World</h2>
                <span>Number 42</span>
            </div>
        `.trim();

        const data = {
            block: {
                title: 'World'
            },
            number: 42
        };

        const htmlResult = tempEngine(srcTmp, data);

        assert.equal(expectedResult, htmlResult);
    });
});
