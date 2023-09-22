var Forum = Forum || {}

Forum.MaskPhone = (function(){
	
	function MaskPhone(){
		this.inputPhone = $('.js-phone');
		this.inputCelPhone = $('.js-cel-phone');
	}
	
	MaskPhone.prototype.enable = function(){
		var maskBehavior = function (val) {
			  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
			};
			
			var options = {
			  onKeyPress: function(val, e, field, options) {
			      field.mask(maskBehavior.apply({}, arguments), options);
			    }
			};
			
		this.inputPhone.mask(maskBehavior, options);
		this.inputCelPhone.mask(maskBehavior, options);
		
		this.inputPhone.on('blur', validaPhone.bind(this));
		this.inputCelPhone.on('blur', validaCelPhone.bind(this));
	}
	
	function validaPhone(){
		if(this.inputPhone.val().length < 14){
			this.inputPhone.val('');
		}
	}
	
	function validaCelPhone(){
		if(this.inputCelPhone.val().length < 15){
			this.inputCelPhone.val('');
		}
	}
	
	return MaskPhone;
	
}());

Forum.MaskCpfCnpj = (function(){
	
	function MaskCpfCnpj(){
	}
	
	MaskCpfCnpj.prototype.enable = function(){
		var options = {
				onKeyPress : function(cpfcnpj, e, field, options) {
					var masks = ['00.000.000/0000-00'];
					
				}
		};
		
		$('.js-documento').mask('00.000.000/0000-00', options);
		
		$('.js-documento').on('blur', validaDocumento.bind(this));
	}
	
	function validaDocumento(){
		var valor = $('.js-documento').val().length;
		if(valor < 14){
			$('.js-documento').val('');
		
		}else if(valor > 14 && valor < 18){
			$('.js-documento').val('');
		}
	}
	
	return MaskCpfCnpj;
	
}());

//Forum.EnviarForm = (function(){
//	
//	function EnviarForm(){
//		
//
//	}
//	
//	EnviarForm.prototype.enable = function(){
//		
//		$('#registration-form').submit(function(e){
//			 e.preventDefault();
//			 
//			 var postForm = { //Fetch form data
//			            'nomeResponsavel' : $('#registration-form #nomeResponsavel').val(),
//			            'nomeEmpresa'     : $('#registration-form #nomeEmpresa').val(),
//			            'CNPJ'            : $('#registration-form #CNPJ').val(),			            
//			            'areaAtuacao': {
//                			'codigo' : $('#registration-form #areaAtuacao').val()
//                		},
//			            'endereco' : {
//			            	'logradouro': $('#registration-form #logra').val(),
//			            	'cep': $('#registration-form #cep').val(),
//			                'numero': $('#registration-form #numero').val(),
//			                'bairro': $('#registration-form #bairro').val(),
//			                'complemento': $('#registration-form #complemento').val()
//			            },
//			            'contato' : {
//			            	'celular': $('#registration-form #celular').val(),			            	
//						    'email': $('#registration-form #email').val()
//			            }
//			    };
//			 
//						 
//			 $.ajax({
//		            method      : 'POST',
//		            url       : '/empresas/salvar',
//		            contentType: "application/json; charset=utf-8",
//		            data      : JSON.stringify(postForm),
//		            success   : function(codigo) {	                        
//		            			swal({
//		            				  title: "Inscrição realizada com sucesso!",
//		            				  text: "Seu código de cadastro é "+codigo+"/2021, Em breve entraremos em contado! ",
//		            				  icon: "success",
//		            				  button: "OK",
//		            				});
//		            			
//		            			$('#registration-form #nomeResponsavel').val('');
//		            			$('#registration-form #nomeEmpresa').val('');
//		            			$('#registration-form #CNPJ').val('');
//		            			$('#registration-form #areaAtuacao').val('');
//		            			$('#registration-form #logra').val('');
//		            			$('#registration-form #cep').val('');
//		            			$('#registration-form #numero').val('');
//		            			$('#registration-form #bairro').val('');
//		            			$('#registration-form #complemento').val('');		            			
//		            			$('#registration-form #celular').val('');		            		
//		            			$('#registration-form #email').val('');
//		            },
//		            error : function(e){
//		            	swal('Oops!', e.responseText, 'error');
//		            }
//		        });
//			 
//		});
//		
//	}
//	
//	return EnviarForm;
//	
//}());

$(function(){
	
	var maskPhone = new Forum.MaskPhone();
	maskPhone.enable();
	
	var maskCpfCnpj = new Forum.MaskCpfCnpj();
	maskCpfCnpj.enable();
	
	var enviarForm = new Forum.EnviarForm();
	enviarForm.enable();

	$('.select2bs4').select2({
		theme : 'bootstrap4'
	});
});