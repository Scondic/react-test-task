// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
interface Date {
  toISOString(): TDateISO;
}

type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;
type Hours = `${number}${number}`;
type Minutes = `${number}${number}`;
type Seconds = `${number}${number}`;
type Milliseconds = `${number}${number}${number}`;

// 2024-06-13
type DateISODate = `${Year}-${Month}-${Day}`;
// 14:56:13.374
type DateISOTime = `${Hours}:${Minutes}:${Seconds}.${Milliseconds}`;

// https://en.wikipedia.org/wiki/ISO_8601
type DateISO = `${DateISODate}T${DateISOTime}Z`;

type SearchParams = { [key: string]: string | string[] | undefined };
interface RequestOptions extends RequestInit {
  params?: SearchParams;
}

type FetchRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: RequestInit }
  : { params: Params; config?: RequestInit };
