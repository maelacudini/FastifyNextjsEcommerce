import { findAllUsers } from "@/lib/api/user/user.server";
import { getTranslations } from "next-intl/server";

export const UserListServer = async () => {
	const { data: users, error } = await findAllUsers();
	const t = await getTranslations("common");

	if (error) {
		return (
			<p>{t("loading")}</p>
		);
	}

	if (!users || error) {
		return (
			<p>{t("error")}</p>
		);
	}

	return (
		<div>
			<p className="text-2xl">{t("server_fetch")}</p>
			{users.map((user) => (
				<p className="text-foreground" key={user.name}>{user.name}</p>
			))}
		</div>
	);
};
