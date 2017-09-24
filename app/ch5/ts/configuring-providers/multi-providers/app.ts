import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  Inject,
  InjectionToken,
  Injector,
  Injectable,
  Component,
  NgModule
} from '@angular/core';

const VALIDATOR = new InjectionToken('validator');

interface EmployeeValidator {
  (person: Employee): string;
};

@Injectable()
class Employee {
  name: string;

  constructor( @Inject(VALIDATOR) private validators: EmployeeValidator[]) { }

  validate() {
    return this.validators
      .map(v => v(this))
      .filter(value => !!value);
  }
}

@Component({
  selector: 'app',
  template: "Open your browser's console"
})
class AppComponent {
  constructor(private employee: Employee) {
    console.log(employee);
  }
}

@NgModule({
  providers: [
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
    Employee
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

