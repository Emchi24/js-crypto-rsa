
const index = require('./dist/index.js')

test('encrypt, sign, decrypt, and verify works correctly', async () => {
  const msg = "Hello, World!"
  const [publicKeyTransmitter, privateKeyTransmitter] = await index.generateKeyPair(40)
  const [publicKeyRecipient, privateKeyRecipient] = await index.generateKeyPair(40)

  const encryptedMessage = await index.encryptMessage(msg, publicKeyRecipient)
  const signedMessage = await index.signMessage(msg, privateKeyTransmitter)
  const decryptedMessage = await index.decryptMessage(encryptedMessage, privateKeyRecipient)

  expect(await index.verifyMessageSignature(decryptedMessage, signedMessage, publicKeyTransmitter)).toBe(true)
  expect(decryptedMessage).toBe(msg)
}, 20000)
