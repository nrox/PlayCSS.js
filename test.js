var pc = new PlayCSS({
    targetSelector: "#target",
    valueSelector: "#pv",
    valueContainerSelector: "#value"
});

pc.add('border-radius', new RangePicker(0, 100, 'px'));
pc.add('border-width', new RangePicker(0, 100, 'px'));
pc.add('border-color', new ColorPicker());
pc.add('background-color', new ColorPicker());
pc.add('border-style', new ListPicker(['solid', 'none', 'dashed']));
pc.add('width', new RangePicker(0, 1000, 'px'));
pc.add('height', new RangePicker(0, 1000, 'px'));

pc.add('font-family', new ListPicker(['monospace', 'sans-serif']));
pc.add('font-size', new RangePicker(1, 10, 'em'));

pc.add('margin', new RangePicker(0, 100, 'px'));
pc.add('padding', new RangePicker(0, 100, 'px'));


$('#select').on('change', function (evt) {
    var prop = ($(evt.target).val());
    pc.show(prop);
});

$('#select').html(pc.toSelectOptions());