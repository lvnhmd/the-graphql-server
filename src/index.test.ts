import request from "supertest";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import axios from "axios";

jest.mock("axios");

const schema = buildSchema(`
  type Query {
    getIpInfo(ip: String!): IpInfo
  }

  type IpInfo {
    ip: String
    city: String
    region: String
    region_code: String
    country: String
    country_name: String
    latitude: Float
    longitude: Float
    timezone: String
  }
`);

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const root = {
  getIpInfo: async ({ ip }: { ip: string }): Promise<IpInfo> => {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data;
  },
};

const app = express();
app.use("/graphql", createHandler({ schema, rootValue: root }));

test("getIpInfo endpoint returns correct data", async () => {
  const mockData: IpInfo = {
    ip: "8.8.8.8",
    city: "Mountain View",
    region: "California",
    region_code: "CA",
    country: "US",
    country_name: "United States",
    latitude: 37.386,
    longitude: -122.0838,
    timezone: "America/Los_Angeles",
  };

  (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

  const response = await request(app)
    .post("/graphql")
    .send({
      query: `
        query {
          getIpInfo(ip: "8.8.8.8") {
            ip
            city
            region
            region_code
            country
            country_name
            latitude
            longitude
            timezone
          }
        }
      `,
    });

  expect(response.body.data.getIpInfo).toEqual(mockData);
});
