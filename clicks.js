function ClickInterpreter (options){
    this.targetSelector = options.targetSelector || "#target";
    this.listening = {};
    this.player = options;
}

ClickInterpreter.prototype.listen = function(){
    var _this = this;
    $(this.targetSelector).on('click', function(evt){
        var simple = _this.simplifyClick(evt);
        $("[propName]").removeClass("selected");
        var possible = _this.assign(simple);
        _.each(possible, function(prop){
            $("[propName='" + prop + "']").addClass("selected");
        });
    });
};

ClickInterpreter.prototype.simplifyClick = function (evt){
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

ClickInterpreter.prototype.simplifySelect = function (evt){
    var r = {};
    r.type = evt.type;
    return r;
};

ClickInterpreter.prototype.add = function (name, conditions){
    this.listening[name] = conditions || {};
};

ClickInterpreter.prototype.assign = function (simple){
    var _this = this;
    return _.filter(_.keys(this.listening), function(key){
        var conditions = _this.listening[key];
        return _.size(conditions) && _.every(conditions, function(value, name){
              return simple[name] == value;
        });
    });
};


