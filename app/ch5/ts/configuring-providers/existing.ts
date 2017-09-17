import 'reflect-metadata';
import {
  Injector, Inject
} from '@angular/core';

class Http { }

class DummyService { }

class UserService {
  constructor(public http: Http) { }
}

// let injector = ReflectiveInjector.resolveAndCreate([
//   DummyService,
//   { provide: Http, useExisting: DummyService },
//   UserService
// ]);

// let us:UserService = injector.get(UserService);

// console.log(us.http instanceof DummyService);

let dummyHttp = {
  get() { },
  post() { }
};

let injector = Injector.create([
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
