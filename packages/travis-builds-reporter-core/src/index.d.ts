// Type definitions for travis-builds-reporter-core 1.0.0
// Project: travis-builds-reporter-core
// Definitions by: niktekusho <https://github.com/niktekusho>

import {AxiosInstance, AxiosRequestConfig} from 'axios';
import exporter = require("./exporter");
import fetcher = require("./fetcher");
import BuildsModel = require("./model");

declare namespace TravisBuildsReporterCore {
	export interface ClientOptions  {
		/**
		 * Custom user agent. Default is 'niktekusho/travis-builds-reporter-core/1.0.0'
		 */
		userAgent?: string;
		/**
		 * Requests timeout. Default is 10000 ms.
		 */
		timeout?: number;
		/**
		 * Base url to fetch builds from. Default is 'https://api.travis-ci.org' (Open Source Travis APIs).
		 */
		baseURL?: string;
		/**
		 * Host to fetch builds from. Default is 'api.travis-ci.org' (Open Source Travis APIs).
		 */
		host?: string;
	}
}

declare const TravisBuildsReporterCore: {
	/**
	 * Creates a preconfigured axios instance that works with the public Travis APIs.
	 *
	 * @param {TravisBuildsReporterCore.ClientOptions} options Client options.
	 *
	 * @returns {AxiosInstance} Configured axios instance
	 */
	createClient: (options?: TravisBuildsReporterCore.ClientOptions) => AxiosInstance,
	exporter,
	fetcher,
	BuildsModel
}

export = TravisBuildsReporterCore;
