"use client";

import { findAllUsers } from "@/lib/api/user/user.client";
import { useTranslations } from "next-intl";

export const UserListClient = () => {
	const { data, error, isLoading } = findAllUsers();
	const t = useTranslations("common");

	if (isLoading) {
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
			<p className="text-2xl">{t("client_fetch")}</p>
			{data.items.length > 0 ? data.items.map((user) => (
				<p className="text-foreground" key={user.id}>{user.email}</p>
			)) : <p>No users.</p>}
		</div>
	);
};
