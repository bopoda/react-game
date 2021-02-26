export interface CellConfigInterface {
    value: CellValueType
    solution: CellSolutionType
    prefilled: boolean
    row: number
    col: number
}

export type CellSolutionType = 1 | 2 | 3 |4 | 5 | 6| 7 | 8 | 9

export type CellValueType = 0 | CellSolutionType
