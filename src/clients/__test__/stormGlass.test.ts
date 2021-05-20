import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormglassNormalizedResponseFixture from '@test/fixtures/stormGlass_normalized_weather_3_hours.json';
jest.mock('axios');

describe('StormGlass client',  () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    it('should return the normalized forecast from the StormGlass service', async() => {
        const lat = -33.792726;
        const lng = 151.289824;

    
        mockedAxios.get.mockResolvedValueOnce({data: stormGlassWeather3HoursFixture});

        const stormGlass = new StormGlass(axios);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual(stormglassNormalizedResponseFixture);
    });
        it('should exclude incomplete data points', async () => {
            const lat = -33.792726;
            const lng = 151.289824;
            const incompleteResponse = {
                hours: [
                    {
                        windDirection: {
                            noaa:300,
                        },
                        time: '2020-04-26T00:00:00+00:00',
                    },
                ],
            };
            mockedAxios.get.mockResolvedValue({ data: incompleteResponse});

            const stormGlass = new StormGlass(mockedAxios);
            const response = await stormGlass.fetchPoints(lat, lng);

            expect(response).toEqual([]);
        });

        it('should get a generic error from StormGlass service when the request fail before reaching the service', async () => {
            const lat = -33.792726;
            const lng = 151.289824;

            mockedAxios.get.mockRejectedValue({ message: 'Network Error'});

            const stormGlass = new StormGlass()
        })
});

//module storm glass