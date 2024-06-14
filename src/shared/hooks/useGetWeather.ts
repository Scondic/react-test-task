import { useEffect, useState } from "react";

import { weatherService } from "../../core/api";
import type { WeatherEntity } from "../../core/api";

import { ForecastVariableDaily } from "../enums";

interface IHook {
  latitude: number;
  longitude: number;
  variables: ForecastVariableDaily[];
}

export const useGetWeather = ({ latitude, longitude, variables }: IHook) => {
  const [weather, setWeather] = useState<WeatherEntity | null>(null);

  useEffect(() => {
    weatherService
      .getWeatherByLocation({
        params: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          daily: variables.join(","),
          timezone: "Europe/Moscow",
          past_days: "0",
        },
      })
      .then((response) => {
        setWeather(response.data);
      });
  }, [variables]);

  return { weather };
};
