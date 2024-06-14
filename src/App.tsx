import React, { useCallback, useState } from "react";

import { WeatherTable } from "./widgets/WeatherTable";

import { ForecastVariableDaily } from "./shared/enums";

import { useGetWeather } from "./shared/hooks/useGetWeather";

import "./App.css";

const latitude = 55.751244;
const longitude = 37.618423;

export const App = () => {
  const [variables, setVariables] = useState<ForecastVariableDaily[]>([
    ForecastVariableDaily.WEATHERCODE,
    ForecastVariableDaily.TEMPERATURE_2M_MAX,
    ForecastVariableDaily.TEMPERATURE_2M_MIN,
    ForecastVariableDaily.APPARENT_TEMPERATURE_MAX,
    ForecastVariableDaily.APPARENT_TEMPERATURE_MIN,
    // ForecastVariableDaily.SUNRISE,
    // ForecastVariableDaily.SUNSET,
    // ForecastVariableDaily.PRECIPITATION_SUM,
    // ForecastVariableDaily.RAIN_SUM,
    // ForecastVariableDaily.SHOWERS_SUM,
    // ForecastVariableDaily.SNOWFALL_SUM,
    // ForecastVariableDaily.PRECIPITATION_HOURS,
    ForecastVariableDaily.WINDSPEED_10M_MAX,
    ForecastVariableDaily.WINDGUSTS_10M_MAX,
    // ForecastVariableDaily.WINDDIRECTION_10M_DOMINANT,
    // ForecastVariableDaily.SHORTWAVE_RADIATION_SUM,
    // ForecastVariableDaily.ET0_FAO_EVAPOTRANSPIRATION,
  ]);

  const { weather } = useGetWeather({ latitude, longitude, variables });

  const onSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      const target = event.target as typeof event.target & {
        variable: { value: ForecastVariableDaily | "" };
      };

      const variable = target.variable.value as ForecastVariableDaily;

      if (Object.values(ForecastVariableDaily).includes(variable)) {
        setVariables((prev) => [...prev, variable]);
      }
    },
    [variables],
  );

  return (
    <div className="main">
      <h3>Все доступные переменные:</h3>
      <ul>
        {Object.entries(ForecastVariableDaily).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <div>
        <form onSubmit={onSubmit}>
          <label>
            Введите переменную
            <input
              type="text"
              name="variable"
              placeholder="Введите переменную"
            />
          </label>
          <button type="submit">Добавить</button>
        </form>
      </div>

      {weather && <WeatherTable data={weather} variables={variables} />}
    </div>
  );
};
