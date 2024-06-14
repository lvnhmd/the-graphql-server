import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import axios from "axios";

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

app.listen(4000, () => {
  console.log("GraphQL server is running on http://localhost:4000/graphql");
});
