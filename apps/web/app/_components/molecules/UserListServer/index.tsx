import { findAllUsers } from "@/lib/api/user/user.server";
import { getTranslations } from "next-intl/server";

export const UserListServer = async () => {
	const { data, error } = await findAllUsers();
	const t = await getTranslations("common");

	if (error) {
		return (
			<p>{t("loading")}</p>
		);
	}

	if (!data || error) {
		return (
			<p>{t("error")}</p>
		);
	}	

	return (
		<div>
			<p className="text-2xl">{t("server_fetch")}</p>
			{data.items.map((user) => (
				<p className="text-foreground" key={user.id}>{user.email}</p>
			))}
		</div>
	);
};
