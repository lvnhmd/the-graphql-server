import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Language {
    code: String
    name: String
    native: String
  }

  type Location {
    geoname_id: Int
    capital: String
    languages: [Language]
    country_flag: String
    country_flag_emoji: String
    country_flag_emoji_unicode: String
    calling_code: String
    is_eu: Boolean
  }

  type IpInfo {
    ip: String
    type: String
    continent_code: String
    continent_name: String
    country_code: String
    country_name: String
    region_code: String
    region_name: String
    city: String
    zip: String
    latitude: Float
    longitude: Float
    location: Location
    region_plus_code: String
  }

  type Query {
    getIpInfo(ip: String!): IpInfo
    getIpListInfo(ips: String!): [IpInfo]
  }
`);

export default schema;
