import * as React from 'react';
import Glyphicon from './glyphicon.component';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

export class GridColumn {
	fieldName: string;
	fieldCaption?: string;
	fieldSize?: string | number | undefined;
}

export type GridGetRowClass = (data: Object) => any;
export type GridHandleDataEvent = (data: Object) => any;
export type GridGetColumnClass = (field: string, value: any) => any;

const btnStyle = {
	cursor: 'pointer'
};

type GridProps = {
	columns: GridColumn[],
	dataSource: Array<Object>,
	keyField: string,
	readOnly?: boolean,
	actions?: Array<'insert' | 'update' | 'delete'>,
	onRenderRow?: GridGetRowClass,
	onRenderColumn?: GridGetColumnClass,
	onInsert?: GridHandleDataEvent,
	onUpdate?: GridHandleDataEvent,
	onDelete?: GridHandleDataEvent
}

class Grid extends React.Component<GridProps, {}> {

	constructor(props: any) {
		super(props);

		this.handleInsert = this.handleInsert.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.renderColumn = this.renderColumn.bind(this);
		this.getActionHeader = this.getActionHeader.bind(this);
		this.getEditActions = this.getEditActions.bind(this);
		this.getColumnWidth = this.getColumnWidth.bind(this);		
	}

	handleInsert = (data: Object) => {
		if (this.props.onInsert !== undefined) {
			this.props.onInsert(data);
		}
	}

	handleUpdate = (data: Object) => {
		if (this.props.onUpdate !== undefined) {
			this.props.onUpdate(data);
		}
	}

	handleDelete = (data: Object) => {
		if (this.props.onDelete !== undefined) {
			this.props.onDelete(data);
		}
	}

	renderColumn = (fieldName: string, value: any) => {
		return (
			<td key={"Column_" + fieldName} className={(this.props.onRenderColumn !== undefined) ? this.props.onRenderColumn(fieldName, value) : ''}>
				{value}
			</td>
		);
	}

	getActionHeader = () => {

		if (this.props.actions !== undefined) {
			// render a plus img if INSERT is present
			if (this.props.actions.indexOf('insert') > -1) {
				return (
					<th key="actionHeaderInsert" style={{ width: 68, textAlign: 'center' }}>
						<Badge onClick={this.handleInsert} style={btnStyle} variant="success">
							<Glyphicon glyph="plus" />
						</Badge>
					</th>
				);
			}
			else if (this.props.actions.length > 0) {
				return <th key="actionHeaderInsert" style={{ width: 68 }}>&nbsp;</th>;
			}
		}

		return null;
	}

	getEditActions = (data: Object) => {
		let localData: {[index: string] : any} = data;
		let actionKeyName: string = "editAction_" + localData[this.props.keyField];

		if (this.props.actions === undefined)
			return null;

		let actions = [];

		if (this.props.actions.indexOf('delete') > -1) {
			actions.push(
				<Badge
					key={"badge_d_" + actionKeyName}
					onClick={() => this.handleDelete(data)}
					variant="danger"
					style={btnStyle}> <Glyphicon glyph="trash-alt" />
				</Badge>);
		}

		if (this.props.actions.indexOf('update') > -1)
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

	getColumnWidth(col: GridColumn): string | number | undefined {
		let size = col.fieldSize;
		if (size == null)
			size = undefined;
		return size;
	}

	render() {
		const trList = [
			this.getActionHeader(),
			this.props.columns.map((c: GridColumn) => 		                       
			    <th key={"header_" + c.fieldName} style={{ width: this.getColumnWidth(c)}}>{c.fieldCaption}</th>
			)
		];

		let rowKey: number = 0;
		const trData = this.props.dataSource.map((ds: Object) => {
			let localDS : {[index: string]:any} = ds;
			rowKey += 1;
			return (
				// render the Row
				<tr key={rowKey} className={(this.props.onRenderRow !== undefined) ? this.props.onRenderRow(ds) : ''}>
					{this.getEditActions(ds)}
					{this.props.columns.map((c: GridColumn) => {
						// for each column, render a TD element
						return (this.renderColumn(c.fieldName, localDS[c.fieldName]))
					})}
				</tr>
			);
		});

		return (
			<Table bordered hover responsive="md" striped size="sm">
				<thead><tr>{trList}</tr></thead>
				<tbody>{trData}</tbody>
			</Table>
		);
	}
}

export default Grid;