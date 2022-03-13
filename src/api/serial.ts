class LineBreakTransformer {
  private chunks = '';

  transform(chunk, controller) {
    this.chunks += chunk;
    const lines = this.chunks.split("\r\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.chunks);
  }
}

export const readSerial = async (reader: ReadableStreamDefaultReader, onGetValue: (value: string) => void) => {
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      onGetValue(value);
    }
  } catch (error) {
    console.log("Error: Read");
    console.log(error);
  } finally {
    reader.releaseLock();
  }
}

export const connectSerial = async (): Promise<ReadableStreamDefaultReader> => {
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    while (!port.readable) { console.log('not readable') }

    const textDecoder = new TextDecoderStream();
    port.readable.pipeTo(textDecoder.writable);
    return textDecoder.readable
                      .pipeThrough(new TransformStream(new LineBreakTransformer()))
                      .getReader();
  } catch (error) {
    console.log("Error: Open");
    console.log(error);
  }
}
