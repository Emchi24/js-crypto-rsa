## What is js-crypto-rsa?
js-crypto-rsa is an npm package for an end-to-end encryption messaging webapp like it is definined in the official RSA-paper. It provides
* a public/-private keypair generation function
* encryption and singing functions 

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

  const [publicKeyTransmitter, privateKeyTransmitter] = await rsa.generateKeyPair(1024) // 1024 is the size of p and q so n will be 1024*2 bits
  const [publicKeyRecipient, privateKeyRecipient] = await rsa.generateKeyPair(1024)

  const encryptedMessage = await rsa.encryptMessage(msg, publicKeyRecipient)
  const signedMessage = await rsa.signMessage(msg, privateKeyTransmitter)
  const decryptedMessage = await rsa.decryptMessage(encryptedMessage, privateKeyRecipient)
  const verifiedMessage = await rsa.verifyMessageSigniture(decryptedMessage, signedMessage, publicKeyTransmitter)
  if (verifiedMessage) {
    console.log("Success")
    return decryptedMessage
}
}

test().then(result => console.log(result)).catch(err => console.error(err))
```