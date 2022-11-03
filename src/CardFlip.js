import ReactCardFlip from "react-card-flip";
import React from "react";

class CardFlip extends React.Component {
	constructor() {
		super();
		this.state = {
			isFlipped: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
	}

	render() {
		return (
			<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
				<div className="front">
					<div className="image">
						<img
							alt="dog"
							style={{ width: 500, height: 500 }}
							src="https://www.svgrepo.com/show/327388/logo-react.svg"
						/>
					</div>
					<button onClick={this.handleClick}>Click to flip</button>
				</div>
				<div className="back">
					<div className="noimage">
						<img
							style={{ width: 500, height: 500 }}
							alt="dog"
							src="https://mui.com/static/logo.png"
						/>
					</div>
					<button onClick={this.handleClick}>Click to flip</button>
				</div>
			</ReactCardFlip>
		);
	}
}

export default CardFlip;
