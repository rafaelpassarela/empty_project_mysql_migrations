import * as React from 'react';
import Glyphicon from './glyphicon.component';
import Badge from 'react-bootstrap/Badge';

export class GridColumn {
	Field: string;
	Title?: string;
}

export type GridGetRowClass = (data: Object) => any;
export type GridHandleDataEvent = (data: Object) => any;
export type GridGetColumnClass = (field: string, value: any) => any;
export enum ActionType {
	INSERT,
	UPDATE,
	DELETE
}

const btnStyle = {
	cursor: 'pointer'
};

type GridProps = {
	Columns: GridColumn[],
	DataSource: Array<Object>,
	KeyField: string,
	ReadOnly?: boolean,
	Actions?: Array<ActionType>,
	OnRenderRow?: GridGetRowClass,
	OnRenderColumn?: GridGetColumnClass,
	OnInsert?: GridHandleDataEvent,
	OnUpdate?: GridHandleDataEvent,
	OnDelete?: GridHandleDataEvent
}

class Grid extends React.Component<GridProps, {}> {

	handleInsert = (data: Object) => {
		if (this.props.OnInsert != undefined) {
			this.props.OnInsert(data);
		}
	}

	handleUpdate = (data: Object) => {
		if (this.props.OnUpdate != undefined) {
			this.props.OnUpdate(data);
		}
	}

	handleDelete = (data: Object) => {
		if (this.props.OnDelete != undefined) {
			this.props.OnDelete(data);
		}
	}

	renderColumn = (fieldName: string, value: any) => {
		return (
			<td key={"Column_" + fieldName} className={(this.props.OnRenderColumn != undefined) ? this.props.OnRenderColumn(fieldName, value) : ''}>
				{value}
			</td>
		);
	}

	getActionHeader = () => {

		if (this.props.Actions != undefined) {
			// render a plus img if INSERT is present
			if (this.props.Actions.indexOf(ActionType.INSERT) > -1) {
				return (
					<th key="actionHeaderInsert" style={{ width: 81, textAlign: 'center' }}>
						<Badge onClick={this.handleInsert} style={btnStyle} variant="success">
							<Glyphicon glyph="plus" />
						</Badge>
					</th>
				);
			}
			else if (this.props.Actions.length > 0) {
				return <th key="actionHeaderInsert" style={{ width: 81 }}>&nbsp;</th>;
			}
		}

		return null;
	}

	getEditActions = (data: Object) => {
		let actionKeyName: string = "editAction_" + data[this.props.KeyField];

		if (this.props.Actions == undefined)
			return null;

		let actions = [];

		if (this.props.Actions.indexOf(ActionType.DELETE) > -1) {
			actions.push(
				<Badge
					key={"badge_d_" + actionKeyName}
					onClick={() => this.handleDelete(data)}
					variant="danger"
					style={btnStyle}> <Glyphicon glyph="trash-alt" />
				</Badge>);
		}

		if (this.props.Actions.indexOf(ActionType.UPDATE) > -1)
			actions.push(
				<Badge
					key={"badge_u_" + actionKeyName}
					onClick={() => this.handleUpdate(data)}
					variant="info"
					style={btnStyle}> <Glyphicon glyph="edit" />
				</Badge>)

		if (actions.length > 1)
			actions.splice(1, 0, <span key={"badge_s_" + actionKeyName}>&nbsp;|&nbsp;</span>);

		return (<td key={actionKeyName}>{actions}</td>);
	}

	render() {
		const trList = [
			this.getActionHeader(),
			this.props.Columns.map((c: GridColumn) => <th key={"header_" + c.Field}>{c.Title}</th>)
		];

		let rowKey: number = 0;
		const trData = this.props.DataSource.map((ds: Object) => {
			rowKey += 1;
			return (
				// render the Row
				<tr key={rowKey} className={(this.props.OnRenderRow != undefined) ? this.props.OnRenderRow(ds) : ''}>
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