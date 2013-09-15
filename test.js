var pc = new PlayCSS({});

pc.add('border-radius', new RangePicker(10, 0, 100, 'px'),{cornerClick: true});
pc.add('border-width', new RangePicker(2, 0, 100, 'px'),{borderClick: true});
pc.add('border-color', new ColorPicker("#123456"),{borderClick: true});
pc.add('background-color', new ColorPicker("#ffffff"), {middleClick: true});
pc.add('border-style', new ListPicker('solid',['solid', 'none', 'dashed']),{borderClick: true});

pc.add('width', new RangePicker(70, 0, 100, '%'),{borderClick: true});
pc.add('height', new RangePicker(200, 10, 1000, 'px'),{borderClick: true});

pc.add('font-family', new ListPicker('sans-serif', ['monospace', 'sans-serif']), {middleClick: true});
pc.add('font-size', new RangePicker(2, 1, 10, 'em'), {middleClick: true});

pc.add('margin', new RangePicker(10, 0, 100, 'px'),{borderClick: true});
pc.add('padding', new RangePicker(5, 0, 100, 'px'),{borderClick: true});

pc.build();
pc.addButtons();

$(".element").click(function(evt){
    pc.setTarget("#" + $(evt.target).attr("id"));
});
