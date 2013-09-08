
function PlayCSS(options){
    this.cssProperties = {};
    this.targetSelector = "#target";
    this.valueSelector = "#pv";
    this.valueContainerSelector = "#value";
    _.extend(this, options || {});
}

PlayCSS.prototype.add = function (name, picker){
    _.extend(picker, _.pick(this, 'valueSelector', 'valueContainerSelector', 'targetSelector'));
    this.cssProperties[name] = picker;
};

PlayCSS.prototype.show = function (name){
    $(this.valueSelector).remove();
    this.cssProperties[name].show();
    var _this = this;
    $(this.valueSelector).on('change', function(evt){
        var val = ($(evt.target).val());
        var unit = _this.cssProperties[name].unit || "";
        _this.applyToTarget(name, val + unit);
    });
};

PlayCSS.prototype.toList = function (){
    return _.keys(this.cssProperties);
};

PlayCSS.prototype.toSelectOptions = function (){
    return _.map(this.toList(), function(name){
          return "<option value='" + name + "'>" + name + "</option>";
    }).join("\n");
};


PlayCSS.prototype.applyToTarget = function (prop, value){
    $(this.targetSelector).css(prop, value);
};

//--------- specific pickers

function ListPicker(list){
    this.list = list;
}

ListPicker.prototype.show = function(){
    var html =  _.map(this.list, function(name){
        return "<option value='" + name + "'>" + name + "</option>";
    }).join("\n");
    $(this.valueContainerSelector).html('<select id="' + this.valueSelector.substr(1) + '">' + html + '</select>');
};

function ColorPicker(){

}

ColorPicker.prototype.show = function(){
    var html = '<input id="' + this.valueSelector.substr(1) + '" type="color">';
    $(this.valueContainerSelector).html(html);
};

function RangePicker(min, max, unit){
    this.min = min;
    this.max = max;
    this.unit = unit || '';
}

RangePicker.prototype.show = function(){
    var html = '<input id="' + this.valueSelector.substr(1) + '" type="range" min="' + this.min + '" max="' + this.max + '">';
    $(this.valueContainerSelector).html(html);
};

