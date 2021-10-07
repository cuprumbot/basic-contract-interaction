/*
	write.js
	
	Para poder modificar el blockchain usaremos truffle, pues esta herramienta
	nos facilita conectar una billetera

	Ejecutamos:
		truffle exec --network ropsten write.js
*/

/*
	Contrato
	dweb:/ipfs/QmWMn6oRuqi9sBVeKTeRDpAy78jdpR25MnuvFnoVvivWgk
*/

// Obtenemos el nombre y el ABI del contrato desde un JSON
var contract = artifacts.require("SimpleStorage");

// Dirección del contrato
var contract_address = '0xC78f560396Db35EbD607D1345066fB6fd2c312F5';

// truffle exec espera recibir una función
module.exports = function() {

	// También podemos hacer lecturas, pero ahora es una sintaxis distinta a web3
	async function getNumFunc() {
		let instance = await contract.at(contract_address);
		let response = await instance.getNum();
		console.log('numero: '+ response.toString());
	}

	// Hacemos una escritura
	async function setNumFunc(val) {
		// Necesitamos una cuenta para poder pagar las transacciones
		// truffle obtendrá cuentas a partir del mnemónico que pusimos en truffle-config
		let accounts = await web3.eth.getAccounts();
		console.log('Using account: ' + accounts[2]);

		// "Instanciamos" el contrato
		let instance = await contract.at(contract_address);
		
		// Llamamos a la función set(val)
		// Ya no necesitamos un call() como en web3
		// set(val) tiene un solo parámetro pero le envío dos argumentos
		// El segundo argumento es especial y será interceptado por truffle
		// Allí podemos colocar detalles sobre la transacción
		let response = await instance.setNum(val, {from: accounts[2]});
		console.log(response);
	}
	
	// Las funciones anteriores solo están declaradas
	// Tenemos que mandar a llamar a alguna
	setNumFunc(789);
}