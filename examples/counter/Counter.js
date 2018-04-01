const Counter = `
<button data-action="click=decrease" class="button button_type_inc">-</button>
    <span class="label" data-deps="count">{{count}}</span>
<button data-action="click=increase" class="button button_type_dec">+</button>
`.trim();

window.Counter = Counter;
