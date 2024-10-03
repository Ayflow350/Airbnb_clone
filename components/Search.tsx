"use client";
import { BiSearch } from "react-icons/bi";
import { useMemo } from "react";
import useSearchModal from "@/hooks/useSearchModal";
import useCountries from "@/hooks/useCountries";
import { useParams } from "next/navigation";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useParams() || {}; // Fallback to an empty object if params is null or undefined
  const { getByValue } = useCountries();

  // Access the params directly with null/undefined checks
  const locationValue = params?.locationValue || null;
  const startDate = params?.startDate || null;
  const endDate = params?.endDate || null;
  const guestCount = params?.guestCount || null;

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guest";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex fle-row items-center justify-between">
          <div className="text-sm font-semibold px-6">{locationLabel}</div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            {durationLabel}
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">{guestLabel}</div>
            <div className="p-2 bg-blue-500 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
