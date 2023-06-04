export interface Employment {
  id: number;
  ruc: number;
  name: String;
  description: String;
  creationDate: Date;
  address: String;
  phone: String;
  email: String;
  requirements: String;
  salary: number;
  isAvailable: boolean;
  postuants: number[];
}
