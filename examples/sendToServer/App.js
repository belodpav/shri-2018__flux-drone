const App = `
<h1>Архитектура приложения</h1>
<div class="view-stub">
    <div class="view-stub__input-block">
        <input
            data-action="input=onInput"
            class="view-stub__input"
        />
        <button
            data-action="click=sendToServer"
            class="view-stub__apply"
        >Отправить на сервер</button>
        <h3 data-deps="message, answer">
        You say: {{message}} server says: {{answer}}
        </h3>
    </div>
    <p
        data-deps="answer"
        class="view-stub__label"
    >{{answer}}</p>
</div>
`.trim();

window.App = App;
