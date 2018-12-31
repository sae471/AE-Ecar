import { SortDirection } from "../resource/enums";

// export interface IRequest {
//     filters :IFilter;
//     sort :ISort;
//     page:number;
//     take:number;
// }

export interface IFilter {
    field :string;
    logic :string;
    operator :string;
    value :any
}

export interface ISort {
    direction :SortDirection;
    field :string;
}