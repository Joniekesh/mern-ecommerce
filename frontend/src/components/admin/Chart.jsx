import styled from "styled-components";
import {
	AreaChart,
	Area,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{
		name: "January",
		Total: 1200,
	},
	{
		name: "February",
		Total: 2100,
	},
	{
		name: "March",
		Total: 800,
	},
	{
		name: "April",
		Total: 1600,
	},
	{
		name: "May",
		Total: 900,
	},
	{
		name: "June",
		Total: 1700,
	},
];

const Title = styled.h3`
	color: gray;
	font-weight: 500;
	margin-bottom: 10px;
`;

const Chart = () => {
	return (
		<>
			<Title>Last six months Revenue</Title>
			<ResponsiveContainer width="100%" aspect={2 / 1}>
				<AreaChart
					width={730}
					height={400}
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="Total"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(total)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</>
	);
};

export default Chart;
