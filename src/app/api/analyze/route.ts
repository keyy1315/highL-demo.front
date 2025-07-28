import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/result`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return NextResponse.json(response.data);
}