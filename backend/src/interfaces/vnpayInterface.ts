export interface VNPayParams {
    vnp_Version: string;
    vnp_Command: string
    vnp_CreateDate: string;
    vnp_BankCode?: string;
    vnp_TmnCode: string;
    vnp_Amount: number;
    vnp_CurrCode: string;
    vnp_TxnRef: string;
    vnp_OrderInfo: string;
    vnp_OrderType: string;
    vnp_Locale: string;
    vnp_ReturnUrl: string;
    vnp_IpAddr: string;
    vnp_SecureHash?: string;
    [key: string]: any; // Cho phép truy cập bằng key string để sắp xếp
}

export interface VNPayReturnResponse {
    vnp_Amount: number;
    vnp_BankCode: string;
    vnp_BankTranNo?: string;
    vnp_CardType: string;
    vnp_OderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TxnRef: string;
    vnp_SecureHash: string;
    [key: string]: any; // Cho phép truy cập bằng key string để xác thực
}
