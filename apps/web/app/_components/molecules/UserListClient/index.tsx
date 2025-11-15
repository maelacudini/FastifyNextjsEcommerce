"use client";

import { findAllUsers } from "@/lib/api/user/user.client";
import { useTranslations } from "next-intl";

export const UserListClient = () => {
	const data = findAllUsers();
	const { data: users, error, isLoading } = data;
	const t = useTranslations("common");

	if (isLoading) {
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
			<p className="text-2xl">{t("client_fetch")}</p>
			{users.map((user) => (
				<p className="text-foreground" key={user.name}>{user.name}</p>
			))}
		</div>
	);
};
