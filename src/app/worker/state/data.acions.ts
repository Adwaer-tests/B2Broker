import { DataItem } from '@bb/common';

export class DataWorkerStart {
  static readonly type = '[Data] Start';
}

export class DataWorkerStop {
  static readonly type = '[Data] Stop';
}

export class DataSend {
  static readonly type = '[Data] Send';

  constructor(public items: DataItem[]) {
  }
}

export class DataIdsSet {
  static readonly type = '[Data] Set Ids';

  constructor(public numbers: string[]) {
  }
}

export class DataArraySizeSet {
  static readonly type = '[Data] Set Array Size';

  constructor(public size: number) {
  }
}

export class DataTimerSet {
  static readonly type = '[Data] Set Timer';

  constructor(public timer: number) {
  }
}
