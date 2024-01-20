/// <reference lib="webworker" />

import { DataProvider } from '@bb/data';
import { Subject, takeUntil } from 'rxjs';
import { DataWorkerResponseType, sendResponse } from './data-worker.response';
import { DataWorkerRequest, DataWorkerRequestType } from './data-worker-request';

const provider = new DataProvider();

let disposer$: Subject<void> | undefined;

addEventListener('message', ({ data }) => {
  const request = data as DataWorkerRequest;

  switch (request.type) {
    case DataWorkerRequestType.start: {
      if (disposer$) {
        throw 'Already started';
      }

      disposer$ = new Subject();
      provider.data$.pipe(
        takeUntil(disposer$)
      ).subscribe(data => {
        sendResponse(DataWorkerResponseType.data, data);
      });

      break;
    }

    case DataWorkerRequestType.stop: {
      if (!disposer$) {
        throw 'The worker is not started';
      }

      disposer$.next();
      disposer$.complete();
      disposer$ = undefined;

      break;
    }

    case DataWorkerRequestType.timerSet: {
      provider.setTimeInterval(request.data as number);
      break;
    }

    case DataWorkerRequestType.arraySizeSet: {
      provider.setArraySize(request.data as number);
      break;
    }

    default: {
      throw 'Unsupported message type';
    }
  }

});
