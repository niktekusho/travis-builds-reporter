import { AxiosStatic, AxiosInstance } from "axios";

/**
 * Object that builds a configured axios client that works with the public Travis APIs.
 */
declare const client: {
	/**
	 * Creates a preconfigured axios instance that works with the public Travis APIs.
	 *
	 * @param {AxiosStatic} axios Object returned when requiring/importing
	 *  the <b>whole</b> axios package (like in: "const axios = require('axios');")
	 * @param {string} [userAgent=niktekusho/travis-builds-reporter-core/1.0.0] Custom user agent.
	 *
	 * @returns {AxiosInstance} Configured axios instance
	 */
	create: (axios: AxiosStatic, customUserAgent?: string) => AxiosInstance;
}

export = client;
