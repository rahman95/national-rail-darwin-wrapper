type WsdlUrl = string;

interface SoapHeader {
  AccessToken: AccessToken;
}

interface AccessToken {
  TokenValue: ApiToken;
}

type ApiToken = string;

interface InvokeCallInput {
  methodName?: string;
  arguments: object;
}

interface StationCallInput {
  station: string;
  arguments?: object;
}

interface ServiceCallInput {
  serviceID?: string;
}
