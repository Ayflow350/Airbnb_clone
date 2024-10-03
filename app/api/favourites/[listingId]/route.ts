import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const CurrentUser = await getCurrentUser();

  if (!CurrentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favouriteIds = [...(CurrentUser.favouriteIds || [])];
  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: CurrentUser.id,
    },
    data: {
      favouriteIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const CurrentUser = await getCurrentUser();

  if (!CurrentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favouriteIds = [...(CurrentUser.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: CurrentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}
