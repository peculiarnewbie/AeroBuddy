export default function WaitingForApproval() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				gap: "12px",
			}}
		>
			<h1 style={{ color: "black" }}>Waiting for approval</h1>
			<p style={{ color: "black" }}>we will notify you via your email</p>
		</div>
	);
}
