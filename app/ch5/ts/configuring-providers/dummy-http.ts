import 'reflect-metadata';
import { Injector } from '@angular/core';

class Http { }

class DummyHttp { }

class UserService {
  constructor(private http: Http) {
    console.log(this.http instanceof DummyHttp);
  }
}

const injector = Injector.create([
  {
    provide: UserService,
    deps: [Http],
    useFactory(http: Http) {
      return new UserService(http);
    }
  },
  {
    provide: Http,
    deps: [],
    useFactory() {
      return new DummyHttp();
    }
  }
]);

injector.get(UserService);
