export type AreaItem = {
    id: string
    label: string
    icon: string
}

export type SectionItem = {
    id: number
    slug: string
    label: string
    icon: string
}

export interface Location {
    rack: string
    position: number 
    level: number
}

export interface Product {
    sku: string,
    name: string,
    locations: Location[]
}

export interface Cell {
    position: number
    level: number
    enabled: boolean
}

export interface Rack {
    id: number
    key: string
    area: string
    section: string
    subsection: string

    rows: number
    columns: number
    levels: number

    cells: Cell[]
}