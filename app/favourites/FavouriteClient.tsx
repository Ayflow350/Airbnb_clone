import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeListings, SafeUser } from "../types";
import ListingCard from "@/components/Listings/ListingCard";

interface FavoriteClientProps {
  listings: SafeListings[];
  currentUser?: SafeUser | null;
}

const FavouriteClient: React.FC<FavoriteClientProps> = ({
  listings,
  currentUser,
}) => {
  console.log("listings", listings);
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouriteClient;
