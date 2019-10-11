/********************************************************************
*            MrRafael.ca - Swagger Generator for React              *
* Sample Api by MrRafael.ca - v1                                    *
* This client Api was generated on 06/10/2019 20:48:13              *
*                                          Do not change this file! *
*                                                                   *
* Optimized for use as part of the project                          *
* https://github.com/rafaelpassarela/empty_project_mysql_migrations *
*                                                                   *
* Generated at -> http://mrrafael.ca/swgen/                         *
********************************************************************/

const DEV_URL = "http://localhost:57431"
const PROD_URL= "http://mrrafael.ca:1234"
const BASE_API = "/api/"

export const ApiConfig = {
	BasePath: BASE_API,
	URL: ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL) + BASE_API
}
