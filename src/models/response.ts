export enum Status {
  notYetRequest = 'notYetRequest',
  loading = 'loading',
  success = 'success',
  failure = 'failure',
}

export interface IResponse<T> {
  status: Status;
  res: T | null;
}
