export default async function createSha256Hash(input: string): Promise<string> {
  const encodedData = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', encodedData)
  const byteArray = Array.from(new Uint8Array(digest))
  const hexString = byteArray.map(b => b.toString(16).padStart(2, "0")).join("")
  return hexString
}