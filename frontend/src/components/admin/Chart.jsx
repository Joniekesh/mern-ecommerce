import styled from "styled-components";
import {
	LineChart,
	Line,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const ChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Title = styled.h3`
	color: gray;
	font-weight: 500;
	margin-bottom: 10px;
`;

const Chart = ({ title, data, dataKey, grid }) => {
	return (
		<ChartContainer>
			<Title>{title}</Title>
			<ResponsiveContainer width="95%" aspect={4 / 1}>
				<LineChart data={data}>
					<XAxis dataKey="name" stroke="#5550bd" />
					<Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
					<Tooltip />
					{grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
				</LineChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default Chart;
