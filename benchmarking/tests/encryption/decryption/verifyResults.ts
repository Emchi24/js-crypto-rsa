import { decryptionResults } from "./decryptionSpeedTest";

export default function verifyResults(results: decryptionResults) {
    const decryptedText = results.decryptedText
    const originalText = results.originalText
    return decryptedText == originalText
}

