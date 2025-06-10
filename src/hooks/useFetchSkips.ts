import AxiosClient from "../client/axiosClient";

export const fetchSkips = async (search: string) => {
  if (!search) return [];
  const { data } = await AxiosClient.get("/skips/by-location", {
    params: {
      postcode: search, // assuming search is postcode here
      area: "Lowestoft", // or make this dynamic too
    },
  });
  return data;
};
