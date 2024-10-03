import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavouriteListings";
import EmptyState from "@/components/EmptyState";
import FavouriteClient from "./FavouriteClient";

const LisingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="looks like you have no favourite listing"
      />
    );
  }

  return <FavouriteClient listings={listings} currentUser={currentUser} />;
};

export default LisingPage;
