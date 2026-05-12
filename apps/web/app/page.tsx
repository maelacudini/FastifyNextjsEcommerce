import { UserListClient } from "./_components/molecules/UserListClient";
import { UserListServer } from "./_components/molecules/UserListServer";

const Homepage = () => {
	return (
		<div className="h-dvh bg-background p-6 space-y-6">
			<UserListClient />
			<UserListServer />
		</div>
	);
};

export default Homepage;