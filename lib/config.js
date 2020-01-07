"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./types/index");
exports.wsdlUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16';
exports.getSoapHeader = (apiToken) => {
    return { AccessToken: { TokenValue: apiToken } };
};
exports.wsdlMethodMap = new Map([
    ['getDepartures', 'GetDepartureBoardAsync'],
    ['getArrivals', 'GetArrivalBoardAsync'],
    ['getAll', 'GetArrivalDepartureBoardAsync'],
    ['getServiceDetails', 'GetServiceDetailsAsync'],
]);
//# sourceMappingURL=config.js.map