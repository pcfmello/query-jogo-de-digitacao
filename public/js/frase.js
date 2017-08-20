function inicializaFrase() {
  var numeroPalavras = frase.text().split(' ').length;
  var tamanhoFrase = $('#tamanho-frase');
  tamanhoFrase.text(numeroPalavras);
}
