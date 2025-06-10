import AxiosClient from "../client/AxiosClient";

export const fetchSkips = async (search: string): Promise<Skips> => {
  if (!search) return [];
  try {
    const { data } = await AxiosClient.get("/skips/by-location", {
      params: {
        postcode: search, // assuming search is postcode here
        area: "Lowestoft", // or make this dynamic too
      },
    });
    return data || [];
  } catch (error) {
    return [];
  }
};
