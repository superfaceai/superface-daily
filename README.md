# Superface Daily Test

Daily test to verify minimal Superface functionality.

## What is tested

Entire flow from clean system to performing created integration.

Integration is created on MacOS and then performed on MacOS, Linux and Windows.

Perform is tested for Python (3.8 and 3.11) and Node.js (20 and 21).

## Triggers

- Cron: to automatically run the test at least once a day
- Workflow Dispatch: to manually run the test
- Repository Dispatch: to allow trigger the build by other Workflows or external tools

## Notifications

- Message to slack channel

## Needed secrets

- `SLACK_CHANNEL` - to what channel notification about failed test should be sent
- `SLACK_BOT_TOKEN` - to allow posting notification to slack channel
- `SUPERFACE_REFRESH_TOKEN` - to have authenticated user while isntalling profiles
- `SUPERFACE_SDK_TOKEN` - to report performs to Superface Dashboard
- `SUPERFACE_DAILY_USERNAME` and `SUPERFACE_DAILY_PASSWORD` - to authenticate against local server
