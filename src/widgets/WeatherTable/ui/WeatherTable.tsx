import React from "react";

import { ForecastVariableDaily } from "../../../shared/enums";

import type { WeatherEntity } from "../../../core/api";

import "./styles.css";

interface IProps {
  data: WeatherEntity;
  variables: ForecastVariableDaily[];
}

export const WeatherTable = ({ data, variables }: IProps) => {
  const hasDataExists = data && data.daily && data.daily.time;

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>date</th>
            {variables.map((variable) => (
              <th key={variable}>{variable}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {hasDataExists &&
            data.daily.time.map((time, index) => (
              <tr key={time}>
                <td>{time}</td>
                {variables.map((variable) => (
                  <td key={`${variable}-${time}-${index}`}>
                    {data.daily?.[variable]?.[index]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
