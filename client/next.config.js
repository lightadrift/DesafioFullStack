/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_DB_URL: "mongodb://mongo:824j2AX4zThZbRGAH96d@containers-us-west-117.railway.app:7926"
  }
}

module.exports = nextConfig
