import "./additionalstyles.css";
import "./styles.css";

export default function HomeFooter() {
	return (
		<section className="HomeFooter">
			<div className="Container Home-Footer-Container">
				<div style={{ display: "flex", gap: "40px" }}>
					<p>Hello from Indonesia</p>
					<a className="FooterButton">Follow</a>
				</div>
				<div style={{ display: "flex", gap: "40px" }}>
					<a className="FooterButton">Privacy</a>
					<a className="FooterButton">About</a>
					<a className="FooterButton">License</a>
				</div>
			</div>
		</section>
	);
}
