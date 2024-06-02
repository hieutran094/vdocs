export const hmacPassword = async (password: string) => {
	const hashBuffer = await crypto.subtle.digest(
		{
			name: "SHA-256",
		},
		new TextEncoder().encode(password)
	);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	return hashHex;
};
