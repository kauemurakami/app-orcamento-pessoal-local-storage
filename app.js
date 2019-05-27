class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
	validarDados(){
		for(let i in this){//referencia a propria despesa
			if (this[i] === null || this[i] === undefined || this[i] === '') { return false}
			console.log(i, this[i])//podemos acessar atributos de objetos dessa maneira mesmo modo que arrays
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	carregarTodosRegistros(){
		//array de despesas
		let despesas = Array()
		//recupera o id "atual" / maior
		let id = localStorage.getItem('id')
		//recupera todas as despesas cadastradas 
		for(let i = 1; i<= id ; i++){
			//recupera despesa transformando de JSON para um objeto literal
			let despesa = JSON.parse(localStorage.getItem(i))
			if (despesa === null) {
				continue
			}else {
				despesas.push(despesa)
			}
			
		}
		console.log(despesas)
		return despesas
	}
	pesquisar(despesa){
		console.log(despesa)
	}

}

let bd = new Bd()


function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)
	
	if (despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro Inserido com Sucesso'
		document.getElementById('modal_titulo_div').className = "modal-header text-success"
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
		document.getElementById('modal_botao').innerHTML = "Voltar"
		document.getElementById('modal_botao').className = "btn btn-success"
		$('#modalRegistroDespesa').modal('show')


		document.getElementById('ano').value = ''
		document.getElementById('mes').value = ''
		document.getElementById('dia').value = ''
		document.getElementById('tipo').value = ''
		document.getElementById('descricao').value = ''
		document.getElementById('valor').value = ''

	}else {
		//jquery
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = "modal-header text-danger"
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação do registro'
		document.getElementById('modal_botao').innerHTML = "Corrigir"
		document.getElementById('modal_botao').className = "btn btn-danger"
		$('#modalRegistroDespesa').modal('show')// age como quando clicamos num botao
		console.log('dados invalidos')
	}
}

function carregaListaDespesas(){
	let despesas = Array()
	despesas = bd.carregarTodosRegistros()
	//recuperando o  elemento tbody da tabela
	let listadespesas = document.getElementById('listaDespesas')

	//percorrer o array despesas lsitando as despesas de forma dinâmica
	despesas.forEach(function(d){
		console.log(d)
		//criando linha <tr>
		let linha = listadespesas.insertRow() //método que faz parte do elemento tbody que possibilita inserrção del inhas
		//inserir valores / <td> / colunas
		linha.insertCell(0).innerHTML = ` ${d.dia}/${d.mes}/${d.ano}` //recupera o elemento linha e insere um celula <td>
																 // @param numero da coluna 0,1 ,2
		//ajustar tipo
		switch (d.tipo) {
			case '1':
				d.tipo = 'Alimentação'
				break;
			case '2':
				d.tipo = 'Educação'
				break;
			case '3':
				d.tipo = 'Lazer'
				break;
			case '4':
				d.tipo = 'Saúde'
				break;
			case '5':
				d.tipo = 'Transporte'
				break;
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})

}

function pesquisarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
	bd.pesquisar(despesa)
}