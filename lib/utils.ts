import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabaseClient"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fetch user profile from customers table
export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  
  if (error) throw error;
  
  // If no profile exists, create a default one (no email field)
  if (!data) {
    const { data: newProfile, error: createError } = await supabase
      .from("customers")
      .insert({
        id: userId,
        first_name: "",
        last_name: "",
        middle_name: "",
        date_of_birth: null,
        gender: "",
        phone: "",
        bio: "",
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (createError) throw createError;
    return newProfile;
  }
  
  return data;
}

// Fetch appointments for a user
export async function fetchUserAppointments(userId: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, therapists(first_name, last_name, specialization)")
    .eq("customer_id", userId)
    .order("appointment_time", { ascending: true });
  if (error) throw error;
  return data || [];
}

// Fetch notifications for a user
export async function fetchUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
