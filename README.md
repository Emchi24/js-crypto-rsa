## What is js-crypto-rsa?
js-crypto-rsa is a npm package where I implemented a RSA Cryptosystem completely from scratch like it is defined in the [RSA paper](https://people.csail.mit.edu/rivest/Rsapaper.pdf). I built it for webapps to enable secure end-to-end encryption. It provides
* a public/-private keypair generation function
* encryption, decryption, singing and verifying functions 

## How to install
You can install it with npm
```sh
npm i @js-crypto/rsa
```
## Usage

```js
import * as rsa from "@js-crypto/rsa"
async function test() {
    const msg = "Hello World!"
  
  const [publicKeyTransmitter, privateKeyTransmitter] = await rsa.generateKeyPair(1024) // 1024 is the size of p and q so n will be 1024*2 bits.
  // A bit length of at least 32 bits is required, but 1024 is recommended.
  const [publicKeyRecipient, privateKeyRecipient] = await rsa.generateKeyPair(1024)

  const encryptedMessage = await rsa.encryptMessage(msg, publicKeyRecipient)
  const signedMessage = await rsa.signMessage(msg, privateKeyTransmitter)
  const decryptedMessage = await rsa.decryptMessage(encryptedMessage, privateKeyRecipient)
  const verifiedMessage = await rsa.verifyMessageSignature(decryptedMessage, signedMessage, publicKeyTransmitter)
  if (verifiedMessage) {
    console.log("Success")
    return decryptedMessage
}
}

test().then(result => console.log(result)).catch(err => console.error(err))
```