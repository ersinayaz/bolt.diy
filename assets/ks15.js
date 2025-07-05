const nowDate = new Date();

class BridgeMessage {
    constructor(type = "response", caller = "", statusCode = 200, body = null, error = null) {
        this.type = type;
        this.caller = caller;
        this.statusCode = statusCode;

        this.body =
            body == null
                ? null
                : typeof body === "string"
                    ? body
                    : JSON.stringify(body);

        if (type === "response" && error != null) {
            this.error = {
                code: error.code ?? null,
                message: error.message ?? ""
            };
        }
    }

    toJSON() {
        const result = {
            type: this.type,
            caller: this.caller,
            statusCode: this.statusCode
        };

        if (this.body != null) {
            result.body = this.body;
        }

        if (this.error) {
            result.error = this.error;
        }

        return result;
    }

    static send(type, caller, statusCode, body, error = null) {
        const response = new BridgeMessage(type, caller, statusCode, body, error);
        const payload = JSON.stringify(response.toJSON());

        if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === "function") {
            window.ReactNativeWebView.postMessage(payload);
        } else {
            console.log(`BridgeMessage`, response.toJSON());
        }
        return response;
    }

    static request(caller, body) {
        return this.send("request", caller, 200, body);
    }

    static response(caller, statusCode, body, error = null) {
        return this.send("response", caller, statusCode, body, error);
    }
};

const globals = {
    debug: false,
    baseUrl: "https://api.kosmosvize.com.tr/api",
    referrer: "https://basvuru.kosmosvize.com.tr/",
    tokenKey: "Yh71OoPMuBY8T50ocWvJFw",
    recaptchaSiteKey: "6LcwI6ApAAAAAJPe3MGEqLsqUnijh45z0Jfvycg9",
    hours: [
        { "id": 11, "code": "A", "name": "08.15" },
        { "id": 12, "code": "A", "name": "08.30" },
        { "id": 13, "code": "A", "name": "08.45" },
        { "id": 14, "code": "B", "name": "09.00" },
        { "id": 15, "code": "B", "name": "09.15" },
        { "id": 101, "code": "B", "name": "09.30" },
        { "id": 102, "code": "B", "name": "09.45" },
        { "id": 103, "code": "C", "name": "10.00" },
        { "id": 104, "code": "C", "name": "10.15" },
        { "id": 105, "code": "C", "name": "10.30" },
        { "id": 106, "code": "D", "name": "11.00" },
        { "id": 107, "code": "D", "name": "11.15" },
        { "id": 108, "code": "D", "name": "11.30" },
        { "id": 146, "code": "A", "name": "08.00" },
        { "id": 255, "code": "C", "name": "10.45" },
        { "id": 281, "code": "D", "name": "11.45" },
        { "id": 282, "code": "E", "name": "12.00" },
        { "id": 283, "code": "E", "name": "12.15" },
        { "id": 284, "code": "E", "name": "12.30" },
        { "id": 285, "code": "E", "name": "12.45" },
        { "id": 286, "code": "F", "name": "13.00" },
        { "id": 287, "code": "F", "name": "13.15" },
        { "id": 288, "code": "F", "name": "13.30" },
        { "id": 289, "code": "F", "name": "13.45" },
        { "id": 290, "code": "G", "name": "14.00" },
        { "id": 291, "code": "G", "name": "14.15" },
        { "id": 292, "code": "G", "name": "14.30" },
        { "id": 293, "code": "G", "name": "14.45" },
        { "id": 294, "code": "H", "name": "15.00" },
        { "id": 295, "code": "H", "name": "15.15" },
        { "id": 296, "code": "H", "name": "15.30" },
        { "id": 297, "code": "H", "name": "15.45" },
        { "id": 298, "code": "I", "name": "16.00" },
        { "id": 299, "code": "I", "name": "16.15" },
        { "id": 300, "code": "I", "name": "16.30" },
        { "id": 301, "code": "I", "name": "16.45" },
        { "id": 302, "code": "J", "name": "17.00" },
        { "id": 303, "code": "J", "name": "17.15" },
        { "id": 304, "code": "J", "name": "17.30" },
        { "id": 305, "code": "J", "name": "17.45" },
        { "id": 2043, "code": "Z", "name": "07.00" },
        { "id": 2044, "code": "Z", "name": "07.15" },
        { "id": 2045, "code": "Z", "name": "07.30" },
        { "id": 2046, "code": "Z", "name": "07.45" }
    ],
    endPoints: {
        SendLoginOTP: "Verification/SendSmsVerificationCode",
        ValidateLoginOTP: "Verification/ValidateSmsCode",
        GetDealers: "Dealers/GetDealers",
        GetCities: "Cities/GetCities",
        GetHours: "AdminDatas/getDatas?dataType=AppointmentHour",
        GetToday: "AdminDatas/GetToday",
        GetAppointmentTypes: "AdminDatas/getDatas?dataType=AppointmentType",
        GetAmount: "AdminDatas/GetDatasById?id=2349",
        GetMaxRequestCount: "AdminDatas/GetDatasById?id=2355",
        GetSmsExpirationTime: "AdminDatas/GetDatasById?id=2356",
        GetMaxAppointmentDate: "AdminDatas/GetDatasById?id=2329",
        SendLog: "eventlogs/CreateRegisterformlog",
    },
    today: `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}-${String(nowDate.getDate()).padStart(2, '0')}`
};

const config = {
    people: [],
    dealerId: 1,
    maxDate: "",
    appointmentTypeId: 2339,
    customers: []
};

class token {
    static set(token) {
        localStorage.setItem(globals.tokenKey, token);
        // BridgeMessage.response("token.set", token);
        return token;
    }

    static get() {
        const data = localStorage.getItem(globals.tokenKey);
        // BridgeMessage.response("token.get", data);
        return data;
    }

    static remove() {
        localStorage.removeItem(globals.tokenKey);
    }
};

const init = (dealerId, appointmentTypeId, people) => {
    config.dealerId = dealerId;
    config.appointmentTypeId = appointmentTypeId;
    config.people = people;

    return config;
};

const data = {
    dates: [],
    hours: [],
    captchaToken: "",
};

const request = async (endpoint, method = "GET", body = null) => {
    if (globals.debug)
        BridgeMessage.request(endpoint, body);

    const headers = {
        "accept": "application/json",
        "content-type": "application/json"
    };

    const tokenVal = token.get();
    if (tokenVal)
        headers["Authorization"] = `Bearer ${tokenVal}`;

    return fetch(`${globals.baseUrl}/${endpoint}`, {
        method,
        headers,
        referrer: globals.referrer,
        body: body ? JSON.stringify(body) : null
    })
        .then(response => {
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                return response.json().then(data => ({ status: response.status, data }));
            } else {
                return response.text().then(data => ({ status: response.status, data }));
            }
        })
        .then(({ status, data }) => {
            if (globals.debug)
                return BridgeMessage.response(endpoint, status, data);

            const result = { status, data };
            if (status !== 200) {
                result.error = {
                    code: status,
                    message: data
                }
            }
            return result;
        })
        .catch(err => {
            const errorResponse = {
                status: 500,
                data: null,
                error: {
                    code: 500,
                    message: err.message || "İstek hatası"
                }
            };
        
            if (globals.debug) {
                BridgeMessage.response(endpoint, 500, errorResponse.error);
            }
        
            return errorResponse;
        });
};

const requestSync = (caller, endpoint, method = "GET", body = null) => {
    if (globals.debug)
        BridgeMessage.request(caller, body);

    const xhr = new XMLHttpRequest();
    xhr.open(method, `${globals.baseUrl}/${endpoint}`, false);

    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/json");

    const tokenVal = token.get();
    if (tokenVal)
        xhr.setRequestHeader("Authorization", `Bearer ${tokenVal}`);

    try {
        xhr.send(body ? JSON.stringify(body) : null);

        let data = null;
        const contentType = xhr.getResponseHeader("content-type") || "";

        if (contentType.includes("application/json")) {
            data = JSON.parse(xhr.responseText);
        } else {
            data = xhr.responseText;
        }

        if (globals.debug)
            return BridgeMessage.response(caller, xhr.status, data);
        return {
            status: xhr.status,
            data: data,
            error: xhr.status !== 200 ? {
                code: xhr.status,
                message: xhr.statusText
            } : null
        }
    } catch (err) {
        return BridgeMessage.response(caller, null, {
            code: 500,
            message: err.message
        });
    }
};

const decrypt = (encryptedString) => {
    return new Promise((resolve, reject) => {
        if (window.CryptoJS) {
            try {
                const key = CryptoJS.enc.Utf8.parse('aRöÜ@9/*½&7&$£]_?/ç');
                const iv = CryptoJS.enc.Utf8.parse('0000000000000000');

                const decrypted = CryptoJS.AES.decrypt(encryptedString, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });

                const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
                const decryptedData = JSON.parse(decryptedText);
                resolve(decryptedData);
            } catch (err) {
                console.log("Decrypt veya JSON parse hatası: " + err.message);
                resolve([]);
            }
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
            script.onload = () => {
                decrypt(encryptedString).then(resolve).catch(reject);
            };
            script.onerror = () => reject("CryptoJS script yüklenemedi.");
            document.head.appendChild(script);
        }
    });
};

const solveRecaptcha = async (clientKey) => {
    const data = {};  // data objesi burada tanımlandı

    try {
        const createRes = await fetch("https://api.capmonster.cloud/createTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientKey,
                task: {
                    type: "NoCaptchaTaskProxyless",
                    websiteURL: `${globals.referrer}appointmentform`,
                    websiteKey: `${globals.recaptchaSiteKey}`,
                },
            }),
        });

        const createJson = await createRes.json();

        if (createJson.errorId !== 0) {
            throw new Error(`Task creation failed: ${createJson.errorDescription || createJson.errorCode}`);
        }

        const taskId = createJson.taskId;

        const startTime = Date.now();

        while (Date.now() - startTime < 30000) {
            await new Promise((r) => setTimeout(r, 500));

            const resultRes = await fetch("https://api.capmonster.cloud/getTaskResult", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientKey,
                    taskId,
                }),
            });

            const resultJson = await resultRes.json();

            if (resultJson.errorId !== 0) {
                data.captchaToken = null;
                return null;
            }

            if (resultJson.status === "ready") {
                data.captchaToken = resultJson.solution.gRecaptchaResponse;
                return data.captchaToken;
            }
        }

        // 30 saniye içinde sonuç gelmediyse
        data.captchaToken = null;
        return null;
    } catch (error) {
        console.error("solveRecaptcha error:", error);
        return null;
    }
};

const sendLoginOTP = async () => {
    return await request(globals.endPoints.SendLoginOTP, "POST", { "people": config.people });
};

const validateLoginOTP = async (otp) => {
    const response = await request(globals.endPoints.ValidateLoginOTP, "POST", { "people": config.people, "code": otp });
    token.set(response.data.token);
    return response;
};

const getCustomerData = async (nationalityNumber) => {
    await request(`PaymentAndRefundTransactions/GetPaymentInfoAppointmentCustomer2?nationalityNumber=${nationalityNumber}&actionType=newAppointment`);
    const customerData = await request(`Customers/GetByTC?value=${nationalityNumber}&status=undefined`);
    config.customers[nationalityNumber] = customerData.data;
    return customerData.data;
};

const getAllCustomerData = async () => {
    for (const person of config.people) {
        await getCustomerData(person.tckn);
        await new Promise(resolve => setTimeout(resolve, ms));
    }
};

const getClosedDates = async () => {
    const response = await request(`AppointmentClosedDates/GetClosedDate?dealerId=${config.dealerId}&date=${globals.today}&maxDate=${config.maxDate}&appointmentTypeId=${config.appointmentTypeId}`);
    const closedDates = await decrypt(response.data);
    const formattedClosedDates = closedDates.map(dateStr => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('sv-SE', {
            timeZone: 'Europe/Istanbul'
        }).format(date);
    });

    const todayStr = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Istanbul' }).format(new Date());

    if (!formattedClosedDates.includes(todayStr)) {
        formattedClosedDates.unshift(todayStr);
    }

    return formattedClosedDates;
};

const getOpenDates = async (closedDates) => {

    if (!closedDates)
        closedDates = await getClosedDates();

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const cDates = closedDates.map(d => formatDate(new Date(d)));
    const maxDate = new Date(config.maxDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    const oDates = [];

    for (let date = new Date(today); date <= maxDate; date.setDate(date.getDate() + 1)) {
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);

        const dateStr = formatDate(currentDate);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const isClosed = cDates.includes(dateStr);

        if (!isWeekend && !isClosed) {
            oDates.push(dateStr);
        }
    }
    data.dates = oDates;
    return oDates;
};

const staticRequest = async () => {
    await request(globals.endPoints.GetDealers);
    await request(globals.endPoints.GetCities);
    await request(globals.endPoints.GetHours);
    await request(globals.endPoints.GetToday);
    await request(globals.endPoints.GetAppointmentTypes);
    await request(globals.endPoints.GetAmount);
    await request(globals.endPoints.GetMaxRequestCount);
    await request(globals.endPoints.GetSmsExpirationTime);

    const maxAppointmentDate = await request(globals.endPoints.GetMaxAppointmentDate);
    if (maxAppointmentDate.status == 200) {
        config.maxDate = maxAppointmentDate.data[0].name;
    }

    return config;
}