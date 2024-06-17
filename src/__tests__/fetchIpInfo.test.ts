import axios from "axios";
import { fetchIpInfo, fetchBulkIpInfo } from "../fetchIpInfo";
import { IpInfo } from "../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchIpInfo", () => {
  it("should fetch single IP info successfully", async () => {
    const mockData: IpInfo = {
      ip: "8.8.8.8",
      type: "ipv4",
      continent_code: "NA",
      continent_name: "North America",
      country_code: "US",
      country_name: "United States",
      region_code: "OH",
      region_name: "Ohio",
      city: "Glenmont",
      zip: "44628",
      latitude: 40.5369987487793,
      longitude: -82.12859344482422,
      location: {
        geoname_id: null,
        capital: "Washington D.C.",
        languages: [{ code: "en", name: "English", native: "English" }],
        country_flag: "https://assets.ipstack.com/flags/us.svg",
        country_flag_emoji: "🇺🇸",
        country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
        calling_code: "1",
        is_eu: false,
      },
      region_plus_code: "Ohio|OH",
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchIpInfo("8.8.8.8");
    expect(result).toEqual(mockData);
  });

  it("should handle error for single IP info fetch", async () => {
    const mockError = {
      response: {
        data: {
          success: false,
          error: { code: 123, info: "Some error" },
        },
      },
    };

    mockedAxios.get.mockRejectedValue(mockError);

    await expect(fetchIpInfo("8.8.8.8")).rejects.toMatchObject(mockError);
  });
});

describe("fetchBulkIpInfo", () => {
  it("should fetch bulk IP info successfully", async () => {
    const mockData = {
      "8.8.8.8": {
        ip: "8.8.8.8",
        type: "ipv4",
        continent_code: "NA",
        continent_name: "North America",
        country_code: "US",
        country_name: "United States",
        region_code: "OH",
        region_name: "Ohio",
        city: "Glenmont",
        zip: "44628",
        latitude: 40.5369987487793,
        longitude: -82.12859344482422,
        location: {
          geoname_id: null,
          capital: "Washington D.C.",
          languages: [{ code: "en", name: "English", native: "English" }],
          country_flag: "https://assets.ipstack.com/flags/us.svg",
          country_flag_emoji: "🇺🇸",
          country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
          calling_code: "1",
          is_eu: false,
        },
        region_plus_code: "Ohio|OH",
      },
      "8.8.4.4": {
        ip: "8.8.4.4",
        type: "ipv4",
        continent_code: "NA",
        continent_name: "North America",
        country_code: "US",
        country_name: "United States",
        region_code: "OH",
        region_name: "Ohio",
        city: "Glenmont",
        zip: "44628",
        latitude: 40.5369987487793,
        longitude: -82.12859344482422,
        location: {
          geoname_id: null,
          capital: "Washington D.C.",
          languages: [{ code: "en", name: "English", native: "English" }],
          country_flag: "https://assets.ipstack.com/flags/us.svg",
          country_flag_emoji: "🇺🇸",
          country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
          calling_code: "1",
          is_eu: false,
        },
        region_plus_code: "Ohio|OH",
      },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchBulkIpInfo("8.8.8.8,8.8.4.4");
    expect(result).toEqual([mockData["8.8.8.8"], mockData["8.8.4.4"]]);
  });

  it("should handle bulk lookup not supported error by fetching one by one", async () => {
    const mockError = {
      response: {
        data: {
          success: false,
          error: { code: 303, info: "Bulk lookup not supported" },
        },
      },
    };

    const mockSingleIpData: IpInfo = {
      ip: "8.8.8.8",
      type: "ipv4",
      continent_code: "NA",
      continent_name: "North America",
      country_code: "US",
      country_name: "United States",
      region_code: "OH",
      region_name: "Ohio",
      city: "Glenmont",
      zip: "44628",
      latitude: 40.5369987487793,
      longitude: -82.12859344482422,
      location: {
        geoname_id: null,
        capital: "Washington D.C.",
        languages: [{ code: "en", name: "English", native: "English" }],
        country_flag: "https://assets.ipstack.com/flags/us.svg",
        country_flag_emoji: "🇺🇸",
        country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
        calling_code: "1",
        is_eu: false,
      },
      region_plus_code: "Ohio|OH",
    };

    const mockData = {
      "8.8.8.8": mockSingleIpData,
      "8.8.4.4": mockSingleIpData,
    };

    mockedAxios.get
      .mockRejectedValue(mockError)
      .mockResolvedValue({ data: mockData });

    const result = await fetchBulkIpInfo("8.8.8.8,8.8.4.4");
    expect(result).toEqual([mockSingleIpData, mockSingleIpData]);
  });

  it("should handle error for bulk IP info fetch", async () => {
    const mockError = {
      response: {
        data: {
          success: false,
          error: { code: 123, info: "Some error" },
        },
      },
    };

    mockedAxios.get.mockRejectedValue(mockError);

    await expect(fetchBulkIpInfo("8.8.8.8,8.8.4.4")).rejects.toMatchObject(
      mockError
    );
  });
});
