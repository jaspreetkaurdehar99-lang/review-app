import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Battery, ChevronDown, ChevronUp, CircleHelp,
  Diamond, Headphones, Layers3, ShieldCheck, Star, Tag, Target, ThumbsDown,
  ThumbsUp, X
} from 'lucide-react';
import './styles.css';

const photos = [
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=420&q=80',
  'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?auto=format&fit=crop&w=420&q=80',
  'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=420&q=80'
];

const attributes = [
  ['Quality', '4.7', Diamond], ['Battery Backup', '4.5', Battery], ['Precision', '4.4', Target],
  ['Design', '4.8', Layers3], ['Durability', '4.5', ShieldCheck], ['Value for Money', '4.6', Tag],
  ['Service', '4.6', Headphones]
];

const reviews = [
  { score: '4.5', title: 'Great Quality & Look', text: 'The build quality is solid and it looks premium. Totally worth the price.', name: 'Sneha Pandey', initial: 'S', likes: 56, replies: 4 },
  { score: '5.0', title: 'Highly Recommended', text: 'I’ve been using it for a month now and it works perfectly. No issues at all.', name: 'Aman Verma', initial: 'A', likes: 41, replies: 2 },
  { score: '4.0', title: 'Value for Money', text: 'Good performance, stylish design and battery backup is also reliable.', name: 'Ritika Sharma', initial: 'R', likes: 28, replies: 3 }
];

function Stars({ value = 5 }) {
  return <span className="stars" aria-label={`${value} out of 5 stars`}>{[0, 1, 2, 3, 4].map(i => <Star key={i} size={27} fill={i < Math.floor(value) ? 'currentColor' : i < value ? 'url(#half)' : 'none'} />)}</span>;
}

function Verified() { return <span className="verified"><ShieldCheck size={18} fill="currentColor" /> Verified Buyer</span>; }

function ReviewCard({ review }) {
  return <article className="review-card">
    <div className="review-heading"><span className="score-pill">{review.score} <Star size={15} fill="currentColor" /></span><strong>{review.title}</strong><time>5 months ago</time></div>
    <p>{review.text} <button className="more">...more</button></p>
    <div className="review-footer"><div className="reviewer"><span className="avatar">{review.initial}</span><div><strong>{review.name}</strong><Verified /></div></div><div className="reactions"><span><ThumbsUp size={20} /> {review.likes}</span><span><ThumbsDown size={20} /> {review.replies}</span></div></div>
  </article>;
}

function App() {
  const [expanded, setExpanded] = useState(true);
  const [slide, setSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = useMemo(() => showAll ? [...reviews, ...reviews] : reviews, [showAll]);
  return <main className="page"><svg width="0" height="0"><defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs></svg>
    <section className={`reviews-shell ${expanded ? '' : 'collapsed'}`}>
      <header className="section-header"><div className="brand-mark"><Star size={23} fill="currentColor" /></div><h1>Customer Reviews</h1><button className="icon-button collapse-button" onClick={() => setExpanded(!expanded)} aria-label="Toggle reviews"><ChevronUp size={25} /></button></header>
      {expanded && <>
        <div className="summary-grid">
          <div className="rating-summary"><div className="rating-number">4.6<span>/5</span></div><div className="good-pill"><ThumbsUp size={20} fill="currentColor" /> Very Good</div><Stars value={4.6} /><p>Based on 802 ratings by <Verified /></p></div>
          <div className="photo-block"><div className="photo-top"><h2>Customer Photos <small>(27)</small></h2><button className="text-button">View All</button></div><div className="photo-row">{photos.map((src, i) => <div className="photo" key={src}><img src={src} alt="Customer product photo" />{i === 2 && <span className="photo-count">+24</span>}</div>)}</div></div>
          <div className="attributes"><div className="attributes-heading"><h2>Ratings by Attributes</h2><button className="text-button"><CircleHelp size={19} /> What do these mean?</button></div><div className="attribute-grid">{attributes.map(([name, score, Icon]) => <div className="attribute" key={name}><Icon size={24} /><strong>{name}</strong><span>{score} <Star size={17} fill="currentColor" /></span></div>)}</div></div>
        </div>
        <div className="mobile-divider" />
        <section className="recent"><div className="recent-heading"><h2><span className="desktop-only">Recent </span>Reviews</h2><div className="carousel-controls"><button className="icon-button" onClick={() => setSlide(Math.max(0, slide - 1))}><ArrowLeft size={22} /></button><button className="icon-button dark" onClick={() => setSlide(Math.min(2, slide + 1))}><ArrowRight size={22} /></button></div></div><div className="review-viewport"><div className="review-list" style={{ transform: `translateX(calc(-${slide} * (33.333% + 16px)))` }}>{visibleReviews.map((review, i) => <ReviewCard review={review} key={`${review.name}-${i}`} />)}</div></div><div className="dots">{[0,1,2].map(i => <button className={i === slide ? 'active' : ''} key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />)}</div><button className="show-all" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Fewer Reviews' : 'Show All Reviews (802)'} <ArrowRight size={25} /></button></section>
      </>}
    </section>
    {showAll && <div className="toast"><span>Showing all 802 reviews</span><button onClick={() => setShowAll(false)}><X size={18}/></button></div>}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
