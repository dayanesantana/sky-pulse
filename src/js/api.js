/**
 * Módulo de Integração com a API do Open-Meteo
 */

/**
 * Busca as coordenadas (latitude e longitude) de uma cidade pelo nome.
 * @param {string} cityName Nome da cidade a ser buscada.
 * @returns {Promise<Object>} Dados de geolocalização da cidade.
 */
export async function searchCity(cityName) {
  if (!cityName || cityName.trim() === '') {
    throw new Error('Por favor, digite o nome de uma cidade.');
  }

  const encodedName = encodeURIComponent(cityName.trim());
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedName}&count=1&language=pt&format=json`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Falha na comunicação com o serviço de geolocalização.');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`Cidade "${cityName}" não encontrada. Verifique a ortografia.`);
    }

    const cityData = data.results[0];
    return {
      name: cityData.name,
      state: cityData.admin1 || '',
      country: cityData.country || '',
      countryCode: cityData.country_code || '',
      latitude: cityData.latitude,
      longitude: cityData.longitude,
      timezone: cityData.timezone
    };
  } catch (error) {
    console.error('Erro em searchCity:', error);
    throw error;
  }
}

/**
 * Busca os dados meteorológicos atuais utilizando latitude e longitude.
 * @param {number} lat Latitude.
 * @param {number} lon Longitude.
 * @returns {Promise<Object>} Dados climáticos formatados.
 */
export async function getForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Falha na comunicação com o serviço de previsão do tempo.');
    }

    const data = await response.json();

    if (!data.current) {
      throw new Error('Dados meteorológicos indisponíveis para esta localização.');
    }

    return {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      units: {
        temp: data.current_units?.temperature_2m || '°C',
        apparent: data.current_units?.apparent_temperature || '°C',
        humidity: data.current_units?.relative_humidity_2m || '%',
        wind: data.current_units?.wind_speed_10m || 'km/h'
      }
    };
  } catch (error) {
    console.error('Erro em getForecast:', error);
    throw error;
  }
}
