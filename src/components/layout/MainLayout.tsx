// import { createElement } from "react";
// import {
// 	UploadOutlined,
// 	UserOutlined,
// 	VideoCameraOutlined,
// } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
	{
		key: "1",
		label: "Dashboard",
	},
	{
		key: "2",
		label: "Profile",
	},
	{
		key: "3",
		label: "User Management",
		children: [
			{
				key: "31",
				label: "Dashboard",
			},
			{
				key: "32",
				label: "Profile",
			},
		],
	},
];
// const items = [
// 	UserOutlined,
// 	VideoCameraOutlined,
// 	UploadOutlined,
// 	UserOutlined,
// ].map((icon, index) => ({
// 	key: String(index + 1),
// 	icon: createElement(icon),
// 	label: `nav ${index + 1}`,
// }));

const MainLayout: React.FC = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout style={{ height: "100vh" }}>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div
					style={{
						color: "white",
						height: "4rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<h1>Uni</h1>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["4"]}
					items={items}
				/>
			</Sider>
			<Layout>
				{/* IF YOU WANT TO SKIP THE THEME */}
				{/* <Header style={{ padding: 0}} /> */}
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ margin: "24px 16px 0" }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						{/* LOADING OTHER COMPONENTS */}
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
