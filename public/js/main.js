var frase = $('.frase').text();
var numeroPalavras = frase.split(' ').length;
var tamanhoFrase = $('#tamanho-frase');
tamanhoFrase.text(numeroPalavras);

var campoDigitacao = $('.campo-digitacao');
campoDigitacao.on('input', function() {
  var totalPalavras = $(this).val().split(/\S+/).length - 1; // Retira quaisquer espaços vazios do contador de palavras e substitui pelo length
  var totalCaracteres = $(this).val().length;

  $('#contador-palavras').text(totalPalavras);
  $('#contador-caracteres').text(totalCaracteres);
});

campoDigitacao.one('focus', function() { // .one => Executa apenas uma vez o evento
  var tempoDigitacao = $('#tempo-digitacao');
  var tempoRestante = tempoDigitacao.text();
  var cronometroId = setInterval(function() {
        tempoRestante--;
        tempoDigitacao.text(tempoRestante);
        if(tempoRestante < 1) {
            campoDigitacao.attr('disabled', true);
            tempoDigitacao.parent().text('Tempo encerrado!');
            clearInterval(cronometroId);
        }
    }, 1000);
});
