import { http } from "./client";
import type { UsersResponse, UserListItem } from "../types";

const API_URL = import.meta.env.API_URL;

/**
 * Formats a user's full name.
 * @param name - The name object from the user API response.
 * @returns The formatted full name.
 */
function formatFullName(name: UsersResponse["result"][number]["name"]) {
  return [name.first, name.middle, name.last].filter(Boolean).join(" ");
}

/**
 * Formats a user's address.
 * @param location - The location object from the user API response.
 * @returns The formatted address.
 */
function formatAddress(location: UsersResponse["result"][number]["location"]) {
  return `${location.street}, ${location.city}, ${location.state}, ${location.country} ${location.zip}`;
}

/**
 * Maps API response to UI models so the UI remains backend-agnostic
 */
export async function getUsers(): Promise<UserListItem[]> {
  const data = await http<UsersResponse>(API_URL);

  const items = data.result ?? [];
  return items.map((user) => ({
    id: user.id,
    fullName: formatFullName(user.name),
    jobTitle: user.job?.title ?? "—",
    address: formatAddress(user.location),
  }));
}
