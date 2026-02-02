export default async function createSha256Hash(input: string): Promise<string> {

  // encode to UTF-8 bytes
  const encodedData = new TextEncoder().encode(input)

  // hash encoded data
  const buffer = await crypto.subtle.digest('SHA-256', encodedData)

  // convert buffer to array
  const byteArray = Array.from(new Uint8Array(buffer))
  
  // join bytes to one hexadecimal string
  const hexString = byteArray.map(b => b.toString(16).padStart(2, "0")).join("")
  
  return hexString
}