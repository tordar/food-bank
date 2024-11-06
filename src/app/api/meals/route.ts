import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { MongoClient } from 'mongodb'

export async function GET() {
    const client: MongoClient = await clientPromise
    const db = client.db("mealtracker")
    const meals = await db.collection("meals").find({}).toArray()
    return NextResponse.json({ status: 200, data: meals })
}

export async function POST(request: Request) {
    const client: MongoClient = await clientPromise
    const db = client.db("mealtracker")
    const body = await request.json()
    const newMeal = await db.collection("meals").insertOne(body)
    return NextResponse.json(newMeal)
}