import { DataItem } from '@bb/common';

export enum DataWorkerResponseType {
  data
}

export type DataWorkerResponseDataType = DataItem[];

export interface DataWorkerResponse {
  type: DataWorkerResponseType;
  data: DataWorkerResponseDataType;
}

export const sendResponse = (type: DataWorkerResponseType, data: DataWorkerResponseDataType) => {
  postMessage({
    type,
    data
  } as DataWorkerResponse);
};
