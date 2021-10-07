# basic-contract-interaction
Instrucciones para configurar web3 y truffle, y cómo llamar funciones de un contrato que fue desplegado anterioremente

## Preparar un endpoint de Infura

Infura.io es la herramienta que nos proveerá acceso al blockchain de Ethereum

1. Registrarse en [Infura](https://infura.io)

2. En la barra izquierda elegir **Ethereum** y luego **Create new project** en la derecha

3. Dentro del proyecto ir a **Settings**

4. En **Keys** elegir endpoint para **Ropsten** y esto nos dará una dirección como la siguiente 
 
```
https://ropsten.infura.io/v3/valorEnHexadecimal
```
    
## Instalar node y librerías

1. Instalar **node**, si están en Windows también instalar `node-gyp` y `windows-build-tools` para evitar problemas después

2. Instalar truffle de forma global

```
npm install -g truffle
```

3. Creamos una carpeta para nuestro código y nos movemos a ella

```
mkdir miCarpeta
cd miCarpeta
```

4. Dentro de esta carpeta instalamos web3 y el adaptador de billetera para truffle

```
npm install web3
npm install @truffle/hdwallet-provider
```

5. Inicializamos truffle, al hacerlo se creará el archivo truffle-config.js y otras carpetas

```
truffle init
```

6. Las carpetas que se crearon son relevantes si voy a hacer deploy de mi contrato desde aquí, pero en nuestro caso el deploy ya fue hecho desde **Remix**

## Agregando nuestros datos a truffle-config.js

Los siguientes pasos los realizo dentro del archivo `truffle-config.js` que se generó automáticamente

1. Al inicio encuentro algunos comentarios que me hablan sobre mi billetera y mi mnemónico, **leo con atención los comentarios pues me explican algunos detalles importantes de seguridad**, luego puedo habilitar estas líneas que estaban como comentarios y escribir mi mnemónico en el archivo `.secret`

```
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
```

* Alternativamente puedo escribir mi mnemónico en este mismo archivo

```
const mnemonic = “uno dos tres … doce”;
```

2. Necesitaré conectarme a Ropsten, en las líneas 60 a la 67 encuentro el siguiente código al cuál le quitaré el comentario

```
ropsten: {
    provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    network_id: 3,       // Ropsten's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
},
```

* Debo reemplazar la dirección que aparece en `provider` con la que obtuve anteriormente en Infura

## ¿Y ahora?

Todas mis configuraciones están listas, puedo ir a los archivos `read.js` y `write.js` y encontrar comentarios dentro de ellos para continuar
