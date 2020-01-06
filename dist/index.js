"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const soap_1 = require("soap");
const config_1 = require("./config");
require("./types/index");
class NationalRailWrapper {
    constructor(token) {
        this.apiToken = token;
        this.wsdlUrl = config_1.wsdlUrl;
        this.soapHeader = config_1.getSoapHeader(this.apiToken);
    }
    initClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield soap_1.createClientAsync(this.wsdlUrl);
                client.addSoapHeader(this.soapHeader);
                this.soapClient = client;
            }
            catch (err) {
                throw new Error('An error occured trying to retrieve Soap Client');
            }
        });
    }
    getDepartures(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = config_1.wsdlMethodMap.get('getDepartures');
            const filter = Object.assign(Object.assign({}, this.parseStationOptions(options)), { filterType: 'to' });
            return this.invoke({ methodName, filter });
        });
    }
    getArrivals(options) {
        const methodName = config_1.wsdlMethodMap.get('getArrivals');
        const filter = Object.assign(Object.assign({}, this.parseStationOptions(options)), { filterType: 'from' });
        return this.invoke({ methodName, filter });
    }
    getAll(options) {
        const methodName = config_1.wsdlMethodMap.get('getAll');
        const filter = this.parseStationOptions(options);
        return this.invoke({ methodName, filter });
    }
    getServiceDetails({ serviceId }) {
        const methodName = config_1.wsdlMethodMap.get('getServiceDetails');
        const filter = { serviceID: serviceId };
        return this.invoke({ methodName, filter });
    }
    parseStationOptions({ station, count = 10 }) {
        const filter = {
            crs: station,
        };
        if (count) {
            filter.numRows = count;
        }
        return filter;
    }
    invoke({ methodName, filter }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.soapClient) {
                yield this.initClient();
            }
            if (!methodName) {
                throw new Error(`Method with name '${methodName}' not found in WsdlMap`);
            }
            const response = this.soapClient && (yield this.soapClient[methodName](filter));
            return this.formatResult(response);
        });
    }
    formatResult(response) {
        const [data] = response;
        let res = null;
        if (Object.prototype.hasOwnProperty.call(data, 'GetServiceDetailsResult')) {
            const { GetServiceDetailsResult: serviceData } = data;
            res = serviceData;
        }
        if (Object.prototype.hasOwnProperty.call(data, 'GetStationBoardResult')) {
            const { GetStationBoardResult: stationData } = data;
            res = stationData.trainServices.service;
        }
        return {
            success: res !== null,
            data: res !== null ? res : [],
        };
    }
}
exports.NationalRailWrapper = NationalRailWrapper;
//# sourceMappingURL=index.js.map