import './types/index';

export const wsdlUrl: WsdlUrl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16';

export const getSoapHeader = (apiToken: ApiToken): SoapHeader => {
  return { AccessToken: { TokenValue: apiToken } };
};

export const wsdlMethodMap: Map<string, string> = new Map([
  ['getDepartures', 'GetDepartureBoardAsync'],
  ['getArrivals', 'GetArrivalBoardAsync'],
  ['getAll', 'GetArrivalDepartureBoardAsync'],
  ['getServiceDetails', 'GetServiceDetailsAsync'],
]);
