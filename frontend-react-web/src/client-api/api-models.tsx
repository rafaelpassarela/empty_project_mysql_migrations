/********************************************************************
*            MrRafael.ca - Swagger Generator for React              *
* Sample Api by MrRafael.ca - v1                                    *
* This client Api was generated on 29/09/2019 22:12:38              *
*                                          Do not change this file! *
*                                                                   *
* Optimized for use as part of the project                          *
* https://github.com/rafaelpassarela/empty_project_mysql_migrations *
*                                                                   *
* Generated at -> http://mrrafael.ca/swgen/                         *
********************************************************************/

export class BaseModel {
	Id: number;
}

export class AddExternalLoginBindingModel {
	ExternalAccessToken: string;
}

export class ChangePasswordBindingModel {
	OldPassword: string;
	NewPassword: string;
	ConfirmPassword: string;
}

export class ExternalLoginViewModel {
	Name: string;
	Url: string;
	State: string;
}

export class IdentityRole {
	Users: Array<IdentityUserRole>;
	Id: string;
	Name: string;
}

export class IdentityUserRole {
	UserId: string;
	RoleId: string;
}

export class ManageInfoViewModel {
	LocalLoginProvider: string;
	Email: string;
	Logins: Array<UserLoginInfoViewModel>;
	ExternalLoginProviders: Array<ExternalLoginViewModel>;
}

export class RegisterBindingModel {
	Email: string;
	Password: string;
	ConfirmPassword: string;
	FirstName: string;
	LastName: string;
}

export class RegisterExternalBindingModel {
	Email: string;
}

export class RemoveLoginBindingModel {
	LoginProvider: string;
	ProviderKey: string;
}

export class SetPasswordBindingModel {
	NewPassword: string;
	ConfirmPassword: string;
}

export class TokenResult {
	access_token: string;
	token_type: string;
	expires_in: number;
	userName: string;
	issued: string;
	expires: string;
}

export class UserInfoViewModel {
	Id: string;
	Name: string;
	Email: string;
	HasRegistered: boolean;
	LoginProvider: string;
	Roles: Array<string>;
}

export class UserLoginInfoViewModel {
	LoginProvider: string;
	ProviderKey: string;
}

export class Values extends BaseModel {
	Name: string;
}

