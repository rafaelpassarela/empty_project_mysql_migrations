import SimpleCrypto from "simple-crypto-js";

class MyCrypto {

	private myKey: string = "MrRafael.ca-SwaggerForReact";
	private simpleCrypto: SimpleCrypto;

	constructor() {
		this.simpleCrypto = new SimpleCrypto(this.myKey);
	}

	public encrypt(value: string) : string {
		return this.simpleCrypto.encrypt(value);
	}

	public decrypt(value: string) : string {
		return this.simpleCrypto.decrypt(value) as string;
	}

}

export const myCrypto = new MyCrypto();