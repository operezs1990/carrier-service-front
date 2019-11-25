import { Comuna } from './comuna';

export class Region {
    id: number;
    code: string;
    name: string;
    rgi: string;
    comunas: Comuna[];
}
