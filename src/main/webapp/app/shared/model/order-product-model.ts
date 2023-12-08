export interface IOrderProduct {
    full_name: string
    phone_number: string
    email: string
    delivery: string
    address: string
    total_amount: number
    buy_by: string
    tenor: string
    pay_month: number
    total_money_product: number
}

export interface IOrderProductList {
    page: number
    size: number
    paid: boolean
}

export interface IPaidOrderProduct {
    id: string
    paid: boolean
}

export interface IDeleteOrderProduct {
    id: string
    delete: boolean
}