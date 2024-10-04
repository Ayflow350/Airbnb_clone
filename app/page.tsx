import Image from "next/image";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IlistingParams } from "./actions/getListings";
import ListingCard from "@/components/Listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IlistingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const isEmpty = true;
  const listings = await getListings(searchParams);

  const currentUser = await getCurrentUser();

  if (listings.length == 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className=" font-bold mt-3 pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {listings.map((listing) => {
          return (
            <div>
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
