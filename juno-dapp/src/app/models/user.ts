export class User {

	constructor(
		public id: String,
		public username: String,
		public firstName?: String,
		public lastName?: String,
		public email?: String,
		public admin: boolean = false
	) {
	}
}
