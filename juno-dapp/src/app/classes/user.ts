export class User {

	constructor(
		public id: String,
		public username: String,
		public email?: String,
		public admin: boolean = false
	) {
	}
}
