"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'

export default function CropCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const cropActivities = {
    'January': [
      { crop: 'Wheat', activity: 'Harvesting', icon: '🌾' },
      { crop: 'Mustard', activity: 'Flowering', icon: '🌻' },
      { crop: 'Potato', activity: 'Harvesting', icon: '🥔' }
    ],
    'February': [
      { crop: 'Tomato', activity: 'Transplanting', icon: '🍅' },
      { crop: 'Onion', activity: 'Planting', icon: '🧅' },
      { crop: 'Carrot', activity: 'Sowing', icon: '🥕' }
    ],
    'March': [
      { crop: 'Rice', activity: 'Land Preparation', icon: '🌾' },
      { crop: 'Cotton', activity: 'Sowing', icon: '🌱' },
      { crop: 'Sugarcane', activity: 'Planting', icon: '🎋' }
    ]
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentMonthActivities = cropActivities[monthNames[selectedMonth] as keyof typeof cropActivities] || []

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📅 Crop Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Plan your farming activities throughout the year
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📆 Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🌱 Activities for {monthNames[selectedMonth]} {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentMonthActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{activity.crop}</p>
                    <p className="text-sm text-gray-600">{activity.activity}</p>
                  </div>
                  <Badge variant="secondary">{activity.activity}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📊 Yearly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">🌱</span>
              <h4 className="font-semibold text-green-800 dark:text-green-200">Spring</h4>
              <p className="text-sm text-green-600 dark:text-green-300">Planting Season</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">☀️</span>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Summer</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">Growth & Care</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">🍂</span>
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">Monsoon</h4>
              <p className="text-sm text-orange-600 dark:text-orange-300">Main Crops</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">❄️</span>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Winter</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">Harvest Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
