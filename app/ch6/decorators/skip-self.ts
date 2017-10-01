import 'reflect-metadata';
import {
  Injector, Inject, SkipSelf
} from '@angular/core';

class Context {
  constructor( @SkipSelf() public parentContext: Context) { }
}

const parentInjector = Injector.create([
  { provide: Context, useValue: new Context(null) }
]);

const childInjector = Injector.create([{
  provide: Context,
  deps: [[new SkipSelf(), Context]],
  useFactory(context: Context) {
    return new Context(context);
  }
}], parentInjector);

console.log(childInjector.get(Context).parentContext instanceof Context);
