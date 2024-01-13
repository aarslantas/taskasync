import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;

  const db = await open({
    filename: "./taskAsync.db",
    driver: sqlite3.Database,
  });

  try {
    const result = await db.get("SELECT * FROM tasks WHERE id = ?", [
      params.todoId,
    ]);

    console.log("result", result);
    console.log("params", params);

    if (result) {
      return NextResponse.json({
        data: result,
      });
    } else {
      return NextResponse.json({
        error: "Todo not found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
    });
  } finally {
    await db.close();
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;

  const db = await open({
    filename: "./taskAsync.db",
    driver: sqlite3.Database,
  });

  try {
    const data = await req.json();

    const { title, description, status } = data;

    const result = await db.run(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, params.todoId]
    );

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Todo updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Todo not found",
      });
    }
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

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;

  const db = await open({
    filename: "./taskAsync.db",
    driver: sqlite3.Database,
  });

  try {
    const result = await db.run("DELETE FROM tasks WHERE id = ?", [
      params.todoId,
    ]);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Todo deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Todo not found",
      });
    }
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
