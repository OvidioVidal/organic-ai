import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      )
    }

    // Analyze the image using OpenAI's Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this product label image. Extract the product name, ingredients list, and assess its health score on a scale of 1-10. Then suggest 3 healthier alternatives with cleaner ingredients. For each alternative, explain why it's healthier. Format the response as JSON with this structure: {name: string, ingredients: string[], healthScore: number, alternatives: [{name: string, ingredients: string[], healthScore: number, reasons: string[]}]}",
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1000,
    })

    const analysis = JSON.parse(response.choices[0].message.content || '{}')

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    )
  }
}