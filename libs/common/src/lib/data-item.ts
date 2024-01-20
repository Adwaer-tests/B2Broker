import {DataItemChild} from "./data-item-child";

export interface DataItem {
    id: string;
    int: number;
    float: string;
    color: string;
    child: DataItemChild;
}

