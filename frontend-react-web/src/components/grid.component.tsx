import * as React from 'react';

export class GridColumn {
	Field: string;
	Title?: string;
}

export type GridGetRowClass = (data: Object) => any;
export type GridGetColumnClass = (field: string, value : any) => any;

type GridProps = {
	Columns: GridColumn[],
	DataSource: Array<Object>,
	ReadOnly?: boolean,
	OnRenderRow?: GridGetRowClass,
	OnRenderColumn?: GridGetColumnClass
}

class Grid extends React.Component<GridProps, {}> {

	renderColumn = (fieldName: string, value: any) => {
		return (
			<td className={(this.props.OnRenderColumn != undefined) ? this.props.OnRenderColumn(fieldName, value) : ''}>
				{value}
			</td>
		);
	}

	render() {

		const trList = this.props.Columns.map((c: GridColumn) => <th>{c.Title}</th>);

		const trData = this.props.DataSource.map((ds: Object) => {
			return (
				// render the Row
				<tr className={(this.props.OnRenderRow != undefined) ? this.props.OnRenderRow(ds) : ''}>
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