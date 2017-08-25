var mensagemVencedor = $('.mensagem-vencedor');
var mensagemPerdedor = $('.mensagem-perdedor');
var contadorPalavra = $('#contador-palavras');
var campoDigitacao = $('#campo-digitacao');
var tempoDigitacao = $('#tempo-digitacao');
var botaoReiniciar = $('#botao-reiniciar');
var frase = $('.frase');
var placar = $('#placar-eletronico');
var labelDigitacao = $('#label-digitacao');
var cronometro;
var tempoInicial;

/* atalho para $(document).ready */
$(function() {
  tempoInicial = tempoDigitacao.text();
  mensagemVencedor.hide();
  mensagemPerdedor.hide();
  inicializaFrase();
  inicializaRegraDeComparacao();
  inicializaContadores();
  inicializaCronometro();
  botaoReiniciar.click(function() { reiniciaJogo(); });
  placar.modal();
  inicializaRegraBotoesFooter();
  inicializaRegraFraseCorreta();
});

function inicializaRegraFraseCorreta() {
  campoDigitacao.on('input', function() {
    var textoDigitado = $(this).val();
    if(textoDigitado === frase.text()) {
      finalizaJogo(true);
      clearInterval(cronometro);
    }
  });
}

function inicializaRegraBotoesFooter() {
  campoDigitacao.on('focus', function() {
    $('footer').hide();
  });
  campoDigitacao.on('blur', function() {
    $('footer').show();
  });
}

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
    cronometro = setInterval(function() {
          tempoRestante--;
          tempoDigitacao.text(tempoRestante);
          if(tempoRestante == 3) {
            destacaTempo();
          }
          if(tempoRestante < 1) {
              finalizaJogo();
              clearInterval(cronometro);
          }
      }, 1000);
  });
}

function finalizaJogo(jogadorEhVencedor) {
  campoDigitacao.attr('disabled', true);
  var mensagem = jogadorEhVencedor ? mensagemVencedor : mensagemPerdedor;
  mensagem.show();
  sinalizaErroDigitacao(false);
  botaoReiniciar.attr('disabled', false).toggleClass('disabled');
  inserePlacar('Paulo Cesar', contadorPalavra.text());
}

function destacaTempo() {
  tempoDigitacao.parent().addClass('red-text text-darken-4');
}

function inicializaRegraDeComparacao() {
  var fraseCompleta = frase.text().trim();
  campoDigitacao.on('input', function() {
    var termoDigitado = $(this).val();
    var termoParaComparar = fraseCompleta.substr(0, termoDigitado.length);
    /* No ECMAScript 6, pode ser substituido por:
     var termoParaComparar = fraseCompleta.startsWith(termoDigitado); */

    if(termoDigitado !== termoParaComparar) {
      sinalizaErroDigitacao(true);
    } else {
      sinalizaErroDigitacao(false);
    }
    if(termoDigitado.length < 1) {
      sinalizaErroDigitacao(false);
    }
  });
}

function sinalizaErroDigitacao(digitadoCorretamente) {
  if(digitadoCorretamente) {
    labelDigitacao.addClass('frase-errada-label');
    campoDigitacao.addClass('frase-errada-textarea');
  } else {
    labelDigitacao.removeClass('frase-errada-label');
    campoDigitacao.removeClass('frase-errada-textarea');
  }
}

function reiniciaJogo() {event
  mensagemVencedor.hide();
  mensagemPerdedor.hide();
  campoDigitacao.attr('disabled', false);
  campoDigitacao.val('');
  tempoDigitacao.text(tempoInicial);
  contadorPalavra.text(0);
  tempoDigitacao.parent().removeClass('red-text text-darken-4');
  sinalizaErroDigitacao(false);
  inicializaCronometro();
}
