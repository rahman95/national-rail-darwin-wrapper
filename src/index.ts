import soap, { Client } from 'soap';

class NationalRailWrapper {
  private apiToken: ApiToken;

  private wsdlUrl: WsdlUrl;

  private soapHeader: SoapHeader;

  private soapClient: Client | undefined;

  public constructor(token: ApiToken) {
    this.apiToken = token;
    this.wsdlUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16';
    this.soapHeader = { AccessToken: { TokenValue: this.apiToken } };
    this.initClient();
  }

  private async initClient(): Promise<void> {
    const client = await soap.createClientAsync(this.wsdlUrl);
    client.addSoapHeader(this.soapHeader);
    this.soapClient = client;
  }

  public getDepartures() {}

  public getArrivals() {}

  public getAll() {}

  public getServiceDetails() {}

  private invoke({ methodName, arguments }: InvokeInput) {
    const client = this.soapClient;
    const res = client[`${methodName}Async`](arguments);
  }
}

const apiToken = 'ABC123';
const wrapper = new NationalRailWrapper(apiToken);

wrapper.getDepartures();
