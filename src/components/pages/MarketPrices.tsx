"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function MarketPrices() {
  const [searchCrop, setSearchCrop] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('delhi')

  const marketData = [
    { crop: 'Wheat', price: 2450, unit: 'per quintal', change: '+2.5%', trend: 'up', location: 'Delhi' },
    { crop: 'Rice', price: 3200, unit: 'per quintal', change: '-1.2%', trend: 'down', location: 'Delhi' },
    { crop: 'Tomato', price: 25, unit: 'per kg', change: '+15.3%', trend: 'up', location: 'Delhi' },
    { crop: 'Onion', price: 18, unit: 'per kg', change: '-5.8%', trend: 'down', location: 'Delhi' },
    { crop: 'Potato', price: 12, unit: 'per kg', change: '+3.2%', trend: 'up', location: 'Delhi' },
    { crop: 'Cotton', price: 5800, unit: 'per quintal', change: '+8.7%', trend: 'up', location: 'Delhi' },
  ]

  const locations = [
    { id: 'delhi', name: 'Delhi' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'kolkata', name: 'Kolkata' },
    { id: 'chennai', name: 'Chennai' },
    { id: 'bangalore', name: 'Bangalore' },
  ]

  const filteredData = marketData.filter(item => 
    searchCrop === '' || item.crop.toLowerCase().includes(searchCrop.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          💰 Market Prices
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Real-time crop prices and market trends
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search crop..."
              value={searchCrop}
              onChange={(e) => setSearchCrop(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Update Prices</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{item.crop}</CardTitle>
                <Badge variant={item.trend === 'up' ? 'default' : 'secondary'}>
                  {item.trend === 'up' ? '📈' : '📉'} {item.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  ₹{item.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.unit}
                </div>
                <div className="text-sm text-gray-500">
                  📍 {item.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📊 Price Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">📈</span>
              <h4 className="font-semibold text-green-800 dark:text-green-200">Rising Prices</h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                Tomato, Cotton, Potato showing upward trend
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">📉</span>
              <h4 className="font-semibold text-red-800 dark:text-red-200">Falling Prices</h4>
              <p className="text-sm text-red-600 dark:text-red-300">
                Rice, Onion prices declining this week
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-2xl mb-2 block">📊</span>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Market Analysis</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Overall market showing mixed trends
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>💡 Trading Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-600">💡</span>
              <p className="text-yellow-800 dark:text-yellow-200">
                Cotton prices are rising due to export demand - consider selling if you have stock
              </p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-blue-600">📊</span>
              <p className="text-blue-800 dark:text-blue-200">
                Tomato prices expected to stabilize after current seasonal high
              </p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-600">🎯</span>
              <p className="text-green-800 dark:text-green-200">
                Good time to buy onion seeds for next season planting
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
