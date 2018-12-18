const DEV_URL = 'http://localhost:57431';
const PROD_URL= 'http://mrrafael.ca:1234';
const BASE_API = '/api/'

export const ApiConfig = {
	BasePath: BASE_API,
	URL: ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? DEV_URL : PROD_URL) + BASE_API
}