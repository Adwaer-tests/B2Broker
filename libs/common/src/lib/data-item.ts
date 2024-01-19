import {DataItemChild} from "./data-item-child";

export interface DataItem {
    id: string;
    int: number;
    float: number;
    color: string;
    child: DataItemChild;
}

