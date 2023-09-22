var Selecao = Selecao || {};

Selecao.PesquisaRapidaInscrito = (function(){
		
	 function PesquisaRapidaInscrito(){
		this.pesquisaRapidaInscritosModal = $('#pesquisaRapidaInscritos');
		this.nomeInput = $('#nomeInscritoModal');
		this.pesquisaRapidaBtn = $('.js-pesquisa-rapida-inscritos-btn');
		this.containerTabelaPesquisa = $('#containerTabelaPesquisaRapidaInscritos');
		this.htmlTabelaPesquisa = $('#tabela-pesquisa-rapida-inscrito').html();
		this.template = Handlebars.compile(this.htmlTabelaPesquisa);
		this.mensagemErro = $('.js-mensagem-erro');
	 }
	
	PesquisaRapidaInscrito.prototype.iniciar = function(){		
		this.pesquisaRapidaBtn.on('click', onPesquisaRapidaClicado.bind(this));		
		this.pesquisaRapidaBtn.on('click', onPesquisaRapidaClicado.bind(this));
		this.pesquisaRapidaInscritosModal.on('shown.bs.modal', onModalShow.bind(this));
	}
	function onPesquisaConcluida(resultado){
		console.log('resultado',resultado);
	}
	return PesquisaRapidaInscrito;
	function onModalShow(){
		this.nomeInput.focus();
	}
	
	function onPesquisaRapidaClicado(event){
		event.preventDefault();//para o comportamento default como submeter o formulário para buscar os dados via ajax
		
		$.ajax({
			url: this.pesquisaRapidaInscritosModal.find('form').attr('action'),
			method: 'GET',
			contentType: 'application/json',
			data: {
				nome: this.nomeInput.val()
			},
			
			success: onPesquisaConcluida.bind(this),
			error: onErroPesquisa.bind(this) //aqui pego o erro 
		});
	}
	
	function onPesquisaConcluida(resultado){
		
		var html = this.template(resultado);
		this.containerTabelaPesquisa.html(html);
		this.mensagemErro.addClass('hidden');

		var tabelaInscritoPesquisaRapida = new Selecao.TabelaInscritoPesquisaRapida(this.pesquisaRapidaInscritosModal);
		tabelaInscritoPesquisaRapida.iniciar();
	}
	
	function onErroPesquisa(){
		this.mensagemErro.removeClass('hidden');
	}
	
	return PesquisaRapidaInscrito;
	
	
}());

Selecao.TabelaInscritoPesquisaRapida = (function() {
	
	function TabelaInscritoPesquisaRapida(modal){
		this.modalInscrito = modal;
		this.inscrito = $('.js-inscrito-pesquisa-rapida');
	}
	
	TabelaInscritoPesquisaRapida.prototype.iniciar = function(){
		this.inscrito.on('click', onInscritoSelecionado.bind(this));
		
	}

	
	function onInscritoSelecionado(evento){
		this.modalInscrito.modal('hide');
		
		var inscritoSelecionado = $(evento.currentTarget);
		$('#nomeInscrito').val(inscritoSelecionado.data('nome'));
		$('#codigoInscrito').val(inscritoSelecionado.data('codigo'));
	}
	
	return TabelaInscritoPesquisaRapida;	
}());

$(function(){
	var pesquisaRapidaInscrito = new Selecao.PesquisaRapidaInscrito();
	pesquisaRapidaInscrito.iniciar();
});