#!/bin/bash

set -xeuo pipefail

node --version
npm --version

npm install @superfaceai/cli@0.0.27-beta.0 @superfaceai/one-sdk@0.0.41-beta.0

npm list
npx superface --version

npx superface install weather/current-city
npx superface configure wttr-in --profile=weather/current-city

npx superface install communication/send-email
npx superface configure postmark --profile=communication/send-email
