import * as React from 'react';
// import '../inc/grid.component.css';

export class GridColumn {
	Field: string;
	Title?: string;
}

type GridProps = {
	Columns: GridColumn[],
	DataSource: Array<Object>,
	ReadOnly?: boolean
}

class Grid extends React.Component<GridProps, {}> {

	render() {

		const trList = this.props.Columns.map((c: GridColumn) => <th>{c.Title}</th>);

		const trData = this.props.DataSource.map((ds: Object) => {
			return (<tr>
				<td>{ds['Id']}</td>
				<td>{ds['Name']}</td>
			</tr>);

		});

		// const trData = (
		// 	<tr>
		// 		{this.props.Columns.map((c: GridColumn) => {
		// 			this.props.DataSource
		// 		})}
		// 	</tr>);

		return (
			<table className="table table-striped table-bordered table-hover">
				<thead><tr>{trList}</tr></thead>
				<tbody>{trData}</tbody>
			</table>
		);
	}

}

export default Grid;