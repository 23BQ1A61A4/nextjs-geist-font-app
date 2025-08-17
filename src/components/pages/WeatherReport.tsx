"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function WeatherReport() {
  const [location, setLocation] = useState('New Delhi, India')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      icon: '⛅'
    },
    forecast: [
      { day: 'Today', temp: '28°C', condition: 'Partly Cloudy', icon: '⛅', rain: '10%' },
      { day: 'Tomorrow', temp: '30°C', condition: 'Sunny', icon: '☀️', rain: '0%' },
      { day: 'Day 3', temp: '26°C', condition: 'Rainy', icon: '🌧️', rain: '80%' },
      { day: 'Day 4', temp: '25°C', condition: 'Cloudy', icon: '☁️', rain: '20%' },
      { day: 'Day 5', temp: '29°C', condition: 'Sunny', icon: '☀️', rain: '5%' },
    ]
  }

  const farmingAdvice = [
    "Good conditions for field work today",
    "Consider irrigation before the rain on Day 3",
    "Perfect weather for harvesting this week",
    "Monitor crops for fungal diseases after rain"
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🌤️ Weather Report
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Weather insights and farming recommendations
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Button>Update</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🌡️ Current Weather - {location}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-3xl mb-2 block">{weatherData.current.icon}</span>
              <p className="text-2xl font-bold text-blue-600">{weatherData.current.temperature}°C</p>
              <p className="text-sm text-blue-500">{weatherData.current.condition}</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-3xl mb-2 block">💧</span>
              <p className="text-2xl font-bold text-green-600">{weatherData.current.humidity}%</p>
              <p className="text-sm text-green-500">Humidity</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-3xl mb-2 block">💨</span>
              <p className="text-2xl font-bold text-purple-600">{weatherData.current.windSpeed}</p>
              <p className="text-sm text-purple-500">km/h Wind</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span className="text-3xl mb-2 block">🌡️</span>
              <p className="text-2xl font-bold text-orange-600">Good</p>
              <p className="text-sm text-orange-500">Farm Conditions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📅 7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <p className="font-semibold mb-2">{day.day}</p>
                <span className="text-3xl mb-2 block">{day.icon}</span>
                <p className="text-lg font-bold">{day.temp}</p>
                <p className="text-sm text-gray-600">{day.condition}</p>
                <Badge variant="secondary" className="mt-2">
                  Rain: {day.rain}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🌾 Farming Advice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {farmingAdvice.map((advice, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-600">✓</span>
                <p className="text-green-800 dark:text-green-200">{advice}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
