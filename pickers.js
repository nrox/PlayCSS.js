
function ListPicker(value, list){
    this.value = value;
    this.list = list;
    this.unit = '';
}

ListPicker.prototype.make = function(){
    var value = this.value || "";
    var html =  _.map(this.list, function(name){
        if (name===value){
            return "<option value='" + name + "' selected >" + name + "</option>";
        } else {
            return "<option value='" + name + "'>" + name + "</option>";
        }
    }).join("\n");
    html = '<select>' + html + '</select>';
    html = $(html);
    this.element = html;
    return html;
};

ListPicker.prototype.setValue = function(val){
    this.value = val;
    this.element.val(val);
};

function ColorPicker(value){
    this.value = value;
    this.unit = '';
}

ColorPicker.prototype.make = function(){
    var value = this.value || "#000000";
    var html = '<input type="color" value="' + value + '">';
    html = $(html);
    this.element = html;
    return html;
};

ColorPicker.prototype.setValue = function(val){
    this.value = val;
    this.element.val(val);
};


function RangePicker(value, min, max, unit){
    this.value = value;
    this.min = min;
    this.max = max;
    this.unit = unit || '';
}

RangePicker.prototype.make = function(){
    var value = "" + (this.value || "");
    var html;
    if (value!==undefined){
        html = '<input type="range" step="0.1" min="' + this.min + '" max="' + this.max + '" value="' + value + '" >';
    } else {
        html = '<input type="range" step="0.1" min="' + this.min + '" max="' + this.max + '">';
    }
    html = $(html);
    this.element = html;
    return html;
};

RangePicker.prototype.setValue = function(val){
    this.value = val;
    this.element.val(val);
};

