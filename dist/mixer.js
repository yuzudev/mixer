"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mix = void 0;
function yankProps(a, b) {
    // when {}.__proto__.__proto__ just don't asign any props
    if (Object.getPrototypeOf(b) == null) {
        return;
    }
    // yank the rest of the props
    const props = Object.getOwnPropertyDescriptors(b);
    Object.defineProperties(a, props);
}
function applySuper(struct, b) {
    yankProps(struct.prototype, b);
    if (b.__proto__)
        applySuper(struct, b.__proto__);
    return struct;
}
function apply(struct, b) {
    yankProps(struct.prototype, b.prototype);
    if (b.__proto__.prototype)
        applySuper(struct, b.__proto__.prototype);
    return struct;
}
function mix(structToApply, struct, 
// @ts-ignore fix
ignore) {
    return apply(struct, structToApply);
}
exports.mix = mix;
