import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${randomUUID()}.pdf`;

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/resumes"
    );

    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const publicPath = `/uploads/resumes/${fileName}`;

    return NextResponse.json({
      path: publicPath,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
