/*
	read.js
	
	Si solo realizaremos calls (llamadas a funciones que solo leen valores
	y no escriben al blockchain), podemos usar este ejemplo que solo utiliza
	web3 y no truffle

	Ejecutamos:
		node read.js
*/

/*
	Contrato
	dweb:/ipfs/QmWMn6oRuqi9sBVeKTeRDpAy78jdpR25MnuvFnoVvivWgk
*/

// web3 nos permite interactuar con el blockchain desde Javascript
const Web3 = require('web3');

// Endpoint obtenido en Infura
const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/YOUR-PROJECT-ID");

// Realizando conexión al blockchain
const web3 = new Web3(provider);
web3.eth.net.isListening()
	.then(() => console.log('web3 is connected'))
	.catch(e => console.log('error when connecting'));

// Obtenemos ABI desde archivo
const jsonRead = require('./build/contracts/SimpleStorage.json');
const abi = jsonRead.abi;

// Dirección donde se encuentra nuestro contrato ya desplegado
const address = "0xC78f560396Db35EbD607D1345066fB6fd2c312F5";

// Abstracción para interactuar con el contrato desde Javascript
const contract = new web3.eth.Contract(abi, address);

// contract.method tiene los métodos definidos en el ABI
// get() es el método para consultar el valor
// call() ejecuta esta llamada
// then() contiene el callback
contract.methods.getNum().call().then((res) => console.log(res));
