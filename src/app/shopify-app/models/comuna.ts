import { Sucursal } from './sucursal';

export class Comuna {
    id?: number;
    name: string;
    sucursales?: Sucursal[] = [];
}
