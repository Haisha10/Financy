export interface Employment {
  id: number;
  ruc: number;
  name: String;
  description: String;
  creationDate: Date;
  address: String;
  phone: number;
  email: String;
  requirements: String;
  salary: number;
  isAvailable: boolean;
  postulants: number[];
}
