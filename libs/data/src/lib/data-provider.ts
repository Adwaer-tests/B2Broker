import { BehaviorSubject, finalize, interval, map, mergeMap, Observable } from 'rxjs';
import { generateArray } from './functions';
import { DataItem } from '@bb/common';

export class DataProvider {
  data$: Observable<DataItem[]>;

  private data: DataItem[] = [];
  private timeIntervalSubj$ = new BehaviorSubject<number>(300);
  private arraySizeSubj$ = new BehaviorSubject<number>(1000);

  constructor() {
    this.data$ = this.timeIntervalSubj$.pipe(
      mergeMap(timeInterval => interval(timeInterval)),
      mergeMap(() => this.arraySizeSubj$),
      map(arraySize => {
        if (this.data.length === arraySize) {
          return this.data;
        }

        return this.data = generateArray(arraySize);
      }),
      finalize(() => this.data.length = 0)
    );
  }

  setTimeInterval(timeInterval: number) {
    this.timeIntervalSubj$.next(timeInterval);
  }

  setArraySize(size: number) {
    this.arraySizeSubj$.next(size);
  }
}
