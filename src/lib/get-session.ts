import { cache } from "react";

async function loadAuthAndGetSession() {
	const mod = await import("@/auth");
	const auth = mod.auth as unknown as (() => Promise<any>);
	return auth();
}

export default cache(loadAuthAndGetSession);
