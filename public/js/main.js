var frase = $('.frase').text();
var numeroPalavras = frase.split(' ').length;
var tamanhoFrase = $('.tamanho-frase');

tamanhoFrase.text(numeroPalavras);
