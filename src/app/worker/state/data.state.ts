import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataStateModel } from './data.model';
import { DataArraySizeSet, DataIdsSet, DataSend, DataTimerSet, DataWorkerStart, DataWorkerStop } from './data.acions';
import { initWorker } from '../init-worker';
import {
  DataWorkerRequestType,
  makeWorkerRequest
} from '../data-worker-request';
import { DataWorkerResponse, DataWorkerResponseType } from '../data-worker.response';
import { set10Ids } from '@bb/data';


@State<DataStateModel>({
  name: 'zoo',
  defaults: {
    items: [],
    top10Items: [],
    top10Ids: []
  }
})
@Injectable()
export class DataState implements NgxsOnInit {
  worker!: Worker;

  @Selector()
  static items(state: DataStateModel) {
    return state.items;
  }

  @Selector()
  static top10Items(state: DataStateModel) {
    return state.top10Items;
  }

  ngxsOnInit(ctx: StateContext<DataStateModel>): void {
    this.worker = initWorker();
    this.worker.onmessage = ({ data }) => {
      const msg = data as DataWorkerResponse;

      if (msg.type !== DataWorkerResponseType.data) {
        throw 'Unsupported received message type';
      }
      ctx.dispatch(new DataSend(msg.data));
    };
  }

  @Action(DataWorkerStart)
  start() {
    this.worker.postMessage(makeWorkerRequest(DataWorkerRequestType.start));
  }

  @Action(DataWorkerStop)
  stop() {
    this.worker.postMessage(makeWorkerRequest(DataWorkerRequestType.stop));
  }

  @Action(DataSend)
  dataSend(ctx: StateContext<DataStateModel>, { items }: DataSend) {
    const state = ctx.getState();
    const { top10Ids } = state;

    const top10Items = [...items.slice(0, 10)];
    if (top10Ids && top10Ids.length) {
      set10Ids(top10Items, top10Ids);
    }

    ctx.setState({
      ...state,
      items,
      top10Items
    });
  }

  @Action(DataIdsSet)
  dataIdsSet(ctx: StateContext<DataStateModel>, { numbers }: DataIdsSet) {
    const state = ctx.getState();
    const { top10Items } = state;

    const mutatedTop10 = [...top10Items];
    set10Ids(mutatedTop10, numbers);

    ctx.setState({
      ...state,
      top10Ids: numbers,
      top10Items: mutatedTop10
    });
  }

  @Action(DataTimerSet)
  dataTimerSet(ctx: StateContext<DataStateModel>, { timer }: DataTimerSet) {
    this.worker.postMessage(makeWorkerRequest(DataWorkerRequestType.timerSet, timer));
  }

  @Action(DataArraySizeSet)
  dataArraySizeSet(ctx: StateContext<DataStateModel>, { size }: DataArraySizeSet) {
    this.worker.postMessage(makeWorkerRequest(DataWorkerRequestType.arraySizeSet, size));
  }
}
