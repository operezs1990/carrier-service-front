import { Admission } from "./admission";

export class Admited {
  id?: string;
  kg: number;
  orderNumber: number;
  receiverAddress: string;
  receiverContactName: string;
  serviceCode: string;
  subtotalPrice: string;
  totalPieces: number;
  totalPrice: string;
  admission?: Admission;
}
