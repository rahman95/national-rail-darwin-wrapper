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

  test('should return all arrivals from DEW', async () => {
    const stationDetails = await apiWrapper.getArrivals({ station: 'DEW' });

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

  test('should return all departures from DEW limited only to 3', async () => {
    const stationDetails = await apiWrapper.getArrivals({ station: 'DEW', count: 3 });

    expect(stationDetails).toHaveProperty('success');
    expect(stationDetails.success).toBeTruthy();

    expect(stationDetails).toHaveProperty('data');
    expect(stationDetails.data).toHaveLength(3);
  });
});
