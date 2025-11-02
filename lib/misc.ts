import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

export const airQulaityIndexText = [
  {
    rating: 10,
    description: "excellent",
  },
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 30,
    description: "satisfactory",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 50,
    description: "moderate",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 70,
    description: "poor",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 90,
    description: "very poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];

interface UvIndexCategory {
  text: string;
  protection: string;
}

export const uvIndexCategory = (uvIndex: number): UvIndexCategory => {
  if (uvIndex <= 2) {
    return {
      text: "Low",
      protection: "No protection required",
    };
  } else if (uvIndex <= 5) {
    return {
      text: "Moderate",
      protection: "Stay in shade near midday.",
    };
  } else if (uvIndex <= 7) {
    return {
      text: "High",
      protection: "Wear a hat and sunglasses.",
    };
  } else if (uvIndex <= 10) {
    return {
      text: "Very High",
      protection: "Apply sunscreen SPF 30+ every 2 hours.",
    };
  } else if (uvIndex > 10) {
    return {
      text: "Extreme",
      protection: "Avoid being outside.",
    };
  } else {
    return {
      text: "Extreme",
      protection: "Avoid being outside.",
    };
  }
};

export const feelsLikeText = (
  feelsLike: number,
  minTemo: number,
  maxTemp: number
) => {
  const avgTemp = (minTemo + maxTemp) / 2;

  if (feelsLike < avgTemp - 5) {
    return "Feels significantly colder than actual temperature.";
  }
  if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
    return "Feels close to the actual temperature.";
  }
  if (feelsLike > avgTemp + 5) {
    return "Feels significantly warmer than actual temperature.";
  }

  return "Temperature feeling is typical for this range.";
};

export const getHumidityText = (humidity: number) => {
  if (humidity < 30) return "Dry: May cause skin irritation";
  if (humidity >= 30 && humidity < 50)
    return "Comfortable: Ideal for health and comfort";
  if (humidity >= 50 && humidity < 70)
    return "Moderate: Sticky, may increase allergens";
  if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
  return "Unavailable: Humidity data not available";
};

export const getVisibilityDescription = (visibility: number) => {
  const visibilityInKm = Math.round(visibility / 1000);

  if (visibilityInKm > 10) return "Excellent: Clear and vast view";
  if (visibilityInKm > 5) return "Good: Easily navigable";
  if (visibilityInKm > 2) return "Moderate: Some limitations";
  if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
  return "Unavailable: Visibility data not available";
};

export const getPressureDescription = (pressure: number) => {
  if (pressure < 1000) return "Very low pressure";

  if (pressure >= 1000 && pressure < 1015)
    return "Low pressure. Expect weather changes.";

  if (pressure >= 1015 && pressure < 1025)
    return "Normal pressure. Expect weather changes.";

  if (pressure >= 1025 && pressure < 1040)
    return "High pressure. Expect weather changes.";

  if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

  return "Unavailable pressure data";
};
