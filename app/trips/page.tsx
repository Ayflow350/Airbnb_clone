import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
export const dynamic = "force-dynamic";

const TripsPages = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  console.log("currently user", currentUser);

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No Trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPages;
