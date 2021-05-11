import { AxiosStatic} from 'axios';

export interface StormGlassPointSource {
    [key : string]: number
}
export interface StormGlassPoint {
    readonly time: string;
    readonly waveHeight: StormGlassPointSource;
    readonly waveDirection: StormGlassPointSource;
    readonly swellDirection: StormGlassPointSource;
    readonly swellHeight: StormGlassPointSource;
    readonly swellPeriod: StormGlassPointSource;
    readonly windDirection: StormGlassPointSource;
    readonly windSpeed: StormGlassPointSource;
}
export interface StormGlassForecastResponse {
    hours: StormGlassPoint[];

}

export interface ForecastPoint{
    time:string;
    waveHeight: number;
    waveDirection: number;
    swellDirection: number;
    swellHeight: number;
    swellPeriod: number;
    windDirection: number;
    windSpeed: number;
}
export class StormGlass {
    readonly stormGlassAPIParams =
     'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
    readonly stormGlassAPISource = 'noaaa';
    constructor(protected request: AxiosStatic) {}
    public async fetchPoints(lat: number, lng: number): Promise<[]> {
        const response = this.request.get<StormGlassForecastResponse>(
            `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&end=1592113802&lat=${lat}&lng=${lng}`);      
    }
    private normalizeResponse(points: StormGlassForecastResponse
        ): ForecastPoint[] {
            return points.hours.filter()
        }

        private isValidPoint(point: Partial<StormGlassPoint>): boolean {
            return !!(
                point.time && 
                point.waveHeight?.[this.stormGlassAPISource] && 
                point.waveDirection?.[this.stormGlassAPISource] &&
                point.swellDirection?.[this.stormGlassAPISource] && 
                point.swellHeight?.[this.stormGlassAPISource] && 
                point.swellPeriod?.[this.stormGlassAPISource] &&
                point.windDirection?.[this.stormGlassAPISource] &&
                point.windSpeed?.[this.stormGlassAPISource]
            );
        }
}

