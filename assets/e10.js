window.baseUrl = "https://api.kosmosvize.com.tr/api";
window.referrer = "https://basvuru.kosmosvize.com.tr/";
window.recaptchaSiteKey = "6LcwI6ApAAAAAJPe3MGEqLsqUnijh45z0Jfvycg9";
window.people = [];
window.dealerId = 5;
window.appointmentTypeId = 2339;
window.today = "";
window.maxAppointmentDate = "";
window.customers = [];
window.appointmentOTP = "";
window.recaptchaToken = "";
window.dayHours = [];
window.closedDates = [];
window.openDates = [];
window.hours = [{ "id": 11, "code": "A", "name": "08.15" }, { "id": 12, "code": "A", "name": "08.30" }, { "id": 13, "code": "A", "name": "08.45" }, { "id": 14, "code": "B", "name": "09.00" }, { "id": 15, "code": "B", "name": "09.15" }, { "id": 101, "code": "B", "name": "09.30" }, { "id": 102, "code": "B", "name": "09.45" }, { "id": 103, "code": "C", "name": "10.00" }, { "id": 104, "code": "C", "name": "10.15" }, { "id": 105, "code": "C", "name": "10.30" }, { "id": 106, "code": "D", "name": "11.00" }, { "id": 107, "code": "D", "name": "11.15" }, { "id": 108, "code": "D", "name": "11.30" }, { "id": 146, "code": "A", "name": "08.00" }, { "id": 255, "code": "C", "name": "10.45" }, { "id": 281, "code": "D", "name": "11.45" }, { "id": 282, "code": "E", "name": "12.00" }, { "id": 283, "code": "E", "name": "12.15" }, { "id": 284, "code": "E", "name": "12.30" }, { "id": 285, "code": "E", "name": "12.45" }, { "id": 286, "code": "F", "name": "13.00" }, { "id": 287, "code": "F", "name": "13.15" }, { "id": 288, "code": "F", "name": "13.30" }, { "id": 289, "code": "F", "name": "13.45" }, { "id": 290, "code": "G", "name": "14.00" }, { "id": 291, "code": "G", "name": "14.15" }, { "id": 292, "code": "G", "name": "14.30" }, { "id": 293, "code": "G", "name": "14.45" }, { "id": 294, "code": "H", "name": "15.00" }, { "id": 295, "code": "H", "name": "15.15" }, { "id": 296, "code": "H", "name": "15.30" }, { "id": 297, "code": "H", "name": "15.45" }, { "id": 298, "code": "I", "name": "16.00" }, { "id": 299, "code": "I", "name": "16.15" }, { "id": 300, "code": "I", "name": "16.30" }, { "id": 301, "code": "I", "name": "16.45" }, { "id": 302, "code": "J", "name": "17.00" }, { "id": 303, "code": "J", "name": "17.15" }, { "id": 304, "code": "J", "name": "17.30" }, { "id": 305, "code": "J", "name": "17.45" }, { "id": 2043, "code": "Z", "name": "07.00" }, { "id": 2044, "code": "Z", "name": "07.15" }, { "id": 2045, "code": "Z", "name": "07.30" }, { "id": 2046, "code": "Z", "name": "07.45" }];

window.endPoints = {
    "SendLoginOTP": "Verification/SendSmsVerificationCode",
    "ValidateLoginOTP": "Verification/ValidateSmsCode",
    "GetDealers": "Dealers/GetDealers",
    "GetCities": "Cities/GetCities",
    "GetHours": "AdminDatas/getDatas?dataType=AppointmentHour",
    "GetToday": "AdminDatas/GetToday",
    "GetAppointmentTypes": "AdminDatas/getDatas?dataType=AppointmentType",
    "GetAmount": "AdminDatas/GetDatasById?id=2349",
    "GetMaxRequestCount": "AdminDatas/GetDatasById?id=2355",
    "GetSmsExpirationTime": "AdminDatas/GetDatasById?id=2356",
    "GetMaxAppointmentDate": "AdminDatas/GetDatasById?id=2329",
    "SendLog": "eventlogs/CreateRegisterformlog",
    // "PaymentAndRefundTransactions": "PaymentAndRefundTransactions/GetPaymentInfoAppointmentCustomer2?nationalityNumber=xxxxxxxx&actionType=newAppointment",
    // "GetByTc": "Customers/GetByTC?value=xxxxxxxx&status=undefined",
    // "GetClosedDates": "AppointmentClosedDates/GetClosedDate?dealerId=1&date=2025-06-15&maxDate=2025-08-01&appointmentTypeId=16",
    // "GetHours": "AppointmentLayouts/GetAppointmentHourQoutaInfo?nationalityNumber=xxxxxxxx&dealerId=5&date=2025/06/24&appointmentTypeId=16&onlyAvailable=true&recaptchaToken=recaptchaToken&applicationType=1(bireysel)-2(aile)",
    // "SendAppointmentOTP": "PaymentAndRefundTransactions/SendSms?customerId=xxxx&nationalityNumber=xxxxxxxx",
    // "PostAppointment": "AppointmentCustomers/Appointment?lang=tr&smsCode=xxxx&paymentCustomerId=xxxx",
    // "PaymentIframeUrl": "https://api.kosmosvize.com.tr/sipay?customerBarcodes=xxxxx&paymentCustomerBarcode=xxxx",
};

window.solveRecaptcha = async (clientKey) => {
    const createRes = await fetch("https://api.capmonster.cloud/createTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            clientKey,
            task: {
                type: "NoCaptchaTaskProxyless",
                websiteURL: `${window.referrer}appointmentform`,
                websiteKey: `${window.recaptchaSiteKey}`,
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
            window.recaptchaToken = "";
            return null;
            // throw new Error(`Get result failed: ${resultJson.errorDescription || resultJson.errorCode}`);
        }

        if (resultJson.status === "ready") {
            window.recaptchaToken = resultJson.solution.gRecaptchaResponse;
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "window.request.response",
                data: {
                    callerName: "solveRecaptcha",
                    status: 200,
                    error: false,
                    data: resultJson.solution.gRecaptchaResponse
                }
            }));
            return resultJson.solution.gRecaptchaResponse;
        }
    }
    window.recaptchaToken = "";
    return null;
}

window.request = (callerName, endpoint, method = "GET", body = null) => {

    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "window.request",
        callerName: callerName,
        endpoint: endpoint,
        method: method,
        body: body ? JSON.stringify(body) : null,
    }));

    const headers = {
        "accept": "application/json",
        "content-type": "application/json"
    };

    const token = localStorage.getItem('Yh71OoPMuBY8T50ocWvJFw');
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${window.baseUrl}/${endpoint}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
        referrer: window.referrer
    }).then(async response => {
        const responseData = {
            callerName: callerName,
            status: response.status,
            error: response.status !== 200,
            data: null
        };

        if (response.headers.get("content-type")?.includes("application/json")) {
            responseData.data = await response.json();
        } else {
            responseData.data = await response.text();
        }

        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "window.request.response",
            data: responseData
        }));


        return responseData;
    }).catch(error => {
        const responseData = {
            callerName: callerName,
            status: 0,
            error: true,
            errorMessage: error.message
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(responseData));
        return responseData;
    });
};

window.decryptEncryptedData = (encryptedString) => {
    //const data = await decryptEncryptedData("qkapExX0wHbcCCAJ98nKidrFpf2Il6+JaBTF8wEooPDXWYX6iVvfn4QMSLxBHq+hiXG+m+xi/gJwpxICRZdvZ1QDVW4GJ2+Q4NfPaOBd2rrY59SOIIyqzppOWD9ZDu5glnmQA/YbnYJkgW1QJnRXg4Qj3m9GDPl/fdxLqbPpiX1SqovE0mbISYWbklmwfpbCPqQdPkfXEBDLnIAH+9QKU+6B1CFpKVUv57re79ZK2RXQPHGnqbkUSH3/6uSWdK5JN5lF10jw9a4jHz1pD9qkc+AWM/GZ5tqiM3Dyshee6rwikBVEbDqASDaCRcKAi0GFknXwaW4Hydc4bFblV+qThjCh/1fmuRErcOhe/riC0oHbzDn5IYfctHThVBNymgwRpdY9Q2H5sEOzAADOGI1jRVreX8PLD4Pj1RwlSpsQjK5Xdf5wE3JfZ1fyp1xV2DlZBM0YsfemAB3uUOxw09kqJuAyj7sBMubUl4UguEX8YwLlqaY64oHQWqFgXDipeyTe7hmHSVFM/o9VjRcEyNJjwDHydazk7Owk4xDC4oC25Ggu8vVSKdBPvc7Jx7/zfHzp");
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
            // CryptoJS yüklü değilse yükle ve sonra tekrar çağır
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
            script.onload = () => {
                decryptEncryptedData(encryptedString).then(resolve).catch(reject);
            };
            script.onerror = () => reject("CryptoJS script yüklenemedi.");
            document.head.appendChild(script);
        }
    });
}

window.setToken = (token) => {
    localStorage.setItem('Yh71OoPMuBY8T50ocWvJFw', token);
}

window.setDealer = (id) => {
    window.dealerId = id;
}

window.getToken = () => {
    const token= localStorage.getItem('Yh71OoPMuBY8T50ocWvJFw');
    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "getToken",
        data: token
    }));
    return responseData;
}

window.removeToken = () => {
    return localStorage.removeItem('Yh71OoPMuBY8T50ocWvJFw');
}

window.sendLoginOTP = async (people) => {
    window.people = people;
    return await request("sendLoginOTP", endPoints.SendLoginOTP, "POST", { "people": window.people });
}

window.validateLoginOTP = async (otp) => {
    const response = await request("validateLoginOTP", endPoints.ValidateLoginOTP, "POST", { "people": window.people, "code": otp });
    window.setToken(response.token);
    return response;
}

window.getCustomerData = async (nationalityNumber) => {
    await request("getCustomerData-getPaymentInfo", `PaymentAndRefundTransactions/GetPaymentInfoAppointmentCustomer2?nationalityNumber=${nationalityNumber}&actionType=newAppointment`);
    const customerData = await request("getCustomerData-getByTc", `Customers/GetByTC?value=${nationalityNumber}&status=undefined`);
    // customerData Response example:
    // {
    //     "id": 1687483,
    //     "barcodeNumber": "1808654",
    //     "name": "AH***",
    //     "nameOriginal": "AH***",
    //     "surname": "AY***",
    //     "surnameOriginal": "AY***",
    //     "eMail": "g***m@***",
    //     "address": "Bağdat ***",
    //     "phone": "*****4717",
    //     "nationalityNumber": "16379***",
    //     "passportNo": "U14***",
    //     "appointmentCustomer": null,
    //     "note": null
    // }

    window.customers[nationalityNumber] = customerData;
    return customerData;
}

window.getAllCustomerData = async (ms = 1000) => {
    for (const person of window.people) {
        await window.getCustomerData(person.tckn);
        await new Promise(resolve => setTimeout(resolve, ms));
    }
}

window.sendAppointmentOTP = async () => {
    const [nationalityNumber, data] = Object.entries(window.customers)[0];
    return await request("sendAppointmentOTP", `PaymentAndRefundTransactions/SendSms?customerId=${data.id}&nationalityNumber=${nationalityNumber}`);
}

window.getClosedDates = async () => {
    const response = await request("getClosedDates", `AppointmentClosedDates/GetClosedDate?dealerId=${window.dealerId}&date=${window.today}&maxDate=${window.maxAppointmentDate}&appointmentTypeId=${window.appointmentTypeId}`);
    const closedDates = await window.decryptEncryptedData(response);
    window.closedDates = closedDates.map(dateStr => new Date(dateStr).toISOString().split('T')[0]);



    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "closedDates",
        data: window.closedDates
    }));
    
    return window.closedDates;
}

window.openDates = async () => {
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const closedDates = window.closedDates.map(d => formatDate(new Date(d)));
    const maxDate = new Date(window.maxAppointmentDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    const oDates = [];

    for (let date = new Date(today); date <= maxDate; date.setDate(date.getDate() + 1)) {
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);

        const dateStr = formatDate(currentDate);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const isClosed = closedDates.includes(dateStr);

        if (!isWeekend && !isClosed) {
            oDates.push(dateStr);
        }
    }


    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "openDates",
        data: oDates
    }));
    window.openDates = oDates;
    return oDates;
};

window.getHours = async (date, recaptchaToken) => {
    const [nationalityNumber, customerData] = Object.entries(window.customers)[0];
    const applicationType = Object.entries(window.customers).length == 1 ? 1 : 2;
    const response = await request("getHours", `AppointmentLayouts/GetAppointmentHourQoutaInfo?nationalityNumber=${nationalityNumber}&dealerId=${window.dealerId}&date=${date.replace(/-/g, "/")}&appointmentTypeId=${window.appointmentTypeId}&onlyAvailable=true&recaptchaToken=${window.recaptchaToken}&applicationType=${applicationType}`);
    window.dayHours = await window.decryptEncryptedData(response);



    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "getHours",
        data: {
            date: date,
            hours: window.dayHours
        }
    }));
    return window.dayHours;
}

window.randomAvailableHour = () => {
    const maxIndex = window.dayHours.length - Object.entries(window.customers).length;
    if (maxIndex <= 0) return null;

    const uygunSaatler = window.dayHours.slice(0, maxIndex + 1);
    return Math.floor(Math.random() * uygunSaatler.length);
}

window.appointmentHours = () => {
    const applicantLength = Object.entries(window.customers).length;
    const appointmentHours = [];
    const randomHourIndex = window.randomAvailableHour();
    if (randomHourIndex == null) {
        return null;
    }
    const hourIndex = window.hours.findIndex(f => f.id == parseInt(window.dayHours[randomHourIndex].id));
    let availableCount = 0;
    let iterateIndex = 0;

    do {
        let hour = null;
        if (hourIndex + iterateIndex < window.hours.length) {
            hour = window.hours[hourIndex + iterateIndex];
        } else break;

        if (hour) {
            const availableHour = window.dayHours.find(f => f.appointmentHourId == hour.id);
            if (availableHour && availableHour.availableAppointmentCount > 0) {
                availableCount += 1;
                appointmentHours.push(availableHour);
            }
        }
        iterateIndex++;
    } while (availableCount < applicantLength);

    return appointmentHours;
}

window.appointment = async (appointmentDate) => {
    const [nationalityNumber, data] = Object.entries(window.customers)[0];
    const applicationType = Object.entries(window.customers).length == 1 ? 1 : 2;


    var body = [];

    for (const [tcKimlik, customer] of Object.entries(window.customers)) {
        const item = {
            "date": ``,
            "appointmentHourId": 1,
            "count": Object.entries(window.customers).length,
            "appointmentTypeId": window.appointmentTypeId,
            "applicationTypeId": applicationType,
            "customerId": customer.id,
            "dealerId": window.dealerId,
            "nationalityNumber": tcKimlik,
            "appointmentHourCode": ""
        };

        body.push(item);
    }

    const appointmentHours = window.appointmentHours();
    if (appointmentHours == null) {
        return {
            error: {
                message: "Katılımcı sayısına uygun saat bulunamadı.",
                date: appointmentDate
            }
        }
    }
    body.map((item, index) => {
        const [hourStr, minuteStr] = appointmentHours[index].appointmentHourName.split(".");
        const date = new Date(appointmentDate);

        date.setHours(parseInt(hourStr));
        date.setMinutes(parseInt(minuteStr));
        date.setSeconds(0);
        date.setMilliseconds(0);

        item.appointmentHourCode = appointmentHours[index].appointmentHourCode;
        item.date = date.toISOString();
        item.appointmentHourId = appointmentHours[index].appointmentHourId;
        item.count = 1;
    });

    const response = await request("appointment-post", `AppointmentCustomers/Appointment?lang=tr&smsCode=${window.appointmentOTP}&paymentCustomerId=${data.id}`);
    return response;
}

window.staticRequest = async () => {
    const nowDate = new Date();
    window.today = `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}-${String(nowDate.getDate()).padStart(2, '0')}`;

    await request("staticRequest-getDealers", endPoints.GetDealers);
    await request("staticRequest-getCities", endPoints.GetCities);
    await request("staticRequest-getHours", endPoints.GetHours);
    await request("staticRequest-getToday", endPoints.GetToday);
    await request("staticRequest-getAppointmentTypes", endPoints.GetAppointmentTypes);
    await request("staticRequest-getAmount", endPoints.GetAmount);
    await request("staticRequest-getMaxRequestCount", endPoints.GetMaxRequestCount);
    await request("staticRequest-getSmsExpirationTime", endPoints.GetSmsExpirationTime);

    // kapalı tarihleri sorgulamadan once maxDate'i sorgula:
    const maxAppointmentDate = await window.request("staticRequest-getMaxAppointmentDate", window.endPoints.GetMaxAppointmentDate);
    if (maxAppointmentDate.status == 200) {
        window.maxAppointmentDate = maxAppointmentDate.data[0].name;
    }
}