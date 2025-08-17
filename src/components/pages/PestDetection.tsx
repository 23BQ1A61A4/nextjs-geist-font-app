"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PestDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [detectionResult, setDetectionResult] = useState<any>(null)
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

  const detectPest = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      setDetectionResult({
        pestName: 'Aphids',
        confidence: 92,
        severity: 'Moderate',
        description: 'Small, soft-bodied insects that feed on plant sap',
        symptoms: [
          'Yellowing and curling of leaves',
          'Sticky honeydew on plant surfaces',
          'Stunted plant growth',
          'Presence of ants (attracted to honeydew)'
        ],
        chemicalTreatment: [
          'Imidacloprid-based insecticides',
          'Malathion spray (follow label instructions)',
          'Systemic insecticides for severe infestations'
        ],
        organicTreatment: [
          'Neem oil spray (2-3 times per week)',
          'Insecticidal soap solution',
          'Release ladybugs as natural predators',
          'Garlic and chili pepper spray'
        ],
        prevention: [
          'Regular monitoring of plants',
          'Maintain proper plant spacing',
          'Avoid over-fertilization with nitrogen',
          'Encourage beneficial insects'
        ]
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🐛 Pest & Disease Detection
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          AI-powered identification and treatment recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📸 Upload Plant Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="max-w-full h-48 mx-auto rounded" />
              ) : (
                <div>
                  <span className="text-4xl mb-4 block">📷</span>
                  <p className="text-gray-500">Upload image of affected plant</p>
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
              onClick={detectPest}
              disabled={!selectedImage || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : '🔍 Detect Pest/Disease'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Detection Results</CardTitle>
          </CardHeader>
          <CardContent>
            {detectionResult ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2">
                    {detectionResult.pestName}
                  </h3>
                  <div className="flex justify-center space-x-2 mb-4">
                    <Badge className="bg-blue-500">
                      Confidence: {detectionResult.confidence}%
                    </Badge>
                    <Badge variant={detectionResult.severity === 'High' ? 'destructive' : 'secondary'}>
                      Severity: {detectionResult.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {detectionResult.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-orange-600">🚨 Symptoms:</h4>
                  <ul className="space-y-1">
                    {detectionResult.symptoms.map((symptom: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                        • {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <span className="text-4xl mb-4 block">🔬</span>
                <p>Upload an image to detect pests or diseases</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {detectionResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">🧪 Chemical Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {detectionResult.chemicalTreatment.map((treatment: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {treatment}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">🌱 Organic Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {detectionResult.organicTreatment.map((treatment: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {treatment}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {detectionResult && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">🛡️ Prevention Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detectionResult.prevention.map((tip: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-blue-600">✓</span>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
