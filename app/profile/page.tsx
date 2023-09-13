import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AccountInfo from "./AccountInfo";

export default async function Profile() {
	const session = await getServerSession(authOptions);
	return (
		<div>
			{session ? <h1>Signed in</h1> : <h1>Not Signed in</h1>}
			<AccountInfo session={session}></AccountInfo>
		</div>
	);
}
