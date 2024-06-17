import axios from "axios";
import { IpInfo } from "./types";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_KEY = process.env.ACCESS_KEY;
const BASE_URL = process.env.BASE_URL;

if (!ACCESS_KEY || !BASE_URL) {
  throw new Error("Environment variables ACCESS_KEY and BASE_URL must be set");
}
function handleAxiosError(error: any): never {
  if (axios.isAxiosError(error) && error.response) {
    const { data } = error.response;
    if (data && !data.success && data.error) {
      throw new Error(data.error.info);
    }
  }
  throw error;
}

async function fetchSingleIpInfo(ip: string): Promise<IpInfo> {
  try {
    const response = await axios.get(
      `${BASE_URL}/${ip}?access_key=${ACCESS_KEY}`
    );
    const { data } = response;
    return {
      ...data,
      region_plus_code: `${data.region_name}|${data.region_code}`,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function fetchIpInfo(ip: string): Promise<IpInfo> {
  return fetchSingleIpInfo(ip);
}

export async function fetchBulkIpInfo(ips: string): Promise<IpInfo[]> {
  const ipList = ips.split(",");

  try {
    const response = await axios.get(
      `${BASE_URL}/${ips}?access_key=${ACCESS_KEY}`
    );

    const { data } = response;

    if (!data.success && data.error && data.error.code === 303) {
      console.log(
        "Bulk lookup not supported on the current plan. Fetching one by one."
      );
      const promises = ipList.map(fetchSingleIpInfo);
      return Promise.all(promises);
    }

    return ipList.map((ip) => ({
      ...data[ip],
      region_plus_code: `${data[ip].region_name}|${data[ip].region_code}`,
    }));
  } catch (error) {
    return handleAxiosError(error);
  }
}
