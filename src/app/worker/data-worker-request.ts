export enum DataWorkerRequestType {
  start,
  stop,
  arraySizeSet,
  timerSet
}

export type DataWorkerRequestDataType = string[] | number

export interface DataWorkerRequest {
  type: DataWorkerRequestType;
  data?: DataWorkerRequestDataType;
}

export const makeWorkerRequest = (type: DataWorkerRequestType, data?: DataWorkerRequestDataType): DataWorkerRequest => ({
  type, data
});
