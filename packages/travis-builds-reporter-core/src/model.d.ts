declare namespace BuildsModel {
	export type JSONBuildsModel = BuildsModel & { exportedOn: Date }
}

declare class BuildsModel {
	constructor(repository: string, builds: any[]);

	Repository: string;
	Builds: any[];

	toJSON: () => BuildsModel.JSONBuildsModel

	static fromJSONString: (json: string) => BuildsModel
}

export = BuildsModel;
