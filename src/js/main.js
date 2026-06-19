import { searchCity, getForecast } from './api.js';
import { getWeatherDetails, formatDateTime } from './utils.js';

// DOM Elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

const welcomeCard = document.getElementById('welcome-card');
const skeletonLoader = document.getElementById('skeleton-loader');
const weatherCard = document.getElementById('weather-card');
const errorCard = document.getElementById('error-card');

// Weather Data Elements
const wCity = document.getElementById('w-city');
const wCountry = document.getElementById('w-country');
const wDatetime = document.getElementById('w-datetime');
const wIconContainer = document.getElementById('w-icon-container');
const wTemp = document.getElementById('w-temp');
const wDesc = document.getElementById('w-desc');
const wApparent = document.getElementById('w-apparent');
const wHumidity = document.getElementById('w-humidity');
const wWind = document.getElementById('w-wind');
const wCoords = document.getElementById('w-coords');
const weatherGlow = document.getElementById('weather-glow');

// Error Elements
const errorMessage = document.getElementById('error-message');
const btnTryAgain = document.getElementById('btn-try-again');

/**
 * Inicialização do aplicativo
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa os ícones do Lucide na página inicial
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Foca no input de busca para melhor UX
  cityInput.focus();
});

// Event Listeners
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    handleSearch(city);
  }
});

btnTryAgain.addEventListener('click', () => {
  errorCard.classList.add('hidden');
  cityInput.value = '';
  cityInput.focus();
  welcomeCard.classList.remove('hidden');
});

/**
 * Gerencia o fluxo de busca de clima para uma cidade
 * @param {string} cityName Nome da cidade
 */
async function handleSearch(cityName) {
  // Alteração de estados visuais: mostrar loader e esconder outros cards
  showState('loading');

  try {
    // 1. Buscar coordenadas da cidade
    const locationData = await searchCity(cityName);

    // 2. Buscar previsão com base nas coordenadas
    const forecastData = await getForecast(locationData.latitude, locationData.longitude);

    // 3. Renderizar resultados no DOM
    renderWeatherData(locationData, forecastData);
    
    // 4. Mudar estado visual para sucesso
    showState('success');
  } catch (error) {
    // Exibe a mensagem de erro específica
    errorMessage.textContent = error.message || 'Erro inesperado ao buscar clima. Tente novamente.';
    showState('error');
  }
}

/**
 * Controla a visibilidade dos cards de acordo com o estado atual da aplicação
 * @param {'welcome' | 'loading' | 'success' | 'error'} state Estado da aplicação
 */
function showState(state) {
  welcomeCard.classList.add('hidden');
  skeletonLoader.classList.add('hidden');
  weatherCard.classList.add('hidden');
  errorCard.classList.add('hidden');

  switch (state) {
    case 'welcome':
      welcomeCard.classList.remove('hidden');
      break;
    case 'loading':
      skeletonLoader.classList.remove('hidden');
      break;
    case 'success':
      weatherCard.classList.remove('hidden');
      break;
    case 'error':
      errorCard.classList.remove('hidden');
      break;
  }
}

/**
 * Preenche o DOM com os dados climáticos recebidos
 * @param {Object} location Dados de localização
 * @param {Object} forecast Dados meteorológicos
 */
function renderWeatherData(location, forecast) {
  // Configura localização
  const stateString = location.state ? `, ${location.state}` : '';
  wCity.textContent = `${location.name}${stateString}`;
  wCountry.textContent = location.countryCode || location.country;

  // Configura data/hora atualizada formatada
  wDatetime.textContent = formatDateTime();

  // Mapeia clima atual
  const climate = getWeatherDetails(forecast.weatherCode);
  wDesc.textContent = climate.description;
  wTemp.innerHTML = `${Math.round(forecast.temperature)}<span class="unit">${forecast.units.temp}</span>`;

  // Detalhes extras
  wApparent.textContent = `${Math.round(forecast.apparentTemperature)}${forecast.units.apparent}`;
  wHumidity.textContent = `${forecast.humidity}${forecast.units.humidity}`;
  wWind.textContent = `${forecast.windSpeed} ${forecast.units.wind}`;
  
  const latSign = location.latitude >= 0 ? 'N' : 'S';
  const lonSign = location.longitude >= 0 ? 'L' : 'O';
  wCoords.textContent = `${Math.abs(location.latitude).toFixed(2)}° ${latSign}, ${Math.abs(location.longitude).toFixed(2)}° ${lonSign}`;

  // Atualiza ícone dinâmico do clima principal
  wIconContainer.innerHTML = `<i data-lucide="${climate.icon}" class="weather-main-icon"></i>`;

  // Atualiza classe do Glow dinâmico no card
  updateWeatherGlow(climate.glowClass);

  // Processa novos ícones inseridos dinamicamente
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/**
 * Atualiza o efeito visual de luz de fundo (glow) do card com base nas condições climáticas
 * @param {string} glowClass Classe CSS de glow correspondente ao clima
 */
function updateWeatherGlow(glowClass) {
  // Remove todas as classes de glow anteriores
  weatherGlow.className = 'weather-card-glow';
  
  // Adiciona a nova classe de glow
  weatherGlow.classList.add(glowClass);
}
