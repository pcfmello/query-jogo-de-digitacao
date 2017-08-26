var jogoPrincipal = $('#jogo-principal');
var mensagemVencedor = $('.mensagem-vencedor');
var mensagemPerdedor = $('.mensagem-perdedor');
var contadorPalavra = $('#contador-palavras');
var campoDigitacao = $('#campo-digitacao');
var tempoDigitacao = $('#tempo-digitacao');
var botaoReiniciar = $('#botao-reiniciar');
var frase = $('.frase');
var placar = $('#placar-eletronico');
var labelDigitacao = $('#label-digitacao');
var mensagensErro = $('#mensagens-de-erro');
var botaoLoginFacebook = $('#login-facebook')
var botaoVerificaUserLogado = $('#verifica-user-logado');
var botaoCarregaInformacoes = $('#carrega-informacoes');
var botaoPedePermissao = $('#pede-permissao');
var FB_CONNECTED = 'connected';
var FB_NOT_AUTHORIZED = 'not_authorized';
var cronometro;
var tempoInicial;

/* atalho para $(document).ready */
$(function() {

  FB.getLoginStatus(function(response) {
    if(response.status !== FB_CONNECTED) {
      loginFacebook();
    }
    //statusChangeCallback(response);
  });

  tempoInicial = tempoDigitacao.text();
  mensagemVencedor.hide();
  mensagemPerdedor.hide();
  mensagensErro.hide();
  bloqueiaFuncaoColarTexto();
  inicializaFrase();
  inicializaRegraDeComparacao();
  inicializaContadores();
  inicializaCronometro();
  botaoReiniciar.click(function() { reiniciaJogo(); });
  placar.modal();
  inicializaRegraBotoesFooter();
  inicializaRegraFraseCorreta();

  botaoVerificaUserLogado.click(function() {
    initFacebook();
  });

  botaoCarregaInformacoes.click(function() {
    carregarInformacoes();
  });

  botaoPedePermissao.click(function() {
    loginFacebook();
  })

});

/*Esta função verifica se o usuário está logado no facebook.
Se não estiver ele abre a janelinha de login*/
function initFacebook() {
  FB.getLoginStatus(function(response) {
    if (response.status !== FB_CONNECTED) {
      loginFacebook();
    }
  });
}

/*Esta função vai recuperar tudo que você solicitou do usuário.*/
function carregarInformacoes() {
  FB.getLoginStatus(function(response) {
    if (response.status === FB_CONNECTED) {
      FB.api('/me?fields=id,name, picture', {}, function(response) {
        /*Response tem tudo que você solicitou, inclusive o access_token.*/
        console.log('Autorizou');
        console.log(response);
      });
    } else if (response.status === FB_NOT_AUTHORIZED) {
      console.log('Não autorizou');
      console.log(response);
      loginFacebook();
    } else {
      console.log('Não está logado!');
      loginFacebook();
    }
  });
}

/*Esta função pede permissão de acesso aos dados. Ela que no fim das contas vai gerar o access_token*/
function loginFacebook() {
  FB.login(function(response) {
    if (response.authResponse) {
      initFacebook();
    }
  }, {scope: 'email, user_photos' });
}

function bloqueiaFuncaoColarTexto() {
  campoDigitacao.bind('paste', function(e) {
    e.preventDefault();
    mensagensErro.show();
    setTimeout(function(){
      mensagensErro.hide();
    }, 3000);
  });
}

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
  mensagensErro.hide();
  campoDigitacao.attr('disabled', true);
  var mensagem = jogadorEhVencedor ? mensagemVencedor : mensagemPerdedor;
  mensagem.show();
  jogoPrincipal.removeClass('margem-top-inicial');
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
  jogoPrincipal.addClass('margem-top-inicial');
  campoDigitacao.attr('disabled', false);
  campoDigitacao.val('');
  tempoDigitacao.text(tempoInicial);
  contadorPalavra.text(0);
  tempoDigitacao.parent().removeClass('red-text text-darken-4');
  sinalizaErroDigitacao(false);
  inicializaCronometro();
}
