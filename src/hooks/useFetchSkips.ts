import AxiosClient from "../client/AxiosClient";

export const fetchSkips = async (
  postcode?: string,
  area?: string
): Promise<Skips> => {
  try {
    const { data } = await AxiosClient.get("/skips/by-location", {
      params: {
        postcode: postcode || "NR32",
        area: area || "Lowestoft",
      },
    });
    console.log("data", data);
    return data || [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
