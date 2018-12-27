import * as React from 'react';
import { Glyphicon, Badge } from 'react-bootstrap';

export class GridColumn {
	Field: string;
	Title?: string;
}

export type GridGetRowClass = (data: Object) => any;
export type GridGetColumnClass = (field: string, value: any) => any;
export enum ActionType {
	INSERT,
	UPDATE,
	DELETE
}

type GridProps = {
	Columns: GridColumn[],
	DataSource: Array<Object>,
	KeyField: string,
	ReadOnly?: boolean,
	OnRenderRow?: GridGetRowClass,
	OnRenderColumn?: GridGetColumnClass,
	Actions?: Array<ActionType>
}

class Grid extends React.Component<GridProps, {}> {

	renderColumn = (fieldName: string, value: any) => {
		return (
			<td className={(this.props.OnRenderColumn != undefined) ? this.props.OnRenderColumn(fieldName, value) : ''}>
				{value}
			</td>
		);
	}

	getActionHeader = () => {

		if (this.props.Actions != undefined) {
			// render a plus img if INSERT is present
			if (this.props.Actions.indexOf(ActionType.INSERT) > -1) {
				return (
					<th style={{ width: 75, textAlign: 'center' }}>
						<a href="#">
							<Badge>
								<Glyphicon glyph="plus" />
							</Badge>
						</a>
					</th>
				);
			}
			else if (this.props.Actions.length > 0) {
				return <th style={{ width: 75 }}>&nbsp;</th>;
			}
		}

		return null;
	}

	getEditActions = (data: Object) => {
		if (this.props.Actions == undefined)
			return null;

		let actions = [];

		if (this.props.Actions.indexOf(ActionType.DELETE) > -1)
			actions.push(<Badge><Glyphicon glyph="trash" /></Badge>)

		if (this.props.Actions.indexOf(ActionType.UPDATE) > -1)
			actions.push(<Badge><Glyphicon glyph="edit" /></Badge>)

		if (actions.length > 1)
			actions.splice(1, 0, <span>&nbsp;|&nbsp;</span>);

		return (<td>{actions}</td>);
	}

	render() {

		const trList = [
			this.getActionHeader(),
			this.props.Columns.map((c: GridColumn) => <th>{c.Title}</th>)
		];

		const trData = this.props.DataSource.map((ds: Object) => {
			return (
				// render the Row
				<tr className={(this.props.OnRenderRow != undefined) ? this.props.OnRenderRow(ds) : ''}>
					{this.getEditActions(ds)}
					{this.props.Columns.map((c: GridColumn) => {
						// for each column, render a TD element
						return (this.renderColumn(c.Field, ds[c.Field]))
					})}
				</tr>
			);

		});

		return (
			<table className="table table-striped table-bordered table-hover table-condensed">
				<thead><tr>{trList}</tr></thead>
				<tbody>{trData}</tbody>
			</table>
		);
	}

}

export default Grid;