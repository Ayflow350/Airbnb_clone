import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPages = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  console.log("currently user", currentUser);

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length == 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like you haven't created any properties"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPages;
