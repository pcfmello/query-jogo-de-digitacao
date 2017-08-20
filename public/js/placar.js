function inserePlacar(nome, totalPalavras) {
  var linhaTabela = criaLinhaTabela(nome, totalPalavras);
  linhaTabela.find('.botao-excluir').click(removeLinha);
  placar.find('table tbody').append(linhaTabela);
}

function removeLinha() {
  event.preventDefault();
  $(this).parent().remove();
}

// Função que cria um objeto JQuery manipulável
function criaLinhaTabela(nome, total) {
  var linha = $('<tr>');
  var colunaUsuario = $('<td>').text(nome);
  var colunaTotal = $('<td>').text(total);
  var colunaRemove = $('<td>')
                      .append('<a>') // adiciona uma tag <a> dentro do <td>
                        .addClass('botao-excluir btn-medium waves-effect waves-light') // adiciona classe na tag <a>
                        .attr('href', '#') // adiciona o atributo 'href' e seu conteudo na tag <a>
                        .append('<i>')
                          .addClass('small material-icons red-text darken4')
                          .text('delete_forever'); // adiciona um texto na tag <i>

  // Adiciona as colunas na linha da tabela
  linha
    .append(colunaUsuario)
    .append(colunaTotal)
    .append(colunaRemove);
  return linha;
}
