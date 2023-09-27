declare global {
  interface Window {
    API_URL: string;
  }
}

export class Config {
  static api_url = window.API_URL;
}
