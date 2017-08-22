var fimJogo = $('.fim-do-jogo');
var contadorPalavra = $('#contador-palavras');
var campoDigitacao = $('.campo-digitacao');
var tempoDigitacao = $('#tempo-digitacao');
var botaoReiniciar = $('#botao-reiniciar');
var caixaTextarea = $('.caixa-textarea');
var frase = $('.frase');
var placar = $('.placar');
var tempoInicial;

/* atalho para $(document).ready */
$(function() {
  tempoInicial = tempoDigitacao.text();
  fimJogo.hide();
  inicializaFrase();
  inicializaRegraDeComparacao();
  inicializaContadores();
  inicializaCronometro();
  botaoReiniciar.click(function() { reiniciaJogo(); });

  $('#placar-eletronico').modal();
});



function inicializaContadores() {
  campoDigitacao.on('input', function() {
    var totalPalavras = $(this).val().split(/\S+/).length - 1; // Retira quaisquer espaços vazios do contador de palavras e substitui pelo length
    var totalCaracteres = $(this).val().length;
    contadorPalavra.text(totalPalavras);
  });
}

function inicializaCronometro() {
  botaoReiniciar.attr('disabled', true).toggleClass('disabled');
  campoDigitacao.one('focus', function() { // .one => Executa apenas uma vez o evento
    var tempoRestante = tempoDigitacao.text();
    var cronometroId = setInterval(function() {
          tempoRestante--;
          tempoDigitacao.text(tempoRestante);
          if(tempoRestante == 3) {
            destacaTempo();
          }
          if(tempoRestante < 1) {
              finalizaJogo();
              clearInterval(cronometroId);event
          }
      }, 1000);
  });
}

function finalizaJogo() {
  campoDigitacao.attr('disabled', true);
  fimJogo.show();
  campoDigitacao.removeClass('red-text text-darken-4');
  botaoReiniciar.attr('disabled', false).toggleClass('disabled');
  inserePlacar('Paulo Cesar', contadorPalavra.text());
}

function destacaTempo() {
  tempoDigitacao.parent().addClass('red-text text-darken-4');
  campoDigitacao.addClass('red-text text-darken-4');
}

function inicializaRegraDeComparacao() {
  var fraseCompleta = frase.text().trim();
  campoDigitacao.on('input', function() {
    var termoDigitado = $(this).val();
    var termoParaComparar = fraseCompleta.substr(0, termoDigitado.length);
    /* No ECMAScript 6, pode ser substituido por:
     var termoParaComparar = fraseCompleta.startsWith(termoDigitado); */

    if(termoDigitado !== termoParaComparar) {
      caixaTextarea.addClass('frase-errada');
      caixaTextarea.removeClass('frase-certa');
    } else {
      caixaTextarea.addClass('frase-correta');
      caixaTextarea.removeClass('frase-errada');
    }

    if(termoDigitado.length < 1) {
      caixaTextarea.removeClass('frase-correta');
      caixaTextarea.removeClass('frase-errada');
    }
  });
}

function reiniciaJogo() {event
  fimJogo.hide();
  campoDigitacao.attr('disabled', false);
  campoDigitacao.val('');
  tempoDigitacao.text(tempoInicial);
  contadorPalavra.text(0);
  tempoDigitacao.parent().removeClass('red-text text-darken-4');
  caixaTextarea.removeClass('frase-correta');
  caixaTextarea.removeClass('frase-errada');
  inicializaCronometro();
}
