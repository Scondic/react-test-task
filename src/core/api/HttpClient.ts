export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private createSearchParams(params: SearchParams) {
    const searchParams = new URLSearchParams();

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];

        if (Array.isArray(value)) {
          value.forEach((currentValue) =>
            searchParams.append(key, currentValue),
          );
        } else if (value) {
          searchParams.set(key, value);
        }
      }
    }

    return `?${searchParams.toString()}`;
  }

  private async request<T>(
    endpoint: string,
    method: RequestInit["method"],
    options: RequestOptions,
  ) {
    const config = {
      ...options,
      url: endpoint,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(!!options?.headers && options.headers),
      },
    };

    let endpointUrl = `${this.baseUrl}/${endpoint}`;

    if (options.params) {
      endpointUrl += this.createSearchParams(options.params);
    }

    const response: Response = await fetch(endpointUrl, config);

    return {
      status: response.status,
      statusText: response.statusText,
      data: (await response.json()) as unknown as T,
    };
  }

  get<T>(endpoint: string, options: Omit<RequestOptions, "body"> = {}) {
    return this.request<T>(endpoint, "GET", options);
  }

  delete<T>(endpoint: string, options: Omit<RequestOptions, "body"> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }

  post<T>(
    endpoint: string,
    body?: Record<string, any>,
    options: RequestOptions = {},
  ) {
    return this.request<T>(endpoint, "POST", {
      ...options,
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }

  put<T>(
    endpoint: string,
    body?: Record<string, any>,
    options: RequestOptions = {},
  ) {
    return this.request<T>(endpoint, "PUT", {
      ...options,
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }

  patch<T>(
    endpoint: string,
    body?: Record<string, any>,
    options: RequestOptions = {},
  ) {
    return this.request<T>(endpoint, "PATCH", {
      ...options,
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }
}

export const api = new HttpClient(
  `${process.env.REACT_APP_WEATHER_BASE_URL}/${process.env.REACT_APP_WEATHER_VERSION_API}`,
);
