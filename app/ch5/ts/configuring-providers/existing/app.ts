import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  NgModule,
  Component,
  Inject,
  InjectionToken,
  Injectable
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

const dummyHttp = {
  get() {},
  post() {}
};

class Http {}

class DummyHttp {}

@Injectable()
class UserService {
  constructor(public http: Http) {}
}

@Component({
  selector: 'app',
  template: "Open your browser's console"
})
class AppComponent {
  constructor(private service: UserService) {
    console.log(service.http === dummyHttp);
  }
}

@NgModule({
  providers: [
    { provide: DummyHttp, useValue: dummyHttp },
    { provide: Http, useExisting: DummyHttp },
    UserService
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
