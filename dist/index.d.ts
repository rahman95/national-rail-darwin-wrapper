import './types/index';
declare class NationalRailWrapper {
    private apiToken;
    private wsdlUrl;
    private soapHeader;
    private soapClient;
    constructor(token: ApiToken);
    private initClient;
    getDepartures(options: StationCallOptions): Promise<StationFormattedResponse>;
    getArrivals(options: StationCallOptions): Promise<StationFormattedResponse>;
    getAll(options: StationCallOptions): Promise<StationFormattedResponse>;
    getServiceDetails({ serviceId }: ServiceCallInput): Promise<ServiceFormattedResponse>;
    private parseStationOptions;
    private invoke;
    private formatResult;
}
export { NationalRailWrapper };
