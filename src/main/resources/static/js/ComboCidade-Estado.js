
var Authorius = Authorius || {};

Authorius.ComboEstado = (function () {

  class ComboEstado {
    constructor() {
      this.combo = $('#uf');
      this.emitter = $({});
      this.on = this.emitter.on.bind(this.emitter);
    }
    enable() {
      this.combo.on('change', onEstadoAlterado.bind(this));
    }
  }


  function onEstadoAlterado() {
    this.emitter.trigger('alterado', this.combo.val());
  }

  return ComboEstado;

}());


Authorius.ComboCidade = (function () {

  class ComboCidade {
    constructor(comboEstado) {
      this.comboEstado = comboEstado;
      this.combo = $('#cidade');
      //this.imgLoading = $('.js-img-loading');
      this.inputHiddenCidadeSelecionada = $('#inputHiddenCidadeSelecionada');
    }
    enable() {
      reset.call(this);
      this.comboEstado.on('alterado', onEstadoAlterado.bind(this));
      var codigoEstado = this.comboEstado.combo.val();

      var cidadeSelecionada = this.inputHiddenCidadeSelecionada.val()

      if (codigoEstado || this.inputHiddenCidadeSelecionada) {
        this.combo.val(cidadeSelecionada)
        inicializarCidades.call(this, codigoEstado);
      }
    }
  }

  function onEstadoAlterado(evento, codigoEstado) {
    inicializarCidades.call(this, codigoEstado);
  }

  function inicializarCidades(codigoEstado) {

    if (codigoEstado) {
      var resposta = $.ajax({
        url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${codigoEstado}/distritos`,
      });

      resposta.done(onBuscarCidadesFinalizado.bind(this));

    } else {
      reset.call(this);
    }

  }

  function onBuscarCidadesFinalizado(cidades) {
    var options = [];
    cidades.forEach(function (cidade) {
      options.push('<option value="' + cidade.nome + '">' + cidade.nome + '</option>');
    });

    this.combo.html(options.join(''));
    this.combo.removeAttr('disabled');

    var codigoCidadeSelecionada

    this.combo.on("change", () => {
      codigoCidadeSelecionada = this.combo.val();

      if (codigoCidadeSelecionada) {
        this.inputHiddenCidadeSelecionada.val(codigoCidadeSelecionada)
        this.combo.val(codigoCidadeSelecionada);
      }
    })

  }

  function reset() {
    this.combo.html('<option value="">Selecione a cidade</option>');
    this.combo.val('');
    this.combo.attr('disabled', 'disabled');
  }

  // function iniciarRequisicao() {
  //   reset.call(this);
  //   this.imgLoading.show();
  // }

  // function finalizarRequisicao() {
  //   this.imgLoading.hide();
  // }

  return ComboCidade;

}());


$(function () {
  var comboEstado = new Authorius.ComboEstado();
  comboEstado.enable();

  var comboCidade = new Authorius.ComboCidade(comboEstado);
  comboCidade.enable();
});
