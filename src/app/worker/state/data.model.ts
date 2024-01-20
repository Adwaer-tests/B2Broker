import { DataItem } from '@bb/common';

export interface DataStateModel {
  items: DataItem[];
  top10Items: DataItem[];
  top10Ids: string[]
}
