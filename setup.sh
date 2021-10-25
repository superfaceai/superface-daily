#!/bin/bash

set -xeuo pipefail

node --version
npm --version

npm install @superfaceai/cli @superfaceai/one-sdk

npm list

npx superface install weather/current-city
npx superface configure wttr-in --profile=weather/current-city

npx superface install communication/send-email
npx superface configure postmark --profile=communication/send-email
