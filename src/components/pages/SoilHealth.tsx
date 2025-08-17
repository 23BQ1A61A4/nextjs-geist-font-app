"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function SoilHealth() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeSoil = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      setAnalysisResult({
        soilType: 'Loamy Clay',
        healthScore: 78,
        ph: 6.5,
        nitrogen: 65,
        phosphorus: 45,
        potassium: 82,
        moisture: 38,
        organicMatter: 3.2,
        suitableCrops: [
          { name: 'Tomato', season: 'Summer', suitability: 95 },
          { name: 'Wheat', season: 'Winter', suitability: 88 },
          { name: 'Cotton', season: 'Kharif', suitability: 75 },
          { name: 'Onion', season: 'Rabi', suitability: 92 }
        ],
        recommendations: [
          'Add organic compost to improve soil structure',
          'Consider lime application to optimize pH',
          'Implement crop rotation to maintain soil health',
          'Install drip irrigation for water efficiency'
        ]
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🌍 Soil Health Detection
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive soil analysis and crop recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📸 Upload Soil Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="max-w-full h-48 mx-auto rounded" />
              ) : (
                <div>
                  <span className="text-4xl mb-4 block">📷</span>
                  <p className="text-gray-500">Upload soil image for analysis</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            <Button 
              onClick={analyzeSoil}
              disabled={!selectedImage || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing Soil...' : '🔬 Analyze Soil Health'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 Soil Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult ? (
              <div className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-green-500 text-white mb-2">
                    Health Score: {analysisResult.healthScore}%
                  </Badge>
                  <p className="text-lg font-semibold">Soil Type: {analysisResult.soilType}</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>pH Level</span>
                      <span>{analysisResult.ph}</span>
                    </div>
                    <Progress value={(analysisResult.ph / 14) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nitrogen (N)</span>
                      <span>{analysisResult.nitrogen}%</span>
                    </div>
                    <Progress value={analysisResult.nitrogen} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Phosphorus (P)</span>
                      <span>{analysisResult.phosphorus}%</span>
                    </div>
                    <Progress value={analysisResult.phosphorus} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Potassium (K)</span>
                      <span>{analysisResult.potassium}%</span>
                    </div>
                    <Progress value={analysisResult.potassium} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Moisture Content</span>
                      <span>{analysisResult.moisture}%</span>
                    </div>
                    <Progress value={analysisResult.moisture} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Organic Matter</span>
                      <span>{analysisResult.organicMatter}%</span>
                    </div>
                    <Progress value={analysisResult.organicMatter * 10} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <span className="text-4xl mb-4 block">🔬</span>
                <p>Upload soil image to see analysis results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>🌱 Suitable Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.suitableCrops.map((crop: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{crop.name}</p>
                    <p className="text-sm text-gray-600">Season: {crop.season}</p>
                  </div>
                  <Badge variant={crop.suitability > 80 ? 'default' : 'secondary'}>
                    {crop.suitability}% suitable
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>💡 AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysisResult.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-blue-600">✓</span>
                  <p className="text-blue-800 dark:text-blue-200">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
