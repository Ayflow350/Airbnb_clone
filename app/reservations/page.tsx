import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ReservationsClient from "./ReservationsClient";
export const dynamic = "force-dynamic";

const ReservationsPages = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No Reservations  found"
        subtitle="Looks like you don't reservation on your properties "
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPages;
