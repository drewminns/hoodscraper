import React from 'react';

export default React.createClass({
	getInitialState() {
		return {
			city: 'toronto',
			bedrooms: 1,
			min_price: 0,
			max_price: 5000,
			query: ''
		}
	},
	inputHandle(e) {
		e.preventDefault();
		this.setState({
			city: this.refs.city.value,
			bedrooms: this.refs.rooms.value,
			min_price: this.refs.minPrice.value,
			max_price: this.refs.maxPrice.value,
			query: this.refs.query.value
		}, () => { this.props.getInfo(this.state) });
	},
	render() {
		return (
			<header className="searchbar">
				<form onSubmit={this.inputHandle} className="searchbar-form">
					<div className="field-row">
						<label htmlFor="city">City</label>
						<select ref="city" className="searchbar_select searchbar_input" id="city">
							<option value="toronto">Toronto</option>
							<option value="vancouver">Vancouver</option>
							<option value="hamilton">Hamilton</option>
							<option value="edmonton">Edmonton</option>
							<option value="montreal">Montreal</option>
							<option value="victoria">Victoria</option>
							<option value="halifax">Halifax</option>
							<option value="ottawa">Ottawa</option>
						</select>
					</div>
					<div className="field-row">
						<label htmlFor="query">Query</label>
						<input type="text" ref="query" placeholder="Neighbourhood" className="searchbar_input" id="query"/>
					</div>
					<div className="field-row">
						<label htmlFor="rooms">Num of Rooms</label>
						<input type="number" ref="rooms" placeholder="Rooms" defaultValue="1" className="searchbar_input" id="rooms"/>
					</div>
					<div className="field-row">
						<label htmlFor="min-price">Minimum Price</label>
						<input type="number" ref="minPrice" placeholder="Min Price" defaultValue="0" className="searchbar_input" id="min-price"/>
					</div>
					<div className="field-row">
						<label htmlFor="max-price">Maximum Price</label>
						<input type="number"ref="maxPrice" placeholder="Min Price" defaultValue="5000" className="searchbar_input" id="max-price"/>
					</div>
					<input type="submit" defaultValue="Search" className="searchbar_submit" />
				</form>
			</header>
		)
	}
});