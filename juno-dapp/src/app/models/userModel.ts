export class UserModel {

	constructor(
		public id: string,
		public username: string,
		public admin: boolean = false
	) {
	}
}
