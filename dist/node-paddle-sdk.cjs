'use strict';

var got = require('got');
var crypto = require('crypto');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class PaddleHttpError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
class PaddleSDK {
    constructor(vendorId, vendorAuthCode, publicKey, server) {
        this.vendorId = vendorId;
        this.vendorAuthCode = vendorAuthCode;
        this.publicKey = publicKey;
        this.server = server || 'https://vendors.paddle.com/api/2.0';
        if (this.server.endsWith('/')) {
            this.server = this.server.substring(0, this.server.length - 1);
        }
    }
    _request(method, path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.server}${path}`;
            const res = yield got(url, {
                method,
                form: Object.assign({ vendor_id: this.vendorId, vendor_auth_code: this.vendorAuthCode }, (body || {})),
            }).json();
            if (res.success === true) {
                return res.response;
            }
            throw new PaddleHttpError(res.error.code, res.error.message);
        });
    }
    listCoupons(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/list_coupons', parameters);
        });
    }
    createCoupon(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/create_coupon', parameters);
        });
    }
    deleteCoupon(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/delete_coupon', parameters);
        });
    }
    updateCoupon(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/update_coupon', parameters);
        });
    }
    listProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/get_products');
        });
    }
    generateLicense(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/generate_license', parameters);
        });
    }
    generatePayLink(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/product/generate_pay_link', parameters);
        });
    }
    listTransactions(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { entity, entity_id } = parameters, rest = __rest(parameters, ["entity", "entity_id"]);
            return this._request('POST', `/${entity}/${entity_id}/transactions`, rest);
        });
    }
    refundPayment(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/payment/refund', parameters);
        });
    }
    listPlans(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/plans', parameters);
        });
    }
    createPlan(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/plans_create', parameters);
        });
    }
    listUsers(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/users', parameters);
        });
    }
    updateUser(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/users/update', parameters);
        });
    }
    cancelUser(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/users_cancel', parameters);
        });
    }
    listModifiers(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/modifiers', parameters);
        });
    }
    createModifier(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/modifiers/create', parameters);
        });
    }
    deleteModifier(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/modifiers/delete', parameters);
        });
    }
    listPayments(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/payments', parameters);
        });
    }
    reschedulePayment(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/subscription/payments_reschedule', parameters);
        });
    }
    createOneOffCharge(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscription_id } = parameters, rest = __rest(parameters, ["subscription_id"]);
            return this._request('POST', `/subscription/${subscription_id}/charge`, rest);
        });
    }
    getWebhookHistory(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('POST', '/alert/webhooks', parameters);
        });
    }
    verifyWebhook(body) {
        if (!this.publicKey) {
            throw new Error('You must provide a publicKey when using the verifyWebhook method.');
        }
        const p_signature = body === null || body === void 0 ? void 0 : body.p_signature;
        const alert_name = body === null || body === void 0 ? void 0 : body.alert_name;
        if (!p_signature) {
            throw new Error('No p_signature field was found in the request body.');
        }
        if (!alert_name) {
            throw new Error('No alert_name field was found in the request body.');
        }
        const sorted = {};
        Object.keys(body)
            .filter((key) => key !== 'p_signature')
            .sort()
            .forEach((key) => (sorted[key] = body[key]));
        const serialized = require('locutus/php/var/serialize')(sorted);
        try {
            const verifier = crypto.createVerify('sha1');
            verifier.write(serialized);
            verifier.end();
            return verifier.verify(this.publicKey, p_signature, 'base64');
        }
        catch (err) {
            return false;
        }
    }
}

exports.PaddleSDK = PaddleSDK;
