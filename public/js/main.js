var fimJogo = $('.fim-do-jogo');
var contadorPalavra = $('#contador-palavras');
var contadorCaracteres = $('#contador-caracteres');
var campoDigitacao = $('.campo-digitacao');
var tempoDigitacao = $('#tempo-digitacao');
var botaoReiniciar = $('#botao-reiniciar');
var contadores = $('.contadores');
var tempoInicial;

/* atalho para $(document).ready */
$(function() {
  tempoInicial = tempoDigitacao.text();
  fimJogo.hide();
  inicializaFrase();
  inicializaContadores();
  inicializaCronometro();
  botaoReiniciar.click(function() { reiniciaJogo(); });
});

function inicializaFrase() {
  var frase = $('.frase').text();
  var numeroPalavras = frase.split(' ').length;
  var tamanhoFrase = $('#tamanho-frase');
  tamanhoFrase.text(numeroPalavras);
}

function inicializaContadores() {
  campoDigitacao.on('input', function() {
    var totalPalavras = $(this).val().split(/\S+/).length - 1; // Retira quaisquer espaços vazios do contador de palavras e substitui pelo length
    var totalCaracteres = $(this).val().length;
    contadorPalavra.text(totalPalavras);
    contadorCaracteres.text(totalCaracteres);
  });
}

function inicializaCronometro() {
  botaoReiniciar.attr('disabled', true).addClass('disabled');
  campoDigitacao.one('focus', function() { // .one => Executa apenas uma vez o evento
    var tempoRestante = tempoDigitacao.text();
    var cronometroId = setInterval(function() {
          tempoRestante--;
          tempoDigitacao.text(tempoRestante);
          if(tempoRestante <= 3) {
            tempoDigitacao.parent().addClass('red-text text-darken-4');
          }
          if(tempoRestante < 1) {
              campoDigitacao.attr('disabled', true);
              fimJogo.show();
              contadores.addClass('aumenta-fonte');
              botaoReiniciar.attr('disabled', false).removeClass('disabled');
              clearInterval(cronometroId);
          }
      }, 1000);
  });
}

function reiniciaJogo() {
  fimJogo.hide();
  campoDigitacao.attr('disabled', false);
  campoDigitacao.val('');
  tempoDigitacao.text(tempoInicial);
  contadorPalavra.text(0);
  contadorCaracteres.text(0);
  tempoDigitacao.parent().removeClass('red-text text-darken-4');
  contadores.removeClass('aumenta-fonte');
  inicializaCronometro();
}
