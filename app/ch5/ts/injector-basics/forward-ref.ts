import 'reflect-metadata';
import {
  Injector, Inject,
  InjectionToken, forwardRef
} from '@angular/core';

const BUFFER_SIZE = new InjectionToken('buffer-size');

class Socket {
  constructor( @Inject(forwardRef(() => Buffer)) private buffer: Buffer) { }
}

// undefined
// console.log(Buffer);

class Buffer {
  constructor( @Inject(BUFFER_SIZE) private size: Number) {
    console.log(this.size);
  }
}

// [Function: Buffer]
console.log(Buffer);

const injector = Injector.create([
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
]);

console.log(injector.get(Socket));
