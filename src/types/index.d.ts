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

interface StationCallOptions {
  station: string;
  count?: number;
}

interface FilterObject {
  crs: string;
  filterType?: string;
  filterCrs?: string;
  numRows?: number;
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
