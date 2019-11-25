import { Admited } from "./admited";

export class Retiro {
  id?: string;
  codigoAdmision?: string;
  withdrawalCode?: string;

  contact: String;
  contactPhone: string;

  date: Date;
  horaDesde: Date;
  horaHasta: Date;

  rut?: string;
  address?: string;
  comuna?: string;
  region?: string;
  zip?: string;

  orders?: Admited[];

  createdAt?: Date;
  updatedAt?: Date;
}
