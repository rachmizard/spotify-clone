/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["i.scdn.co", "t.scdn.co"],
	},
};

module.exports = nextConfig;
