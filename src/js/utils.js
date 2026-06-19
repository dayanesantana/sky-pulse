/**
 * Módulo de Utilitários e Helpers
 */

/**
 * Mapeia o código de clima (WMO Weather Code) da API do Open-Meteo
 * para uma descrição em português, um ícone correspondente do Lucide e uma classe de efeito visual.
 * @param {number} code Código numérico do clima.
 * @returns {Object} { description: string, icon: string, glowClass: string }
 */
export function getWeatherDetails(code) {
  const mapping = {
    0: { description: 'Céu Limpo', icon: 'sun', glowClass: 'glow-sunny' },
    1: { description: 'Principalmente Limpo', icon: 'cloud-sun', glowClass: 'glow-sunny' },
    2: { description: 'Parcialmente Nublado', icon: 'cloud-sun', glowClass: 'glow-cloudy' },
    3: { description: 'Nublado', icon: 'cloud', glowClass: 'glow-cloudy' },
    45: { description: 'Nevoeiro', icon: 'cloud-fog', glowClass: 'glow-foggy' },
    48: { description: 'Nevoeiro com Geada', icon: 'cloud-fog', glowClass: 'glow-foggy' },
    51: { description: 'Chuvisco Leve', icon: 'cloud-drizzle', glowClass: 'glow-rainy' },
    53: { description: 'Chuvisco Moderado', icon: 'cloud-drizzle', glowClass: 'glow-rainy' },
    55: { description: 'Chuvisco Denso', icon: 'cloud-drizzle', glowClass: 'glow-rainy' },
    56: { description: 'Chuvisco Congelante Leve', icon: 'snowflake', glowClass: 'glow-snowy' },
    57: { description: 'Chuvisco Congelante Denso', icon: 'snowflake', glowClass: 'glow-snowy' },
    61: { description: 'Chuva Fraca', icon: 'cloud-rain', glowClass: 'glow-rainy' },
    63: { description: 'Chuva Moderada', icon: 'cloud-rain', glowClass: 'glow-rainy' },
    65: { description: 'Chuva Forte', icon: 'cloud-rain-wind', glowClass: 'glow-rainy' },
    66: { description: 'Chuva Congelante Fraca', icon: 'snowflake', glowClass: 'glow-snowy' },
    67: { description: 'Chuva Congelante Forte', icon: 'snowflake', glowClass: 'glow-snowy' },
    71: { description: 'Neve Fraca', icon: 'snowflake', glowClass: 'glow-snowy' },
    73: { description: 'Neve Moderada', icon: 'snowflake', glowClass: 'glow-snowy' },
    75: { description: 'Neve Forte', icon: 'snowflake', glowClass: 'glow-snowy' },
    77: { description: 'Grãos de Neve', icon: 'snowflake', glowClass: 'glow-snowy' },
    80: { description: 'Pancadas de Chuva Fracas', icon: 'cloud-rain', glowClass: 'glow-rainy' },
    81: { description: 'Pancadas de Chuva Moderadas', icon: 'cloud-rain-wind', glowClass: 'glow-rainy' },
    82: { description: 'Pancadas de Chuva Violentas', icon: 'cloud-rain-wind', glowClass: 'glow-stormy' },
    85: { description: 'Pancadas de Neve Fracas', icon: 'snowflake', glowClass: 'glow-snowy' },
    86: { description: 'Pancadas de Neve Fortes', icon: 'snowflake', glowClass: 'glow-snowy' },
    95: { description: 'Trovoada Fraca/Moderada', icon: 'cloud-lightning', glowClass: 'glow-stormy' },
    96: { description: 'Trovoada com Granizo Leve', icon: 'cloud-hail', glowClass: 'glow-stormy' },
    99: { description: 'Trovoada com Granizo Forte', icon: 'cloud-hail', glowClass: 'glow-stormy' }
  };

  return mapping[code] || { description: 'Clima Desconhecido', icon: 'help-circle', glowClass: 'glow-unknown' };
}

/**
 * Formata uma data/hora no padrão brasileiro.
 * Se nenhuma string for fornecida, utiliza o momento atual do sistema.
 * @param {string} [dateString] Data em formato ISO8601 ou compatível.
 * @returns {string} Data formatada como: "Sexta-feira, 19/06/2026 às 12:34"
 */
export function formatDateTime(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  const diasSemana = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  const diaSemana = diasSemana[date.getDay()];
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  
  const horas = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');

  return `${diaSemana}, ${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}
