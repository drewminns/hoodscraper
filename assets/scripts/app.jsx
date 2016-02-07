import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form/index.jsx';
import PadCard from './card/index.jsx';


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
			<PadCard key={key} content={this.state.posts[key]} />
		)
	},
	getInfo(data) {
		this.setState({
			city: data.city,
			bedrooms: data.bedrooms,
			min_price: data.min_price,
			max_price: data.max_price,
			query: data.query
		}, () => {this.inputHandle()})
	},
	inputHandle() {
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
      <div className="flex-wrapper">
      	<header className="top-nav">
      		<h1>Hood</h1>
	      	<Form getInfo={this.getInfo} />
      	</header>
      	<section className="results">
	      	{this.state.posts.map((obj, i) => this.displayPost(i))}
      	</section>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));