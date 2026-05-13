import dotenv from 'dotenv';
dotenv.config();

export const zaloPayConfig = {
    app_id: process.env.ZALOPAY_APP_ID || "2553",
    key1: process.env.ZALOPAY_KEY1 || "",
    key2: process.env.ZALOPAY_KEY2 || "",
    endpoint: process.env.ZALOPAY_ENDPOINT || "https://sb-openapi.zalopay.vn/v2/create",
    callback_url: process.env.ZALOPAY_CALLBACK_URL || ""
};