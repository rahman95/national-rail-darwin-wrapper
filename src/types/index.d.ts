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
  filter: object;
}

interface StationCallInput {
  station: string;
  options?: object;
}

interface ServiceCallInput {
  serviceID?: string;
}

type ApiResponse = Array<ApiStationResult | ApiServiceResult>;

interface ApiStationResult {
  GetStationBoardResult: {
    trainServices: {
      service: object;
    };
  };
}

interface ApiServiceResult {
  GetServiceDetailsResult: object;
}

interface FormattedResponse {
  success: boolean;
  data: object;
}
