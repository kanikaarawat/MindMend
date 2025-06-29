"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Shield,
  Activity,
  TrendingUp,
  UserCheck,
  UserX,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")

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

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.user_metadata?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.user_metadata?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesRole = filterRole === "all" || user.user_metadata?.role === filterRole
        
        return matchesSearch && matchesRole
    })

    const stats = {
        total: users.length,
        patients: users.filter(u => u.user_metadata?.role === "patient").length,
        therapists: users.filter(u => u.user_metadata?.role === "therapist").length,
        active: users.filter(u => u.last_sign_in_at).length,
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <span className="text-lg text-gray-600">Loading admin dashboard...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">MindMend Admin</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Settings className="w-5 h-5" />
                            </Button>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">A</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage users and monitor system activity</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                    <p className="text-sm text-gray-600 font-medium">Total Users</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.patients}</p>
                                    <p className="text-sm text-gray-600 font-medium">Patients</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.therapists}</p>
                                    <p className="text-sm text-gray-600 font-medium">Therapists</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                                    <p className="text-sm text-gray-600 font-medium">Active Users</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Management */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div>
                                <CardTitle className="text-xl">User Management</CardTitle>
                                <CardDescription>Manage all registered users in the system</CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="patient">Patients</option>
                                    <option value="therapist">Therapists</option>
                                    <option value="admin">Admins</option>
                                </select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600">Error: {error}</p>
                            </div>
                        )}

                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p className="text-gray-500">
                                    {searchTerm || filterRole !== "all" 
                                        ? "No users found matching your criteria." 
                                        : "No users found."}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Sign In
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Avatar className="w-8 h-8 mr-3">
                                                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                                            <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                                                                {user.user_metadata?.first_name?.[0]}{user.user_metadata?.last_name?.[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge className={
                                                        user.user_metadata?.role === "admin" ? "bg-purple-100 text-purple-700 border-0" :
                                                        user.user_metadata?.role === "therapist" ? "bg-blue-100 text-blue-700 border-0" :
                                                        "bg-green-100 text-green-700 border-0"
                                                    }>
                                                        {user.user_metadata?.role || "N/A"}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge className={
                                                        user.last_sign_in_at ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-700 border-0"
                                                    }>
                                                        {user.last_sign_in_at ? "Active" : "Inactive"}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.last_sign_in_at 
                                                        ? new Date(user.last_sign_in_at).toLocaleDateString()
                                                        : "Never"
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
