import { ForecastVariableDaily } from "../../../../shared/enums";

export interface WeatherDailyEntity
  extends Record<ForecastVariableDaily, string[] | number[] | DateISODate[]> {
  time: DateISODate[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_hours: number[];
  windspeed_10m_max: number[];
  windgusts_10m_max: number[];
  winddirection_10m_dominant: number[];
  shortwave_radiation_sum: number[];
  et0_fao_evapotranspiration: number[];
}

export interface WeatherDailyUnitsEntity {
  time: string;
  weathercode: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise: string;
  sunset: string;
  precipitation_sum: string;
  rain_sum: string;
  showers_sum: string;
  snowfall_sum: string;
  precipitation_hours: string;
  windspeed_10m_max: string;
  windgusts_10m_max: string;
  winddirection_10m_dominant: string;
  shortwave_radiation_sum: string;
  et0_fao_evapotranspiration: string;
}

export type WeatherEntity = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: WeatherDailyUnitsEntity;
  daily: WeatherDailyEntity;
};
