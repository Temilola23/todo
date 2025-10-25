```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json({ error: 'Failed to fetch todo' }, { status: 500 });
  }
}


export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params;
    const { text, completed } = await request.json();

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        text: text,
        completed: completed,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
```