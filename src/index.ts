import soap, { Client } from 'soap';
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
    this.initClient();
  }

  private async initClient(): Promise<void> {
    const client = await soap.createClientAsync(this.wsdlUrl);

    if (!client) {
      throw new Error('An error occured trying to retrieve Soap Client');
    }

    client.addSoapHeader(this.soapHeader);
    this.soapClient = client;
  }

  public async getDepartures({ station, arguments }: StationCallInput): Promise<any> {
    const methodName = wsdlMethodMap.get('getDepartures');

    const filterArgs = {
      crs: station,
      filterType: 'to',
    };

    return this.invoke({ methodName, arguments: filterArgs });
  }

  //   public getArrivals({ station, arguments }: StationCallInput) {}

  //   public getAll({ station, arguments }: StationCallInput) {}

  //   public getServiceDetails({ serviceID }: ServiceCallInput) {}

  private async invoke({ methodName, arguments }: InvokeCallInput): Promise<any> {
    if (!methodName) {
      throw new Error(`Method with name '${methodName}' not found in WsdlMap`);
    }

    const client = this.soapClient;

    // @ts-ignore
    return client[`${methodName}Async`](arguments);
  }
}

const apiToken = 'ABC123';
const wrapper = new NationalRailWrapper(apiToken);

const fn = async () => {
  const res = await wrapper.getDepartures({ station: 'LDS' });

  return res;
};

console.log(fn());
