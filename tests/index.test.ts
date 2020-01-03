import { NationalRailWrapper } from '../src/index';

describe('Test Wrapper Class', () => {
  let apiWrapper: NationalRailWrapper;

  beforeAll(() => {
    const apiToken = process.env.API_TOKEN;

    if (!apiToken) {
      fail('No Api Token found');
    }

    console.log({ apiToken });

    // apiWrapper = new NationalRailWrapper(apiToken);
  });

  test('should throw an error with an invalid api_key', async () => {
    const apiToken = 'FAKE_API_KEY';
    const incorrectApiWrapper = new NationalRailWrapper(apiToken);

    const res = await incorrectApiWrapper.getDepartures({ station: 'LDS' });

    expect(async () => {
      await incorrectApiWrapper.getDepartures({ station: 'LDS' });
    }).toThrow(TypeError);
  });

  //   test('should return all departures from LDS', () => {});
});
