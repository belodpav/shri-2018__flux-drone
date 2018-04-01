const Dispatcher = require('./core/dispatcher');
const Store = require('./core/store');
const View = require('./core/view');

const FluxDrone = {
    Store: Store,
    Dispatcher: Dispatcher,
    View: View
};

window.FluxDrone = FluxDrone;

module.exports = FluxDrone;
