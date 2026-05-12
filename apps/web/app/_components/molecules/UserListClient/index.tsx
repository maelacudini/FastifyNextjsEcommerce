"use client";

import { findAllUsers } from "@/lib/api/user/user.client";
import { useTranslations } from "next-intl";
import { Text } from "../../atoms/Text";

export const UserListClient = () => {
	const { data, error, isLoading } = findAllUsers();
	const t = useTranslations("common");

	if (!data || error) {
		return (
			<p>{t("error")}</p>
		);
	}

	if (isLoading) {
		return (
			<p>{t("loading")}</p>
		);
	}

	return (
		<div>
			<Text tag="h1" size="2xl" font="heading" weight="semibold">{t("client_fetch")}</Text>
			{data.items.length > 0 ? data.items.map((user) => (
				<p className="text-foreground" key={user.id}>{user.email}</p>
			)) : <p>No users.</p>}
		</div>
	);
};
