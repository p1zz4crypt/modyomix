/**
 * The function getAnimals fetches data of animal images from a specific API endpoint and returns an
 * array of image URLs.
 * @returns The `getAnimals` function is returning an array of URLs for images of animals. The URLs
 * are extracted from the `image` field of each entry in the response data. If the fetching process
 * encounters an error, an empty array is returned.
 */
export const getAnimals = async () => {
  try {
    const response = await fetch(
      "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
    );
    if (!response.ok) {
      throw new Error("Fetch error");
    }
    const data = await response.json();
    console.log(data, "Data from api")
    return data.entries.map((entry) => entry.fields.image.url); 
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
