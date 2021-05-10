import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormGlass_normalized_weather_3_hours.json';
jest.mock('axios');

describe('StormGlass client',  () => {
    it('should return the normalized forecast from the StormGlass service', async() => {
        const lat = -33.792726;
        const lng = 151.289824;

        axios.get = jest.fn().mockResolvedValueOnce(stormGlassWeather3HoursFixture);

        const stormGlass = new StormGlass();
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual(stormGlassNormalized3HoursFixture);

    });
});