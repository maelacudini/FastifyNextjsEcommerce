"use client";

import { findAllUsers } from "@/lib/api/user/user.client";
import { useTranslations } from "next-intl";
import { Button } from "../../shadcn/button";

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
			<p className="text-2xl">{t("client_fetch")}</p>
			{data.items.length > 0 ? data.items.map((user) => (
				<p className="text-foreground" key={user.id}>{user.email}</p>
			)) : <p>No users.</p>}
			<Button>button</Button>
		</div>
	);
};
