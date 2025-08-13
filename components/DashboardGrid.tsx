
import { Responsive, WidthProvider, Layouts } from "react-grid-layout";
import { VersionEnvInfo } from "./VersionEnvInfo";


const ResponsiveGridLayout = WidthProvider(Responsive);

function DashboardGrid(props: any) {
	return (
		<>
			<VersionEnvInfo />
			<ResponsiveGridLayout {...props} />
		</>
	);
}

export default DashboardGrid;
