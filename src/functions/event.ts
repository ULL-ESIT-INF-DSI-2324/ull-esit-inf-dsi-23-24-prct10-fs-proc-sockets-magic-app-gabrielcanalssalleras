import { EventEmitter } from 'events';

/**
 * Class to manage custom events of the server socket
 * Emits a request event when detects the client has send the full petititon
 */
export class EventSocket extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let socketData = '';
    connection.on('data', (dataChunk) => {
      socketData += dataChunk;

      if (socketData.includes('DONE')) {
        this.emit('request', JSON.parse(socketData), connection);
      }
    });
    connection.on('close', () => {
      this.emit('close');
    });
  }
}