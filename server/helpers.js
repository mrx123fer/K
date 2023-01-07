const moment=require('moment')
moment.locale('es')
module.exports = {
    timeago: function (selected) {
        return moment(selected).startOf("minute").fromNow(); 
    },

    switch: function(value, options) {
        this._switch_value_ = value;
        this._switch_break_ = false;
        var html = options.fn(this);
        delete this._switch_break_;
        delete this._switch_value_;
        return html;
    },
    case: function(value, options) {
        var args = Array.prototype.slice.call(arguments);
        var options    = args.pop();
        var caseValues = args;

        if (this._switch_break_ || caseValues.indexOf(this._switch_value_) === -1) {
            return '';
        } else {
            if (options.hash.break === true) {
                this._switch_break_ = true;
            }
            return options.fn(this);
        }
    },
    default: function(options) {
        if (!this._switch_break_) {
            return options.fn(this);
        }
    },
    for:function(from, to, incr, block) {
        var accum = '';
        for(var i = from; i < to; i += incr)
            accum += block.fn(i);
        return accum;
    }, 
    ifE:function(conditional, options) {
        if (options.hash.desired === options.hash.type) {
          options.fn(this);
        } else {
          options.inverse(this);
        }
    }
};
