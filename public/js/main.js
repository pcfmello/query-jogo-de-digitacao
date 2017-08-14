var frase = $('.frase').text();
var numeroPalavras = frase.split(' ').length;
var tamanhoFrase = $('.tamanho-frase');
tamanhoFrase.text(numeroPalavras);

var campoDigitacao = $('.campo-digitacao');
campoDigitacao.on('input', function() {
  var totalPalavras = $(this).val().split(/\S+/).length - 1; // Retira quaisquer espaços vazios do contador de palavras e substitui pelo length
  var totalCaracteres = $(this).val().length;

  $('#contador-palavras').text(totalPalavras);
  $('#contador-caracteres').text(totalCaracteres);
});
