
function PlayCSS(options){
    this.pickers = {};
    this.propertySelect = "#select";
    this.targetSelector = "#target";
    this.valueSelector = "#pv";
    this.valueTextSelector = "#valueText";
    this.valueContainerSelector = "#value";
    _.extend(this, options || {});
    this.interpreter = new Interpreter(this);
    this.lastClick = Date.now();
}

PlayCSS.prototype.add = function (name, picker, conditions){
    _.extend(picker, _.pick(this, 'valueSelector', 'valueContainerSelector', 'targetSelector'));
    this.pickers[name] = picker;
    picker.targetSelector = this.targetSelector;
    this.interpreter.add(name, conditions);
};

PlayCSS.prototype.show = function (prop){
    $(this.valueSelector).remove();
    this.pickers[prop].show();
    var _this = this;
    $(this.valueSelector).unbind('change');
    if (this.pickers[prop].value===undefined){
        $(this.valueTextSelector).text("");
    } else {
        $(this.valueTextSelector).text("" + this.pickers[prop].value + (this.pickers[prop].unit || ""));
    }
    $(this.valueSelector).on('change', function(evt){
        var val = ($(evt.target).val());
        var unit = _this.pickers[prop].unit || "";
        _this.applyToTarget(prop, val + unit);
        $(_this.valueTextSelector).text(val + unit);
    });
};

PlayCSS.prototype.applyToTarget = function (prop, value){
    this.pickers[prop].value = value;
    $(this.targetSelector).css(prop, value);
};

PlayCSS.prototype.toList = function (){
    return _.keys(this.pickers);
};

PlayCSS.prototype.toSelectOptions = function (){
    return _.map(this.toList(), function(name){
        return "<li value='" + name + "'>" + name + "</li>";
    }).join("\n");
};

PlayCSS.prototype.markSelection = function (evt){
    if ($(evt.target).context.nodeName !== 'LI') return;
    var prop = ($(evt.target).text());
    $(evt.target).siblings().removeClass("selected");
    $(evt.target).addClass("selected");
    this.show(prop);
};

PlayCSS.prototype.triggerSelection = function (prop){
    var sel = "[value='" + prop + "']";
    $(sel).siblings().removeClass("selected");
    $(sel).addClass("selected");
    this.show(prop);
};

PlayCSS.prototype.build = function (){
    var _this = this;
    $(this.propertySelect).on('mouseover', function (evt) {
        if ((Date.now()-_this.lastClick)<500) return;
        _this.markSelection(evt);
    });
    $(this.propertySelect).on('click', function (evt) {
        _this.lastClick = Date.now();
        _this.markSelection(evt);
    });
    $(this.propertySelect).html(this.toSelectOptions());
    this.interpreter.listen();
    $(this.targetSelector).css(this.toJSON());
};

PlayCSS.prototype.toJSON = function (){
    var json = {};
    _.each(this.pickers, function(picker, name){
        json[name] = picker.value + (picker.unit || "");
    });
    return json;
};
//--------- specific pickers

function ListPicker(value, list){
    this.value = value;
    this.list = list;
}

ListPicker.prototype.show = function(){
    var value = this.value;
    var html =  _.map(this.list, function(name){
        if (name===value){
            return "<option value='" + name + "' selected >" + name + "</option>";
        } else {
            return "<option value='" + name + "'>" + name + "</option>";
        }
    }).join("\n");
    $(this.valueContainerSelector).html('<select id="' + this.valueSelector.substr(1) + '">' + html + '</select>');
};

function ColorPicker(value){
    this.value = value;
}

ColorPicker.prototype.show = function(){
    var value = this.value || "#000000";
    var html = '<input id="' + this.valueSelector.substr(1) + '" type="color" value="' + value + '">';
    $(this.valueContainerSelector).html(html);
};

function RangePicker(value, min, max, unit){
    this.value = value;
    this.min = min;
    this.max = max;
    this.unit = unit || '';
}

RangePicker.prototype.show = function(){
    var value = "" + (this.value || "");
    value = value.replace(/[\D\.]/ig,"");
    var html;
    if (value!==undefined){
        html = '<input id="' + this.valueSelector.substr(1) + '" type="range" min="' + this.min + '" max="' + this.max + '" value="' + value + '" >';
    } else {
        html = '<input id="' + this.valueSelector.substr(1) + '" type="range" min="' + this.min + '" max="' + this.max + '">';
    }
    $(this.valueContainerSelector).html(html);
};

