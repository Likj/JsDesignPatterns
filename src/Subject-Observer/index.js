var Event = (function() {
    var clientMapList = {},
        listen,
        remove,
        trigger;
    listen = function() {
        var key = Array.prototype.shift.apply(arguments);
        if (!clientMapList[key]) {
            clientMapList[key] = [];
        }
        clientMapList[key].push(arguments[0]);
    }    
    remove = function() {
        var key = Array.prototype.shift.apply(arguments);
        if (!clientMapList[key]) {
            return false;
        }
        if (arguments.length === 0) {
            clientMapList[key].length = 0;
        }
        if (arguments.length === 1) {
            clientMapList[key].forEach((fnItem, index) => {
                if (fnItem === arguments[0]) {
                    clientMapList[key].splice(index, 1)
                }
            });
        }
        // todo: 如果需要一次性 remove 同一个事件 的 多个响应函数
    }
    trigger = function () {
        let key = Array.prototype.shift.apply(arguments);
        let fns = clientMapList[key];
        if (!key) {
            return false
        }
        if (!fns || !fns.length) {
            return false;
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
    return {
        listen,
        remove,
        trigger
    }
})();

Event.listen('loginSuccess', nav = function(result) {
    console.log(result);
})
Event.listen('loginSuccess', nav2 = function(result) {
    console.log(result, 2);
})
Event.listen('loginSuccess', nav3 = function(result) {
    console.log(result, 3);
})
Event.listen('loginSuccess', nav4 = function(result) {
    console.log(result, 4);
})

Event.remove('loginSuccess', nav3)

Event.trigger('loginSuccess', '这个即使什么呢');

