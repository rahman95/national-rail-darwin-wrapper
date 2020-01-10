declare type WsdlUrl = string;
interface SoapHeader {
    AccessToken: AccessToken;
}
interface AccessToken {
    TokenValue: ApiToken;
}
declare type ApiToken = string;
interface InvokeCallInput {
    methodName?: string;
    filter?: object;
}
interface StationCallOptions {
    fromStation: string;
    toStation?: string;
    count?: number;
}
interface FilterObject {
    crs: string;
    filterType?: string;
    filterCrs?: string;
    numRows?: number;
}
interface ServiceCallInput {
    serviceId: string;
}
declare type ApiResponse = Array<ApiStationResult | ApiServiceResult>;
interface ServiceInterface {
    sta?: string;
    eta?: string;
    length?: string;
    delayReason?: string;
    origin?: {
        location: object[];
    };
    destination?: {
        location: object[];
    };
    operator: string;
    operatorCode: string;
    rsid?: string;
    serviceID: string;
    serviceType: string;
}
interface ApiStationResult {
    GetStationBoardResult: {
        trainServices: {
            service: Array<ServiceInterface>;
        };
    };
}
interface ApiServiceResult {
    GetServiceDetailsResult: Array<ServiceInterface>;
}
declare type FormattedResponse = StationFormattedResponse | ServiceFormattedResponse;
interface StationFormattedResponse {
    success: boolean;
    data: Array<ServiceInterface>;
}
interface ServiceFormattedResponse {
    success: boolean;
    data: ServiceInterface;
}
