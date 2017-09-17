import 'reflect-metadata';
import {
  Inject, InjectionToken, Injector
} from '@angular/core';

const BUFFER_SIZE = new InjectionToken('buffer-size');

class Buffer {
  constructor( @Inject(BUFFER_SIZE) private size: Number) { }
}

class Certificate { }
class Crypto { }

class Socket {
  isOpen: boolean;
  constructor(private buffer: Buffer) { }
  open() {
    this.isOpen = true;
  }
}

class TLSConnection {
  public socket: Socket;
  public crypto: Crypto;
  public certificate: Certificate;
}

const injector = Injector.create([
  {
    provide: TLSConnection,
    useFactory: (socket: Socket, certificate: Certificate, crypto: Crypto) => {
      let connection = new TLSConnection();
      connection.certificate = certificate;
      connection.socket = socket;
      connection.crypto = crypto;
      socket.open();
      return connection;
    },
    deps: [Socket, Certificate, Crypto]
  },
  { provide: BUFFER_SIZE, useValue: 42 },
  {
    provide: BUFFER_SIZE,
    useValue: 42
  },
  {
    provide: Buffer,
    deps: [BUFFER_SIZE],
    useFactory(size: number) {
      return new Buffer(size);
    }
  },
  {
    provide: Socket,
    deps: [Buffer],
    useFactory(buffer: Buffer) {
      return new Socket(buffer);
    }
  },
  {
    provide: Certificate,
    deps: [],
    useFactory() {
      return new Certificate();
    }
  },
  {
    provide: Crypto,
    deps: [],
    useFactory() {
      return new Crypto();
    }
  }
]);

console.log(injector.get(TLSConnection));
