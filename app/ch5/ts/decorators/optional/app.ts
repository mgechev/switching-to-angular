import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Optional } from '@angular/core';
import {
  Inject,
  InjectionToken,
  Injector,
  Component,
  NgModule
} from '@angular/core';

abstract class SortingAlgorithm {
  abstract sort(collection: BaseCollection): Collection;
}

class BaseCollection {
  getDefaultSort(): SortingAlgorithm {
    // get some generic sorting algorithm...
    return null;
  }
}

class Collection extends BaseCollection {
  public sort: SortingAlgorithm;

  constructor( @Optional() sort: SortingAlgorithm) {
    super();
    this.sort = sort || this.getDefaultSort();
  }
}

@Component({
  selector: 'app',
  template: "Open your browser's console"
})
class AppComponent {
  constructor(private collection: Collection) {
    console.log(collection);
  }
}

@NgModule({
  providers: [Collection],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
