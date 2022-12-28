export interface ISales {
    id?: string;
    entryNo: number;
    source: string;
    partnerId: string;

    partner: string;
    documentType: string;

    code: string;

    documentLineNo: string;

    date: Date;

    no: string;

    quantity: string;

    uom: string;
    unitPrice: number;

    netAmount: number;
    gst: number;

    discount: number;

    cardPaidAmount: number;

    loyaltyPoints: number;

    promotionTxrn: string;

    costShareOnDiscountAmount: number;

    loyaltyShareAmount: number;

    commissionValue: number;

    promoCommissionValue: number;

    commissionAmount: number;

    costShareAmount: number;
    createdBy?: string;

    createdDate?: Date;

    lastmodifiedBy?: string;

    lastmodifiedDate?: Date

}