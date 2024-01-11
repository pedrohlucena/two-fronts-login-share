import { AxiosError } from 'axios';

interface QueueRequests {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

const failedRequestQueue: QueueRequests[] = [];

const processQueue = (error: AxiosError | null, accessToken: string | null) => {
  failedRequestQueue.forEach((requestsErrorByAuthorization: QueueRequests) => {
    if (error) {
      requestsErrorByAuthorization.reject(error);
    } else {
      requestsErrorByAuthorization.resolve(accessToken);
    }
  });

  failedRequestQueue.length = 0;
};

export { failedRequestQueue, processQueue };

