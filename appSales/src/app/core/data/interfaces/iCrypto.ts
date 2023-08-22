export interface ICrypto {
  riper(key: string): string;
  unriper(key: string): string;
}
