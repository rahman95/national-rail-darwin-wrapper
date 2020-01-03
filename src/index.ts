import { Client, createClientAsync } from 'soap';
import { wsdlUrl, getSoapHeader, wsdlMethodMap } from './config';

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

  public async getDepartures(options: StationCallOptions): Promise<FormattedResponse> {
    const methodName = wsdlMethodMap.get('getDepartures');
    const filter = { ...this.parseOptions(options), filterType: 'to' };

    return this.invoke({ methodName, filter });
  }

  public getArrivals(options: StationCallOptions): Promise<FormattedResponse> {
    const methodName = wsdlMethodMap.get('getArrivals');
    const filter = { ...this.parseOptions(options), filterType: 'from' };

    return this.invoke({ methodName, filter });
  }

  public getAll(options: StationCallOptions): Promise<FormattedResponse> {
    const methodName = wsdlMethodMap.get('getAll');
    const filter = this.parseOptions(options);

    return this.invoke({ methodName, filter });
  }

  public getServiceDetails({ serviceID }: ServiceCallInput): Promise<FormattedResponse> {
    const methodName = wsdlMethodMap.get('getServiceDetails');
    const filter = { serviceID };

    return this.invoke({ methodName, filter });
  }

  private parseOptions({ station, count }: StationCallOptions): FilterObject {
    const filter: FilterObject = {
      crs: station,
    };

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

    // @ts-ignore
    const response = await this.soapClient[methodName](filter);
    return this.formatResult(response);
  }

  private formatResult(response: ApiResponse): FormattedResponse {
    const [data] = response;
    let res;

    if (Object.prototype.hasOwnProperty.call(data, 'GetServiceDetailsResult')) {
      const { GetServiceDetailsResult: serviceData } = data as ApiServiceResult;
      res = serviceData;
    } else {
      const { GetStationBoardResult: stationData } = data as ApiStationResult;
      res = stationData.trainServices.service;
    }

    return {
      success: true,
      data: res,
    };
  }
}

export { NationalRailWrapper };
