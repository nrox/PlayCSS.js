
function PlayCSS(options){
    this.elements = {};
    this.pickers = {};
    this.menuSelector = "#selectors";
    this.targetSelector = "#target";
    _.extend(this, options || {});
    this.interpreter = new ClickInterpreter(this);
}

PlayCSS.prototype.add = function (name, picker, conditions){
    this.pickers[name] = picker;
    picker.prop = name;
    picker.player = this;
    this.interpreter.add(name, conditions);
};

PlayCSS.prototype.addButtons = function (){
    var _this = this;
    var $but = $("<tr />", {
    });
    var $button = $("<button />");
    $button.text("new");
    $button.on('click', function(){
        _this.addElement();
    });
    $but.append($button);

    $button = $("<button />");
    $button.text("delete");
    $button.on('click', function(){
        _this.removeElement();
    });
    $but.append($button);

    $("#buttons").append($but);

};

PlayCSS.prototype.build = function (){
    var _this = this;

    _.each(this.pickers, function(picker, property){

        var $propertyRow = $("<tr />", {
            propRow: property
        });

        var $madePicker = picker.make();

        $madePicker.on('change', function(){
            picker.value = $(this).val();
            $(picker.player.targetSelector).css(property, picker.value + picker.unit);
            $("[propValue='" + property + "']").text(picker.value + picker.unit);
        });

        var $tdPicker = $("<td />", {
            propPicker: property
        });
        $tdPicker.append($madePicker);
        $propertyRow.append($tdPicker);

        var $tdPropertyName = $("<td />", {
            propName: property
        });
        $tdPropertyName.text(property);
        $propertyRow.append($tdPropertyName);

        var $tdPropertyValue = $("<td />", {
            propValue: property
        });
        $tdPropertyValue.text(picker.value + (picker.unit || ""));
        $propertyRow.append($tdPropertyValue);

        $(_this.menuSelector).append($propertyRow);
    });
    $(this.targetSelector).css(this.toJSON());
    this.interpreter.listen();
};

PlayCSS.prototype.toJSON = function (){
    var json = {};
    _.each(this.pickers, function(picker, name){
        json[name] = picker.value + picker.unit;
    });
    return json;
};

PlayCSS.prototype.saveJSON = function (){
    var json = {};
    _.each(this.pickers, function(picker, name){
        json[name] = "" + picker.value;
    });
    return json;
};

PlayCSS.prototype.fromJSON = function (json){
    _.each(this.pickers, function(picker, name){
        picker.setValue(json[name]);
    });
};

PlayCSS.prototype.setTarget = function (selector){
    var json = this.saveJSON();
    this.elements[this.targetSelector] = json;
    this.targetSelector = selector;
    if (this.elements[this.targetSelector]){
        this.fromJSON(this.elements[this.targetSelector]);
    } else {
        $(this.targetSelector).css(json);
    }
};

PlayCSS.prototype.addElement = function(){
    var e = $("<div />", {
            'class': 'element',
            contenteditable: "true",
            id: "el" + ("" + Math.random()).substr(-6)
    });
    var _this = this;
    e.text("new");
    e.click(function(evt){
        _this.setTarget("#" + $(evt.target).attr("id"));
    });
    $("body").append(e);
};

PlayCSS.prototype.removeElement = function(){
    $(this.targetSelector).remove();
};

