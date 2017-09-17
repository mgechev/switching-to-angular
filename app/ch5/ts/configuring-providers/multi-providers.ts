import 'reflect-metadata';
import {
  Inject, Injector, InjectionToken
} from '@angular/core';

const VALIDATOR = new InjectionToken('validator');

interface EmployeeValidator {
  (person: Employee): string;
};

class Employee {
  name: string;

  constructor( @Inject(VALIDATOR) private validators: EmployeeValidator[]) { }

  validate() {
    return this.validators
      .map(v => v(this))
      .filter(value => !!value);
  }
}

let injector = Injector.create([
  {
    provide: VALIDATOR,
    multi: true,
    useValue: (person: Employee) => {
      if (!person.name) {
        return 'The name is required';
      }
    }
  },
  {
    provide: VALIDATOR,
    multi: true,
    useValue: (person: Employee) => {
      if (!person.name || person.name.length < 1) {
        return 'The name should be more than 1 symbol long';
      }
    }
  },
  {
    provide: Employee,
    deps: [[new Inject(VALIDATOR)]],
    useFactory(validators: EmployeeValidator[]) {
      return new Employee(validators);
    }
  }
]);

console.log(injector.get(Employee).validate());
