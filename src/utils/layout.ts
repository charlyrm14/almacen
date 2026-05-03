import { 
    type Product, 
    type AreaItem, 
    type SectionItem,
    type Rack,
    type Cell
} from "@/types/Layout";

export const areas: AreaItem[] = [
    { id: 'cold', label: 'Cámaras frías', icon: 'snowflake' },
    { id: 'shrinkage', label: 'Área merma', icon: 'alert' },
    { id: 'maquila', label: 'Maquila', icon: 'factory' },
    { id: 'loading', label: 'Áreas de carga/descarga', icon: 'truck' },
    { id: 'trash', label: 'Desechos', icon: 'trash' },
    { id: 'office', label: 'Oficinas', icon: 'office' },
    { id: 'dining', label: 'Comedor', icon: 'food' }
]

export const sections: SectionItem[] = [
    { id: 1, slug: 'section-a', label: 'Sección A', icon: 'one' },
    { id: 2, slug: 'section-b', label: 'Sección B', icon: 'two' },
    { id: 3, slug: 'section-c', label: 'Sección C', icon: 'three' },
    { id: 4, slug: 'section-d', label: 'Sección D', icon: 'four' },
    { id: 5, slug: 'section-e', label: 'Sección E', icon: 'five' },
    { id: 6, slug: 'section-f', label: 'Sección F', icon: 'six' },
    { id: 7, slug: 'section-g', label: 'Sección G', icon: 'seven' },
]

const generateCells = (total: number, levels: number): Cell[] => {
    const cells: Cell[] = []

    for (let level = 1; level <= levels; level++) {
        for (let i = 1; i <= total; i++) {
            cells.push({
                position: i,
                level,
                enabled: true
            })
        }
    }

    return cells
}

export const RACKS: Rack[] = [
    {
        id: 1,
        key: 'E2',
        area: 'merma',
        section: 'E',
        subsection: '2',
        rows: 19,
        columns: 4,
        levels: 5,
        cells: generateCells(76, 5)
    },
    {
        id: 2,
        key: 'E1',
        area: 'merma',
        section: 'E',
        subsection: '1',
        rows: 19,
        columns: 2,
        levels: 5,
        cells: generateCells(38, 5)
    },
    {
        id: 3,
        key: 'D3',
        area: 'section-d',
        section: 'D',
        subsection: '3',
        rows: 7,
        columns: 4,
        levels: 5,
        cells: generateCells(28, 5)
    },
    {
        id: 4,
        key: 'D2',
        area: 'section-d',
        section: 'D',
        subsection: '2',
        rows: 7,
        columns: 4,
        levels: 5,
        cells: generateCells(28, 5)
    },
    {
        id: 5,
        key: 'D1',
        area: 'section-d',
        section: 'D',
        subsection: '1',
        rows: 4,
        columns: 2,
        levels: 5,
        cells: generateCells(8, 5)
    },
    {
        id: 6,
        key: 'C1',
        area: 'section-c',
        section: 'C',
        subsection: '1',
        rows: 4,
        columns: 2,
        levels: 5,
        cells: generateCells(8, 5)
    },
    {
        id: 7,
        key: 'B1',
        area: 'section-b',
        section: 'B',
        subsection: '1',
        rows: 4,
        columns: 19,
        levels: 5,
        cells: generateCells(76, 5)
    },
    {
        id: 8,
        key: 'A2',
        area: 'section-a',
        section: 'A',
        subsection: '2',
        rows: 7,
        columns: 4,
        levels: 5,
        cells: generateCells(28, 5)
    },
    {
        id: 9,
        key: 'A1',
        area: 'section-a',
        section: 'A',
        subsection: '1',
        rows: 7,
        columns: 4,
        levels: 5,
        cells: generateCells(28, 5)
    },
    {
        id: 10,
        key: 'G7',
        area: 'section-g',
        section: 'G',
        subsection: '7',
        rows: 16,
        columns: 1,
        levels: 5,
        cells: generateCells(16, 5)
    },
    {
        id: 11,
        key: 'G6',
        area: 'section-g',
        section: 'G',
        subsection: '6',
        rows: 13,
        columns: 2,
        levels: 5,
        cells: generateCells(26, 5)
    },
    {
        id: 12,
        key: 'G5',
        area: 'section-g',
        section: 'G',
        subsection: '5',
        rows: 11,
        columns: 2,
        levels: 5,
        cells: generateCells(22, 5)
    },
    {
        id: 13,
        key: 'G4',
        area: 'section-g',
        section: 'G',
        subsection: '4',
        rows: 11,
        columns: 2,
        levels: 5,
        cells: generateCells(22, 5)
    },
    {
        id: 14,
        key: 'G3',
        area: 'section-g',
        section: 'G',
        subsection: '3',
        rows: 9,
        columns: 2,
        levels: 5,
        cells: generateCells(18, 5)
    },
    {
        id: 15,
        key: 'G2',
        area: 'section-g',
        section: 'G',
        subsection: '2',
        rows: 7,
        columns: 2,
        levels: 5,
        cells: generateCells(14, 5)
    },
    {
        id: 16,
        key: 'G1',
        area: 'section-g',
        section: 'G',
        subsection: '1',
        rows: 7,
        columns: 2,
        levels: 5,
        cells: generateCells(14, 5)
    },
    {
        id: 17,
        key: 'F4',
        area: 'section-f',
        section: 'F',
        subsection: '4',
        rows: 18,
        columns: 2,
        levels: 5,
        cells: generateCells(36, 5)
    },
    {
        id: 18,
        key: 'F3-3',
        area: 'section-f',
        section: 'F',
        subsection: '3',
        rows: 6,
        columns: 4,
        levels: 5,
        cells: generateCells(24, 5)
    },
    {
        id: 19,
        key: 'F3-2',
        area: 'section-f',
        section: 'F',
        subsection: '3',
        rows: 1,
        columns: 3,
        levels: 5,
        cells: generateCells(3, 5)
    },
    {
        id: 20,
        key: 'F3-1',
        area: 'section-f',
        section: 'F',
        subsection: '3',
        rows: 6,
        columns: 4,
        levels: 5,
        cells: generateCells(24, 5)
    },
    {
        id: 21,
        key: 'F2-3',
        area: 'section-f',
        section: 'F',
        subsection: '2',
        rows: 6,
        columns: 4,
        levels: 5,
        cells: generateCells(24, 5)
    },
    {
        id: 22,
        key: 'F2-2',
        area: 'section-f',
        section: 'F',
        subsection: '2',
        rows: 1,
        columns: 3,
        levels: 5,
        cells: generateCells(3, 5)
    },
    {
        id: 23,
        key: 'F2-1',
        area: 'section-f',
        section: 'F',
        subsection: '2',
        rows: 6,
        columns: 4,
        levels: 5,
        cells: generateCells(24, 5)
    },
    {
        id: 24,
        key: 'F1',
        area: 'section-f',
        section: 'F',
        subsection: '1',
        rows: 17,
        columns: 2,
        levels: 5,
        cells: generateCells(34, 5)
    }
]

export const PRODUCTS: Product[] = [
    {
        sku: 'SKU-100',
        name: 'Producto 1',
        locations: [
            { 
                rack: 'E2', 
                position: 5, 
                level: 1 
            },
            { 
                rack: 'E1', 
                position: 5, 
                level: 1 
            }
        ]
    },
    {
        sku: 'SKU-200',
        name: 'Producto 2',
        locations: [
            { 
                rack: 'E2', 
                position: 20, 
                level: 1 
            }
        ]
    },
    {
        sku: 'SKU-300',
        name: 'Producto 3',
        locations: [
            { 
                rack: 'D3', 
                position: 15, 
                level: 1 
            },
            { 
                rack: 'E1', 
                position: 30, 
                level: 1 
            }
        ]
    }
]