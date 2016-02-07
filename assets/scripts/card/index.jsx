import React from 'react';

export default React.createClass({
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
			<article className="results-card_rental">
				<header className="results-features">
					<ul className="rental-images">
						{imageLinks.map((obj, i) => this.displayImages(i, obj))}
					</ul>
				</header>
				<section className="results-details">
					<p className="rental-title"><a href={content.link}>{content.title}</a></p>
					<p className="rental-posted">Posted on: {content.posted}</p>
					<p className="rental-rooms">{content.rooms}</p>
					<p className="rental-price">{content.price}</p>
				</section>
			</article>
		)
	}
});