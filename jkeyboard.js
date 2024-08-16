(function($) {
    var methods = {
        init: function(options) {
            var settings = $.extend({
				slidetime: 200,
				onKeyDown: function() {},
                onShow: function() {},
                onHide: function() {},
                onKeyPress: function() {}
            }, options);

            return this.each(function(){
                var $input = $(this);
                var $keyboard = (constructKeyboard() ? $('#jKeyboard') : null);
                var pendingAccent = '';

                var layouts = {
                    'abnt2': [
                        "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                        "{tab} q w e r t y u i o p ´ [ ]",
                        "a s d f g h j k l ç ~ {enter}",
                        "{shift} \\ z x c v b n m , . ; /",
                        "{accept} {space} {cancel}"
                    ],
                    'shift': [
                        '" ! @ # $ % ¨ & * ( ) _ + {bksp}',
                        "{tab} Q W E R T Y U I O P ` { }",
                        "A S D F G H J K L Ç ^ {enter}",
                        "{shift} | Z X C V B N M < > : ?",
                        "{accept} {space} {cancel}"
                    ]
                };

                var keyNames = {
                    '{bksp}': '<i class="fa-regular fa-arrow-left-long"></i> Bksp',
                    '{tab}': '<i class="fa-regular fa-arrow-right-arrow-left"></i> Tab',
                    '{enter}': '<i class="fa-light fa-arrow-turn-down-left"></i> Enter',
                    '{shift}': '<i class="fa-solid fa-up-long"></i> Shift',
                    '{space}': '<i class="fa-regular fa-dash"></i>',
                    '{accept}': '<i class="fa-light fa-check"></i> Concluir',
                    '{cancel}': '<i class="fa-light fa-xmark"></i> Cancelar'
                };

                var keyTypes = {
                    '{bksp}': 'bksp',
                    '{tab}': 'tab',
                    '{enter}': 'enter',
                    '{shift}': 'shift',
                    '{space}': 'space',
                    '{accept}': 'accept',
                    '{cancel}': 'cancel'
                };

                var accentedCharacters = {
                    '~': { 'a': 'ã', 'o': 'õ', 'A': 'Ã', 'O': 'Õ' },
                    '^': { 'a': 'â', 'e': 'ê', 'i': 'î', 'o': 'ô', 'u': 'û', 'A': 'Â', 'E': 'Ê', 'I': 'Î', 'O': 'Ô', 'U': 'Û' },
                    '`': { 'a': 'à', 'e': 'è', 'i': 'ì', 'o': 'ò', 'u': 'ù', 'A': 'À', 'E': 'È', 'I': 'Ì', 'O': 'Ò', 'U': 'Ù' },
                    '´': { 'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú', 'c': 'ç', 'A': 'Á', 'E': 'É', 'I': 'Í', 'O': 'Ó', 'U': 'Ú', 'C': 'Ç' },
                    '"': { 'a': 'ä', 'e': 'ë', 'i': 'ï', 'o': 'ö', 'u': 'ü', 'y': 'ÿ', 'A': 'Ä', 'E': 'Ë', 'I': 'Ï', 'O': 'Ö', 'U': 'Ü', 'Y': 'Ÿ' }
                };
				
				function constructKeyboard(){
					
					if($('#jKeyboard').length > 0){
						return true;
					}
					
					$container = $('<div id="jKeyboard" class="jkeyboard"></div>');
					
					$("body").append($container);
					
					$container.on('keydown', function(e){
                        settings.onKeyDown(e, $input);
                    });
					
					return true;
					
				}
				
                function createKeyboard(){
					
                    $keyboard.empty();

                    // Cria contêineres para cada layout
                    var abnt2Container = $('<div class="keyboard-layout abnt2-layout"></div>');
                    var shiftContainer = $('<div class="keyboard-layout shift-layout d-none"></div>');

                    // Popula o teclado com as teclas de cada layout
                    populateKeyboard(layouts['abnt2'], abnt2Container);
                    populateKeyboard(layouts['shift'], shiftContainer);

                    // Adiciona os contêineres ao teclado
                    $keyboard.append(abnt2Container);
                    $keyboard.append(shiftContainer);
                }

                function populateKeyboard(layout, container) {
                    for (var i = 0; i < layout.length; i++) {
                        var row = $('<div class="keyboard-row"></div>');
                        var keys = layout[i].split(' ');
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            var keyButton = $('<div class="navi key '+ (keyTypes[key] || key) +'"></div>').html(keyNames[key] || key).attr('data-key', key);
                            keyButton.on('click', function() {
                                var keyText = $(this).attr('data-key');
                                handleKeyPress(keyText);
                            });
                            row.append(keyButton);
                        }
                        container.append(row);
                    }
                }

                function handleKeyPress(keyText) {
                    if (keyText in accentedCharacters) {
                        pendingAccent = keyText;
                        $input.val($input.val() + keyText);
                    } else if (pendingAccent && accentedCharacters[pendingAccent][keyText]) {
                        $input.val($input.val().slice(0, -1) + accentedCharacters[pendingAccent][keyText]);
                        pendingAccent = '';
                    } else {
                        if (keyText === '{bksp}') {
                            $input.val($input.val().slice(0, -1));
                        } else if (keyText === '{space}') {
                            $input.val($input.val() + ' ');
                        } else if (keyText === '{enter}') {
                            $input.val($input.val() + '\n');
                        } else if (keyText === '{tab}') {
                            $input.val($input.val() + '\t');
                        } else if (keyText === '{accept}') {
                            hideKeyboard();
                        } else if (keyText === '{cancel}') {
                            $input.val('');
                            hideKeyboard();
                        } else if (keyText === '{shift}') {
                            toggleShift();
                        } else {
                            $input.val($input.val() + keyText);
                        }
                        pendingAccent = '';
                    }
                    settings.onKeyPress(keyText, $input);
                }

                function toggleShift() {
                    $('.abnt2-layout').toggleClass('d-none');
                    $('.shift-layout').toggleClass('d-none');
                }

                function showKeyboard(){
                    createKeyboard();
                    $keyboard.show();
                    settings.onShow();
					$keyboard.animate({bottom: 0}, settings.slidetime);
                }

                function hideKeyboard(){
					$keyboard.animate({bottom: '-25%'}, settings.slidetime, function(){
						$keyboard.hide();
					});
                    settings.onHide();
                }

                $input.data('keyboard', {
                    show: showKeyboard,
                    hide: hideKeyboard
                });
            });
        },
        show: function() {
            return this.each(function() {
                var $input = $(this);
                var data = $input.data('keyboard');
                if (data) {
                    data.show();
                }
            });
        },
        hide: function() {
            return this.each(function() {
                var $input = $(this);
                var data = $input.data('keyboard');
                if (data) {
                    data.hide();
                }
            });
        }
    };

    $.fn.jKeyboard = function(methodOrOptions) {
        if(methods[methodOrOptions]){
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        }else{
			return false;
        }
    };
})(jQuery);
