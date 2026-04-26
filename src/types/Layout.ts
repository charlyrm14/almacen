export type LayoutItemType = 'rack' | 'cold_room';

export interface LayoutItem {
    id: string;
    type: LayoutItemType;
    x: number;
    y: number;
    w: number;
    h: number;
    orientation?: 'horizontal' | 'vertical';
    products?: Product[];
    temperature?: number;
}

export interface Product {
    sku: string;
    name: string;
    position: number; // índice de tarima
}