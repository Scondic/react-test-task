import { api } from "../HttpClient";

import type { WeatherEntity } from "../contracts/weather/schemas";

// Получение погоды
export type GetWeatherParams = SearchParams & {
  latitude: string;
  longitude: string;
  daily: string;
  timezone: string;
  past_days: string;
};

export type GetWeatherConfig = FetchRequestConfig<GetWeatherParams>;

export class WeatherService {
  async getWeatherByLocation(requestConfig?: GetWeatherConfig) {
    return await api.get<WeatherEntity>("forecast", requestConfig);
  }
}

export const weatherService = new WeatherService();
