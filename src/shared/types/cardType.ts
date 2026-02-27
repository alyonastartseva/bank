export type CardBrand = "mastercard" | "visa"

export type cardType = {
    id: string;
    number: string;
    holder: string;
    expiryDate: string;
    cvv: string;
    brand: CardBrand;
}