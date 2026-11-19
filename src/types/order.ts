export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
  };
}

export interface CreateOrderPayload {
  customer: OrderCustomer;
  items: OrderItem[];
  paymentMethod: "pix" | "card" | "boleto";
}
