import 'reflect-metadata';
import {
  Injector, Inject, Self
} from '@angular/core';

abstract class Channel { }

class Http extends Channel { }

class WebSocket extends Channel { }

class UserService {
  constructor(public channel: Channel) { }
}

const parentInjector = Injector.create([
  {
    provide: Channel,
    deps: [],
    useFactory() {
      return new Http();
    }
  }
]);

const childInjector = Injector.create([
  // Remove the comment to allow Angular resolve the Channel dependency.

  // {
  //   provide: Channel,
  //   deps: [],
  //   useFactory() {
  //     return new WebSocket();
  //   }
  // },
  {
    provide: UserService,
    deps: [[new Self(), Channel]],
    useFactory(channel: Channel) {
      return new UserService(channel);
    }
  },
], parentInjector);

console.log(childInjector.get(UserService).channel instanceof WebSocket);
