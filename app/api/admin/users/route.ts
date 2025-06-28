// app/api/admin/users/route.ts
import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin' // We'll fix this next

export async function GET() {
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ users: users?.users || [] })
}
