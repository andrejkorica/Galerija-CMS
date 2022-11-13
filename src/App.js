import Home from "./Home";
import "./App.css";

function App() {
	return (
		<div>
			<div className="container">
				<div>
					<img src="https://picsum.photos/1920/1080" alt="1" />
				</div>
				<div>
					<img src="https://picsum.photos/900/500" alt="2" />
				</div>
				<div>
					<img src="https://picsum.photos/800/400" alt="3" />
				</div>
				<div>
					<img src="https://picsum.photos/700/500" alt="4" />
				</div>
				<div>
					<img src="https://picsum.photos/500/400" alt="5" />
				</div>
			</div>
			<div className="containerflip">
				<div>
					<img src="https://picsum.photos/1920/1080" alt="1" />
				</div>
				<div>
					<img src="https://picsum.photos/900/500" alt="2" />
				</div>
				<div>
					<img src="https://picsum.photos/800/400" alt="3" />
				</div>
				<div>
					<img src="https://picsum.photos/700/500" alt="4" />
				</div>
				<div>
					<img src="https://picsum.photos/500/400" alt="5" />
				</div>
			</div>
		</div>
	);
}

export default App;
