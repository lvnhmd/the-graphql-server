## GraphQL IP Info API

### About

A simple GraphQL API built with TypeScript and Express. This API provides information about IP addresses, leveraging the [IPAPI service](https://ipapi.com/).


[Spec](https://github.com/lvnhmd/the-graphql-server/blob/master/Backend%20Node%20Interview%20structure%5B41%5D%5B67%5D.pdf)

---

### Running in Development

Clone the repository:

`git clone https://github.com/lvnhmd/the-graphql-server.git`

Navigate to the project directory:

`cd the-graphql-server`

Create a **.env** file based on **.env.example** :

`cp .env.example .env`

Ensure the following environment variables are set in the **.env** file:
```
ACCESS_KEY=<ipapi_access_key>
BASE_URL=http://api.ipapi.com/api
```

Run `docker-compose up --build` to start the application.

#### > Important Note
This API initially used the IP data service from [ipapi.co](https://ipapi.co/), as per the spec. However, due to rate limiting issues, I have decided to switch to [ipapi.com](https://ipapi.com/) for more reliable and unrestricted access.

To use ipapi.com, this API requires an ipapi.com API key. You can obtain your own API key by registering [here](https://ipapi.com/). If you need a quick start, I can provide you with my API key. Just drop an email to ali.elvin@gmail.com to request it.

---

### API Endpoint Documentation

You can access the GraphQL API and the Graph*i*QL interface at http://localhost:4000 when the application is running.

#### Testing via GraphiQL

- Query IP information:

```
query {
  getIpInfo(ip: "8.8.8.8") {
    ip
    city
    region_name
    region_code
    country_code
    country_name
    latitude
    longitude
    timezone
    region_plus_code
  }
}
```

- Query information for multiple IPs:
```
query {
  getIpListInfo(ips: "8.8.8.8,8.8.4.4") {
    ip
    city
    region_name
    region_code
    country_code
    country_name
    latitude
    longitude
    timezone
    region_plus_code
  }
}

```

---
### Running Tests

To run the tests, use the following commands:


Install dependencies:

`npm install`

Run tests:

`npm test`
