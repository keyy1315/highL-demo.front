import axios from "axios";
import { tryCatch } from "../utils";
const RIOT_ASIA_BASE_URL = "https://asia.api.riotgames.com";

export async function getPuuid(username: string, tag: string) {
  return tryCatch(async () => {
    const response = await axios.get(
      `${RIOT_ASIA_BASE_URL}/riot/account/v1/accounts/by-riot-id/${username}/${tag}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    return response.data;
  });
}
