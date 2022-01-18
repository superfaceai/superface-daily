const { SuperfaceClient } = require('@superfaceai/one-sdk');

const sdk = new SuperfaceClient();

async function getWeather() {
  // Load the installed profile
  const profile = await sdk.getProfile('weather/current-city');

  // Use the profile
  const result = await profile.getUseCase('GetCurrentWeatherInCity').perform({
    city: 'Prague, Czech Republic',
    units: 'C',
  });

  return result.unwrap();
}

async function run() {
  try {
    console.log(await getWeather());
  } catch (e) {
    console.error('Error performing weather/current-city');
    console.error(e);
    process.exit(1);
  }
}

run();
