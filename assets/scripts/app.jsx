import React from 'react';
import ReactDOM from 'react-dom';

const Card = React.createClass({
	displayImages(key, data) {
		let link = data;
		if (!data.startsWith('http://i.ebayimg')) {
			link = `http://images.craigslist.org/${data}_300x300.jpg`
		}
		return (
			<li key={key}><img src={link} alt={link} /></li>
		)
	},
	render() {
		const content = this.props.content;
		const imageLinks = content.image.split(",").map(link => link.replace(/(0:)/g, ''));
		return (
			<article className="rental">
				<p className="rental-title"><a href={content.link}>{content.title}</a></p>
				<p className="posted">Posted on: {content.posted}</p>
				<p className="rooms">{content.rooms}</p>
				<p className="price">{content.price}</p>
				<ul className="rental-images">
					{imageLinks.map((obj, i) => this.displayImages(i, obj))}
				</ul>
			</article>
		)
	}
});

const App = React.createClass({
	getInitialState() {
		return {
			posts: [],
			city: 'toronto',
			bedrooms: 1,
			min_price: 0,
			max_price: 5000,
			query: ''
		}
	},
	displayPost(key) {
		return (
			<Card key={key} content={this.state.posts[key]} />
		)
	},
	handleCity(e) {
		this.setState({ city: e.target.value });
	},
	handleQuery(e) {
		this.setState({ query: e.target.value });
	},
	handleRooms(e) {
		this.setState({ bedrooms: e.target.value });
	},
	handleMinPrice(e) {
		this.setState({ min_price: e.target.value });
	},
	handleMaxPrice(e) {
		this.setState({ max_price: e.target.value });
	},
	inputHandle(e) {
		e.preventDefault();
		const data = $.ajax({
			url: `http://localhost:5000/api?rooms=${this.state.bedrooms}&city=${this.state.city}&min_price=${this.state.min_price}&max_price=${this.state.max_price}&query=${this.state.query}`,
			method: 'GET',
			dataType: 'json'
		});
		$.when(data)
			.done(res => this.setState({ posts: res }))
			.fail(err => console.log(err)); // To deal with
	},
  render() {
  	const posts = this.state.posts;
    return (
      <div>
      	<header className="searchbar">
      		<form onSubmit={this.inputHandle}>
      			<select onChange={this.handleCity}>
      				<option value="toronto">Toronto</option>
      				<option value="vancouver">Vancouver</option>
      				<option value="hamilton">Hamilton</option>
      				<option value="edmonton">Edmonton</option>
      				<option value="montreal">Montreal</option>
      				<option value="victoria">Victoria</option>
      				<option value="halifax">Halifax</option>
      				<option value="ottawa">Ottawa</option>
      			</select>
						<input type="text" onChange={this.handleQuery} placeholder="Neighbourhood" />
						<input type="number" onChange={this.handleRooms} placeholder="Rooms" defaultValue="1"/>
						<input type="num" onChange={this.handleMinPrice} placeholder="Min Price" defaultValue="0"/>
						<input type="num" onChange={this.handleMaxPrice} placeholder="Min Price" defaultValue="5000"/>
						<input type="submit"/>
      		</form>
      	</header>
      	{this.state.posts.map((obj, i) => this.displayPost(i))}
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));