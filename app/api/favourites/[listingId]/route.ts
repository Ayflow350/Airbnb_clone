import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// POST handler to add a listing to the user's favorites
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    // If the user is not logged in or authenticated, return an error
    if (!currentUser) {
      return NextResponse.error();
    }

    // Extract listingId from the request URL
    const url = new URL(request.url);
    const listingId = url.pathname.split("/").pop();

    // Validate listingId
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }

    // Get the current list of favorite IDs and add the new one
    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds.push(listingId);

    // Update the user record in the database
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    // Return the updated user data as the response
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.error();
  }
}

// DELETE handler to remove a listing from the user's favorites
export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    // If the user is not logged in or authenticated, return an error
    if (!currentUser) {
      return NextResponse.error();
    }

    // Extract listingId from the request URL
    const url = new URL(request.url);
    const listingId = url.pathname.split("/").pop();

    // Validate listingId
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }

    // Remove the listingId from the user's favoriteIds array
    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds = favouriteIds.filter((id) => id !== listingId);

    // Update the user record in the database
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    // Return the updated user data as the response
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.error();
  }
}
