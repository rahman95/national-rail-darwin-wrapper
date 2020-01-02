type WsdlUrl = string;

interface SoapHeader {
  AccessToken: AccessToken;
}

interface AccessToken {
  TokenValue: ApiToken;
}

type ApiToken = string;

interface InvokeInput {
  methodName: string;
  arguments: object;
}
