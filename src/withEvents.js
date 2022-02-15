let events = {
    on(eventName, handler) {
        if (!this.__events) {
            this.__events = {};
        }

        if (!this.__events[eventName]) {
            this.__events[eventName] = [handler];
        } else {
            this.__events[eventName].push(handler);
        }
    },

    off(eventName, handler) {
        if (!this.__events) return;
        if (!this.__events[eventName]) return;

        this.__events[eventName] = this.__events[eventName].filter(h => h !== handler);
    },

    removeAllEvents() {
        this.__events = {};
    },

    trigger(eventName, ...args) {
        if (!this.__events) return;
        if (!this.__events[eventName]) return;

        this.__events[eventName].forEach((handler) => {
            handler(...args);
        });
    }
};

export default function (target) {
    Object.assign(target, events);
}
