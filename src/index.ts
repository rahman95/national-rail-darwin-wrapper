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
      console.log(err);
      throw new Error('An error occured trying to retrieve Soap Client');
    }
  }

  public async getDepartures({ station, options }: StationCallInput): Promise<any> {
    const methodName = wsdlMethodMap.get('getDepartures');

    const filter = {
      crs: station,
      filterType: 'to',
    };

    console.log({ options });

    return this.invoke({ methodName, filter });
  }

  //   public getArrivals({ station, arguments }: StationCallInput) {}

  //   public getAll({ station, arguments }: StationCallInput) {}

  //   public getServiceDetails({ serviceID }: ServiceCallInput) {}

  private async invoke({ methodName, filter }: InvokeCallInput): Promise<FormattedResponse> {
    if (!this.soapClient) {
      await this.initClient();
    }

    if (!methodName) {
      throw new Error(`Method with name '${methodName}' not found in WsdlMap`);
    }

    try {
      // @ts-ignore
      return this.formatResult(await this.soapClient[methodName](filter));
    } catch (err) {
      console.log({ err });
      throw new Error('An error occured fetching data from Api');
    }
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

// const apiToken = 'ABC123';
// const wrapper = new NationalRailWrapper(apiToken);

// const fn = async () => {
//   const res = await wrapper.getDepartures({ station: 'LDS' });

//   console.log({ res });

//   return res;
// };

// fn();
