const Util = {
    inherits(childClass, parentClass) {
        function Surrogate() {};
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return (Util.scale([Math.sin(deg), Math.cos(deg)], length));
    },
    scale(vec, mag) {
        return [Math.round(vec[0] * mag), Math.round(vec[1] * mag)];
    }
};

module.exports = Util;