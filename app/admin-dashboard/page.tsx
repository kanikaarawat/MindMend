"use client"

import { useEffect, useState } from "react"

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/admin/users")
                const json = await res.json()

                if (!res.ok) {
                    throw new Error(json.error || "Failed to fetch users")
                }

                // In case it's nested (like { users: { users: [...] } })
                const actualUsers = Array.isArray(json.users?.users)
                    ? json.users.users
                    : Array.isArray(json.users)
                        ? json.users
                        : []

                setUsers(actualUsers)
            } catch (err: any) {
                console.error("Error fetching users:", err)
                setError(err.message || "Unknown error")
                setUsers([])
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md p-6">
                    <h1 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-between">
                        Admin Dashboard
                        <span className="text-sm font-normal text-blue-500">
              Total Users: {users.length}
            </span>
                    </h1>

                    {loading && <p className="text-gray-600">Loading users...</p>}
                    {error && <p className="text-red-600">Error: {error}</p>}

                    {!loading && !error && (
                        <>
                            {users.length === 0 ? (
                                <p className="text-gray-600">No users found.</p>
                            ) : (
                                <ul className="space-y-4 mt-4">
                                    {users.map((user) => (
                                        <li
                                            key={user.id}
                                            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
                                        >
                                            <div>
                                                <p className="text-lg font-medium text-slate-800">
                                                    {user.email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Role:{" "}
                                                    <span className="font-semibold text-blue-600">
                            {user.user_metadata?.role || "N/A"}
                          </span>
                                                </p>
                                            </div>
                                            <div className="text-xs text-gray-400 font-mono">
                                                ID: {user.id.slice(0, 8)}...
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
