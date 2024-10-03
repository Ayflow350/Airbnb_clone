import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingsById";
import EmptyState from "@/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import ListingClient from "./ListingClient";
interface Iparams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div className=" mt-[100px]">
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};

export default ListingPage;
