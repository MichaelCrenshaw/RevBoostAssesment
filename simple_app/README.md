# Introduction
It is heavily recommended to run the app in production mode inside a docker container, for both performance, and namespace hygiene.

I briefly considered using the MusicBrainz API to tie into TADB's API, however that is also limited behind a paywall.

## Api issues
It appears that The Audio Database's API has been heavily limited beyond the scope of this assignment, since it is designed to only return results for Coldplay. The app is designed around this, but still built as if the restriction didn't exist.

## Production
The following command will start a docker container, build the app, and run it bound on [localhost:3000](http://localhost:3000):
```bash
cd ./simple_app &&
docker-compose up
```

## Development
To run the app in dev mode, run the following command:
```bash
cd ./simple_app
pnpm install
pnpm run dev -o
```