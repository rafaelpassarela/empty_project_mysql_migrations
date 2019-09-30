// import * as React from 'react';
import BaseViewGridController, 
      {	BaseColumnInfo, 
		IBaseControllerProps,
		IBaseControllerState } from '../../components/base.view.grid.controller';
import Api from '../../client-api/api';
import { Values } from '../../client-api/api-models';
import ValuesDetailComponent from './values.page.detail';

class ValuesController<
	T,
	P extends IBaseControllerProps,
	S extends IBaseControllerState<Values>>
extends BaseViewGridController<Values, P, S> {

	constructor(props: any) {
		super(props);

		this.renderRight = this.renderRight.bind(this);
		this.renderLeft = this.renderLeft.bind(this);
	}

	protected getPageTitle(): string {
		return 'Values List';
	}

	protected getDescription(): string {
		return 'List of Values loaded from the database';
	}

	protected getLoadindMessage(): string {
		return 'Loading Values List...';
	}

	protected getColumnInfo(): BaseColumnInfo[] {
		return [
			{ fieldName: 'Id', fieldCaption: 'Code', isKey: true, fieldSize: '15%' },
			{ fieldName: 'Name', fieldCaption: 'Value Name' }
		];
	}

	protected getCurrentItemAsString(object: Values): string {
		return object.Id + ' - ' + object.Name;
	}

	protected getDetailClassName(): any {
		return ValuesDetailComponent;
	}

	protected onGetAllItems() : Promise<Values[]> {
		return new Promise<Values[]>((resolve, reject) => {			
			Api.Values().Values_GetAll( 
				(data: any) => {
					resolve(data);
				},
				(error: Error) => {
					reject(error);
				});
		});
	}

	protected onDeleteItem(key: any): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			Api.Values().Values_Delete(
				(data: any) => {
					resolve(true);
				},
				(error: Error) => {
					reject(error)
				}, key);
		});
	}

}

export default ValuesController;