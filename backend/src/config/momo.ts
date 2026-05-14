export const momoConfig = {
    partnerCode: process.env.MOMO_PARTNER_CODE || '',
    accessKey: process.env.MOMO_ACCESS_KEY || '',
    secretKey: process.env.MOMO_SECRET_KEY || '',
    endpoint:    process.env.MOMO_ENDPOINT     || 'https://test-payment.momo.vn/v2/gateway/api/create',
    redirectUrl: process.env.MOMO_REDIRECT_URL || 'https://techmartvn.xyz/api/payments/momo/return',
    ipnUrl:      process.env.MOMO_IPN_URL      || 'https://techmartvn.xyz/api/payments/momo/ipn',
}