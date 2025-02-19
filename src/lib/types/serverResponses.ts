export type ShortenSuccess = {
  message: string;
  statusCode: number;
  data: {
    shortLink: string;
  };
};

export type ShortenError = {
  error: string;
  message: string[];
  statusCode: 400;
};
