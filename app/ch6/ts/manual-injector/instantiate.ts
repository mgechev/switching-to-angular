import { Injector, InjectionToken, Injectable, Inject } from '@angular/core';

// ...

const BUFFER_SIZE = new InjectionToken<number>('buffer-size');

class Buffer {
  constructor( @Inject(BUFFER_SIZE) private size: Number) {
    console.log(this.size);
  }
}

@Injectable()
class Socket {
  constructor(private buffer: Buffer) { }
}

const injector = Injector.create([
  { provide: BUFFER_SIZE, useValue: 42 },
  {
    provide: Buffer,
    deps: [BUFFER_SIZE],
    useFactory: function (size: number) {
      return new Buffer(size);
    }
  },
  {
    provide: Socket,
    deps: [Buffer],
    useFactory: function (buffer: Buffer) {
      return new Socket(buffer);
    }
  }
]);

console.log(injector.get(Socket));
