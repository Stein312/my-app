export interface TableDataRowType {
    key: number,
    name: string,
    age: number,
    address: string
}
export interface RowType {
    name: string,
    age: number,
    address: string
}

export type TableDatesState = { dates: TableDataRowType[] }