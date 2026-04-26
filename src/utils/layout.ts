import { type Product, type LayoutItem } from "@/types/Layout";

export const GLOBALS = {
    rackLevels: 2
};

const randomProducts = (count: number): Product[] => {
    return Array.from({ length: count }).map((_, i) => ({
        sku: `SKU-${Math.floor(Math.random() * 1000)}`,
        name: `Producto ${i + 1}`,
        position: i
    }));
};

export const layout: LayoutItem[] = [
    { // RACKS INFERIORES
        id: 'A1',
        type: 'rack',
        x: 1,
        y: 12,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    {
        id: 'A2',
        type: 'rack',
        x: 1,
        y: 10,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    { // RACK VERTICAL
        id: 'B1',
        type: 'rack',
        x: 8,
        y: 6,
        w: 1,
        h: 5,
        orientation: 'vertical',
        products: randomProducts(5)
    },
    { // RACKS SUPERIORES IZQUIERDA
        id: 'C1',
        type: 'rack',
        x: 1,
        y: 6,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    {
        id: 'C2',
        type: 'rack',
        x: 1,
        y: 4,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    {
        id: 'C3',
        type: 'rack',
        x: 1,
        y: 2,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    { // RACKS DERECHA
        id: 'D1',
        type: 'rack',
        x: 10,
        y: 4,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    {
        id: 'D2',
        type: 'rack',
        x: 10,
        y: 2,
        w: 6,
        h: 1,
        orientation: 'horizontal',
        products: randomProducts(6)
    },
    { // CÁMARAS FRÍAS (SECCIONES)
        id: 'CF-1',
        type: 'cold_room',
        x: 10,
        y: 6,
        w: 6,
        h: 3,
        temperature: 8 + Math.random() * 4 // 8–12°C
    },
    {
        id: 'CF-2',
        type: 'cold_room',
        x: 10,
        y: 9,
        w: 6,
        h: 3,
        temperature: 2 + Math.random() * 3 // 2–5°C
    },
    {
        id: 'CF-3',
        type: 'cold_room',
        x: 10,
        y: 12,
        w: 6,
        h: 3,
        temperature: -18 + Math.random() * 2 // -18 a -16°C
    }
];

export const findProduct = (sku: string) => {
    for (const item of layout) {
        const found = item.products?.find(p => p.sku === sku);
        if (found) {
        return { item, product: found };
        }
    }
};