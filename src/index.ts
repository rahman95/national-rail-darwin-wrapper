import { Client, createClientAsync } from 'soap';
import { wsdlUrl, getSoapHeader, wsdlMethodMap } from './config';
import './types/index';

class NationalRailWrapper {
  private apiToken: ApiToken;

  private wsdlUrl: WsdlUrl;

  private soapHeader: SoapHeader;

  private soapClient: Client | undefined;

  public constructor(token: ApiToken) {
    this.apiToken = token;
    this.wsdlUrl = wsdlUrl;
    this.soapHeader = getSoapHeader(this.apiToken);
  }

  private async initClient(): Promise<void> {
    try {
      const client = await createClientAsync(this.wsdlUrl);
      client.addSoapHeader(this.soapHeader);
      this.soapClient = client;
    } catch (err) {
      throw new Error('An error occured trying to retrieve Soap Client');
    }
  }

  public async getDepartures(options: StationCallOptions): Promise<StationFormattedResponse> {
    const methodName = wsdlMethodMap.get('getDepartures');
    const filter = { ...this.parseStationOptions(options), filterType: 'to' };

    return this.invoke({ methodName, filter }) as Promise<StationFormattedResponse>;
  }

  public getArrivals(options: StationCallOptions): Promise<StationFormattedResponse> {
    const methodName = wsdlMethodMap.get('getArrivals');
    const filter = { ...this.parseStationOptions(options), filterType: 'from' };

    return this.invoke({ methodName, filter }) as Promise<StationFormattedResponse>;
  }

  public getAll(options: StationCallOptions): Promise<StationFormattedResponse> {
    const methodName = wsdlMethodMap.get('getAll');
    const filter = this.parseStationOptions(options);

    return this.invoke({ methodName, filter }) as Promise<StationFormattedResponse>;
  }

  public getServiceDetails({ serviceId }: ServiceCallInput): Promise<ServiceFormattedResponse> {
    const methodName = wsdlMethodMap.get('getServiceDetails');
    const filter = { serviceID: serviceId };

    return this.invoke({ methodName, filter }) as Promise<ServiceFormattedResponse>;
  }

  private parseStationOptions({ fromStation, toStation, count = 10 }: StationCallOptions): FilterObject {
    const filter: FilterObject = {
      crs: fromStation,
    };

    if (toStation) {
      filter.filterCrs = toStation;
    }

    if (count) {
      filter.numRows = count;
    }

    return filter;
  }

  private async invoke({ methodName, filter }: InvokeCallInput): Promise<FormattedResponse> {
    if (!this.soapClient) {
      await this.initClient();
    }

    if (!methodName) {
      throw new Error(`Method with name '${methodName}' not found in WsdlMap`);
    }

    const response = this.soapClient && (await this.soapClient[methodName](filter));

    return this.formatResult(response);
  }

  private formatResult(response: ApiResponse): FormattedResponse {
    const [data] = response;
    let res = null;

    if (Object.prototype.hasOwnProperty.call(data, 'GetServiceDetailsResult')) {
      const { GetServiceDetailsResult: serviceData } = data as ApiServiceResult;
      res = serviceData;
    }

    if (Object.prototype.hasOwnProperty.call(data, 'GetStationBoardResult')) {
      const { GetStationBoardResult: stationData } = data as ApiStationResult;
      res = stationData.trainServices.service;
    }

    return {
      success: res !== null,
      data: res !== null ? res : [],
    };
  }
}

export { NationalRailWrapper };
