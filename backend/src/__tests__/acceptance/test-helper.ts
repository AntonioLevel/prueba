import {BackendApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const config = givenHttpServerConfig();

  // Set host to `HOST` env var or ipv4 loopback interface
  // By default, docker container has ipv6 disabled.
  config.host = config.host || process.env.HOST || '127.0.0.1';

  // Set port to `PORT` env var or `0`
  config.port = config.port || +(process.env.PORT || 0);

  const app = new BackendApplication({
    rest: config,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: BackendApplication;
  client: Client;
}
