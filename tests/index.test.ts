import { NationalRailWrapper } from '../src/index';

describe('Test Wrapper Class', () => {
  let apiWrapper: NationalRailWrapper;
  const maxTimeout = 10000;

  beforeAll(() => {
    const apiToken = process.env.API_TOKEN;

    if (!apiToken) {
      fail('No Api Token found');
    }

    apiWrapper = new NationalRailWrapper(apiToken);
  });

  test(
    'should throw an error with an invalid api_key',
    async () => {
      const apiToken = 'FAKE_API_KEY';
      const incorrectApiWrapper = new NationalRailWrapper(apiToken);

      try {
        await incorrectApiWrapper.getDepartures({ station: 'LDS' });
      } catch (err) {
        expect(err.message).toBe('Cannot parse response');
        expect(err.response.statusCode).toBe(401);
      }
    },
    maxTimeout
  );

  test('should return all departures from LDS', async () => {
    const stationDetails = await apiWrapper.getDepartures({ station: 'LDS' });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          operator: 'TransPennine Express',
          operatorCode: 'TP',
        }),
        expect.objectContaining({
          operator: 'Northern',
          operatorCode: 'NT',
        }),
      ])
    );
  });

  test('should return all departures from LDS limited only to 3', async () => {
    const stationDetails = await apiWrapper.getDepartures({ station: 'LDS', count: 3 });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toHaveLength(3);
  });

  test('should return all arrivals from LDS', async () => {
    const stationDetails = await apiWrapper.getArrivals({ station: 'LDS' });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          operator: 'TransPennine Express',
          operatorCode: 'TP',
        }),
        expect.objectContaining({
          operator: 'Northern',
          operatorCode: 'NT',
        }),
      ])
    );
  });

  test('should return all arrivals from LDS limited only to 3', async () => {
    const stationDetails = await apiWrapper.getArrivals({ station: 'LDS', count: 3 });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toHaveLength(3);
  });

  test('should return all arrivals and departutes from LDS', async () => {
    const stationDetails = await apiWrapper.getAll({ station: 'LDS' });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          operator: 'TransPennine Express',
          operatorCode: 'TP',
        }),
        expect.objectContaining({
          operator: 'Northern',
          operatorCode: 'NT',
        }),
      ])
    );
  });

  test('should return all arrivals and departutes from LDS limited only to 3', async () => {
    const stationDetails = await apiWrapper.getAll({ station: 'LDS', count: 3 });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toHaveLength(3);
  });

  // test.only('should return service details for certain serviceId', async () => {
  //   const stationDetails = await apiWrapper.getAll({ station: 'LDS', count: 1 });
  //   const [service] = stationDetails.data;
  //   const serviceId = 'EAI95j3wwH8ygSkzWZJwxA==';

  //   expect(service).toHaveProperty('serviceID');
  //   expect(service).toHaveProperty('operator');
  //   expect(service).toHaveProperty('operatorCode');

  //   const serviceDetails = await apiWrapper.getServiceDetails({ serviceID: serviceId });
  //   const [details] = serviceDetails.data;

  //   expect(service.rsid).toBe(details.rsid);
  //   expect(service.operator).toBe(details.operator);
  //   expect(service.operatorCode).toBe(details.operatorCode);
  // });
});
