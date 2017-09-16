import 'reflect-metadata';
import {
  ReflectiveInjector,
  Inject,
  Injectable,
  InjectionToken
} from '@angular/core';

const BUFFER_SIZE = new InjectionToken('buffer-size');

class Buffer {
  constructor( @Inject(BUFFER_SIZE) private size: Number) {
    console.log(this.size);
  }
}

@Injectable()
class Socket {
  constructor(private buffer: Buffer) { }
}

let injector = ReflectiveInjector.resolveAndCreate([
  { provide: BUFFER_SIZE, useValue: 42 },
  Buffer,
  Socket
]);

injector.get(Socket);
