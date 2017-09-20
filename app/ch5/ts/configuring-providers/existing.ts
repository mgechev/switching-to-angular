import 'reflect-metadata';
import {
  Injector, Inject
} from '@angular/core';

class Http { }

class DummyService { }

class UserService {
  constructor(public http: Http) { }
}

const dummyHttp = {
  get() { },
  post() { }
};

const injector = Injector.create([
  { provide: DummyService, useValue: dummyHttp },
  { provide: Http, useExisting: DummyService },
  {
    provide: UserService,
    deps: [Http],
    useFactory(http: Http) {
      return new UserService(http);
    }
  }
]);

console.assert(injector.get(UserService).http === dummyHttp);

