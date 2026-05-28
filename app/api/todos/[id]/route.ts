import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"

// @ts-ignore
export async function GET(request: NextRequest, ctx : RouteContext<'/todos/id'>) {
    try {
        // @ts-ignore
        const { id } = await ctx.params
        const todo = await prisma.todo.findUnique({
            where: { 
                id : id
            }
        });
        
        if(!todo){
            return NextResponse.json({error: "Todo not found"}, {status : 404})
        }   

        return NextResponse.json(
            {success: true, data: todo},
            { status: 200}
        )
    } catch (error) {
        console.error("Error fetching todo:", error);
        return NextResponse.json({ success : false , error: "An error occurred while fetching the todo." }, { status: 500 });
    }
}

// @ts-ignore
export async function PUT(request: NextRequest, ctx: RouteContext<'/todos/id'>) {
    try {
        // @ts-ignore
        const { id } = await ctx.params
        const { title, complete } = await request.json()

        if (!title && complete === undefined) {
            return NextResponse.json(
                { success: false, error: "At least one field (title or complete) is required" },
                { status: 400 }
            )
        }

        const todo = await prisma.todo.update({
            where: { id: id },
            data: {
                ...(title && { title }),
                ...(complete !== undefined && { complete })
            }
        })

        return NextResponse.json(
            { success: true, data: todo },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while updating the todo." },
            { status: 500 }
        );
    }
}

// @ts-ignore
export async function DELETE(request: NextRequest, ctx: RouteContext<'/todos/id'>) {
    try {
        // @ts-ignore
        const { id } = await ctx.params

        const todo = await prisma.todo.delete({
            where: { id: id }
        })

        return NextResponse.json(
            { success: true, data: todo },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while deleting the todo." },
            { status: 500 }
        );
    }
}