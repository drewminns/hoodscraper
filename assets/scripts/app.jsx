import React from 'react';
import ReactDOM from 'react-dom';

const Card = React.createClass({
	displayImages(key, data) {
		const link = `http://images.craigslist.org/${data}_300x300.jpg`
		return (
			<li key={key}><img src={link} /></li>
		)
	},
	render() {
		const content = this.props.content;
		const images = content.image.split(",");
		const imageLinks = images.map(link => {
			return link.replace(/(0:)/g, '');
		});
		return (
			<article>
				<p><a href={content.link}>{content.title}</a></p>
				<ul>
					{imageLinks.map((obj, i) => this.displayImages(i, obj))}
				</ul>
			</article>
		)
	}
});

const App = React.createClass({
	getInitialState() {
		return {
			posts: []
		}
	},
	componentDidMount() {
		$.ajax({
			url: 'http://localhost:5000/api',
			method: 'GET',
			dataType: 'json'
		}).then(res => this.setState({ posts: res }));
	},
	displayPost(key) {
		return (
			<Card key={key} content={this.state.posts[key]} />
		)
	},
  render() {
  	const posts = this.state.posts;
    return (
      <div>
      	{this.state.posts.map((obj, i) => this.displayPost(i))}
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));