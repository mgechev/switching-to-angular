import 'reflect-metadata';
import { Optional, Injector } from '@angular/core';

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

const injector = Injector.create([{
  provide: Collection,
  deps: [[new Optional(), SortingAlgorithm]],
  useFactory(algorithm: SortingAlgorithm) {
    return new Collection(algorithm);
  }
}]);

console.log(injector.get(Collection).sort === null);
