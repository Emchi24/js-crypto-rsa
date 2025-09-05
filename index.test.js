
const index = require('./dist/index.js')

test('encrypt, sign, decrypt, and verify works correctly', async () => {
  const msg = "Hello World!"

  const [publicKeyTransmitter, privateKeyTransmitter] = await index.generateKeyPair(1024)
  const [publicKeyRecipient, privateKeyRecipient] = await index.generateKeyPair(1024)

  const encryptedMessage = await index.encryptMessage(msg, publicKeyRecipient)
  console.log(encryptedMessage)
  const signedMessage = await index.signMessage(msg, privateKeyTransmitter)
  const decryptedMessage = await index.decryptMessage(encryptedMessage, privateKeyRecipient)

  expect(await index.verifyMessageSigniture(decryptedMessage, signedMessage, publicKeyTransmitter)).toBe(true)
  expect(decryptedMessage).toBe(msg)
}, 15000)
