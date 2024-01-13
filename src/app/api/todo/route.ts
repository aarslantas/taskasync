import { NextResponse, NextRequest } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const data = await req.json();

  const db = await open({
    filename: "./taskAsync.db",
    driver: sqlite3.Database,
  });

  try {
    const { title, description, status } = data || {};

    const id = uuidv4();

    db.run(
      "INSERT INTO tasks (id, title, description, status) VALUES (?, ?, ?, ?)",
      [id, title, description, status]
    );

    return NextResponse.json({
      success: true,
      message: "Task added successfully",
      id,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  } finally {
    await db.close();
  }
}

export async function GET(req: Request) {
  const db = await open({
    filename: "./taskAsync.db",
    driver: sqlite3.Database,
  });

  try {
    const tasks = await db.all("SELECT * FROM tasks");

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  } finally {
    await db.close();
  }
}

export async function DELETE(req: Request) {
  const db = await open({
    filename: "./taskAsync.db",
    driver: sqlite3.Database,
  });

  try {
    // Perform the delete operation
    await db.run("DELETE FROM tasks");

    return NextResponse.json({
      success: true,
      message: "All tasks deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  } finally {
    await db.close();
  }
}
