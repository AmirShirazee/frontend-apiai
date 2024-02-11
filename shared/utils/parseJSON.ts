async function parseJSON(stream: ReadableStream<Uint8Array>): Promise<any> {
  const reader = stream.getReader();
  let chunks = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks += new TextDecoder().decode(value);
  }

  return JSON.parse(chunks);
}

export default parseJSON;
