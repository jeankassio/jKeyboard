# jKeyboard
O jKeyboard é um plugin jQuery que oferece um teclado virtual incrivelmente leve, rápido e simples, projetado para maximizar a eficiência tanto em dispositivos atuais quanto em dispositivos antigos.  
O plugin está disponível no layout ABNT2, e é ideal para o uso em Smart TV's ou em sistemas que necessitam de um teclado virtual no formato brasileiro.

## Características
* Leve, Rápido e Prático: Desenvolvido para ser um dos teclados virtuais mais eficientes;
* Versão ABNT2: Suporte completo ao layout brasileiro ABNT2;
* Integração Simples: Fácil de integrar em qualquer projeto que utilize jQuery;
* Customizável: Permite ajustes e personalizações para melhor atender às necessidades do seu projeto;
* Compatível com Smart TV's: Compatibilidade de CSS2 e EcmaScript 5.

## Instalação
Você pode instalar o jKeyboard de duas maneiras:

### Via CDN
Adicione o CSS no <head>,  
Adicione o JS antes do fechamento do <body>:
```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jeankassio/jKeyboard@main/jkeyboard.min.css">
  <script src="https://cdn.jsdelivr.net/gh/jeankassio/jKeyboard@main/jkeyboard.min.js"></script>
```

### Via Download
1. Baixe os arquivos jkeyboard.min.js e jkeyboard.min.css, ou as versões não-minificadas;
2. Adicione os arquivos ao seu projeto:

```html
  <link rel="stylesheet" href="./assets/css/jkeyboard.min.css">
  <script src="./assets/js/jkeyboard.min.js"></script>
```

## Como Usar:
Após a instalação, você pode configurar o plugin da seguinte forma:
```js
$('.keyboard').jKeyboard();
```

## Opções e Eventos
jKeyboard conta com poucas modificações para que o resultado final seja um teclado virtual leve e prático.  
Somente as opções e eventos realmente necessários estão presentes.  
```js
$('.keyboard').jKeyboard({
  slidetime: 200, //Velocidade do jQuery.animate destinado a abrir e fechar o teclado
  onKeyDown: function(e, $input){
    //Retorna o evento keydown juntamente com o input de texto vinculado ao jKeyboard no momento da chamada.
    var code = e.which || e.keyCode;
    console.log(code);
    console.log($input.val());
  },
  onShow: function(){
    //Chamado logo após o teclado estar visível
    console.log("Teclado aberto");
},
  onHide: function(){
    //Chamado logo após o teclado ficar oculto
    console.log("Teclado fechado");
  },
  onKeyPress: function(key, $input){
    //Chamado quando uma tecla do jKeyboard é clicada, retornando a letra e o input vinculado ao jKeyboard no momento.
    //Teclas especiaís são retornadas entre chaves, elas são: {bksp}, {tab}, {enter}, {shift}, {space}, {accept}, {cancel}.
    //Exemplo de uso abaixo:

    switch(key){
			
      case "{enter}":{
					
        if($input.val().length > 0){
						
          $input.jKeyboard('hide');
						
          var ev = jQuery.Event("keydown");
          ev.which = 13;
          setTimeout(function(){
            $input.trigger(ev);
          }, 210);
						
        }
					
        break;
      }
			
      case "{shift}":{
          setTimeout(function(){
            $(".key.shift").focus();
          }, 10);
        break;
      }
			
    }
		
  }
});
```

## Suporte e Contribuição
Se você encontrar algum problema ou tiver sugestões de melhorias e novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
