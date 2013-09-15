function Interpreter (options){
    this.propertySelect = options.propertySelect || "#select";
    this.targetSelector = options.targetSelector || "#target";
    this.listening = {};
    this.current = null;
    this.player = options;
}

Interpreter.prototype.listen = function(){
    var _this = this;
    $(this.targetSelector).on('click', function(evt){
        var simple = _this.simplifyClick(evt);
        _this.assign(simple);
        if (_this.current){
            $(_this.propertySelect).val(_this.current);
            _this.player.triggerSelection(_this.current);
        }
    });
    $(this.targetSelector).on('select', function(evt){
        var simple = _this.simplifySelect(evt);
    });
};

Interpreter.prototype.simplifyClick = function (evt){
    var r = {};
    r.type = evt.type;
    r.x = Math.round(100*evt.offsetX/evt.target.offsetWidth);
    r.y = Math.round(100*evt.offsetY/evt.target.offsetHeight);
    if (r.x<5){
        r.borderLeft = true;
    } else if (r.x>95){
        r.borderRight = true;
    }
    if (r.y<5){
        r.borderTop = true;
    } else if (r.y>95){
        r.borderBottom = true;
    }
    if (r.borderBottom || r.borderLeft || r.borderRight || r.borderTop){
        r.borderClick = true;
    } else {
        r.middleClick = true;
    }
    if (r.borderBottom && r.borderLeft){
        r.cornerLeftBottom = true;
    } else if (r.borderBottom && r.borderRight){
        r.cornerRightBottom = true;
    } else if (r.borderTop && r.borderRight){
        r.cornerRightTop = true;
    } else if (r.borderTop && r.borderLeft){
        r.cornerLeftTop = true;
    }
    if (r.cornerLeftBottom || r.cornerRightBottom || r.cornerLeftTop || r.cornerRightTop){
        r.cornerClick = true;
    }
    return r;
};

Interpreter.prototype.simplifySelect = function (evt){
    var r = {};
    r.type = evt.type;
    return r;
};

Interpreter.prototype.add = function (name, conditions){
    this.listening[name] = conditions || {};
};

Interpreter.prototype.assign = function (simple){
    var _this = this;
    var a = _.filter(_.keys(this.listening), function(key){
        var conditions = _this.listening[key];
        return _.size(conditions) && _.every(conditions, function(value, name){
              return simple[name] == value;
        });
    });
    if (a) {
        this.current = a[(a.indexOf(this.current) + 1) % a.length];
    } else {
        this.current = null;
    }
    return this.current;
};


