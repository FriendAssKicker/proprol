import React, { useState } from 'react';
import './App.css';

function App() {
  // Add state for modal
  const [showTrailer, setShowTrailer] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Add trailer handler
  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  // Add story handler
  const handleStoryClick = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add scroll reveal effect
  React.useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
          element.classList.add('active');
        } else {
          element.classList.remove('active'); // Remove active class when out of view
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const img = new Image();
    img.src = '/images/hero-bob.jpg';
    img.onload = () => {
      setHeroImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load hero image');
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">BOB THE CAT "documented by yesu yesu"</div>
        <div className="navbar-links">
          <a href="#story" onClick={(e) => scrollToSection(e, 'story')}>Story</a>
          <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>Gallery</a>
          <a href="#books" onClick={(e) => scrollToSection(e, 'books')}>Books</a>
          <a href="#movie" onClick={(e) => scrollToSection(e, 'movie')}>Movie</a>
        </div>
      </nav>
      
      <div className="hero-section">
        <div 
          className={`hero-background ${heroImageLoaded ? 'loaded' : ''}`}
          style={{
            background: heroImageLoaded 
              ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
                 url('/images/hero-bob.jpg') center/cover`
              : `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
                 url('https://source.unsplash.com/random/1920x1080/?ginger-cat') center/cover`
          }}
        ></div>
        <div className="hero-content">
          <h1>A Street Cat Named Bob</h1>
          <p>The heartwarming true story of how one cat changed a man's life and touched millions of hearts around the world.</p>
          <div className="hero-buttons">
            <button className="play-btn" onClick={handleTrailerClick}>
              ▶ Watch Trailer
            </button>
            <button className="more-info-btn" onClick={handleStoryClick}>
              📖 Read Story
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>↓</span>
        </div>
      </div>

      {/* Add Trailer Modal */}
      {showTrailer && (
        <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTrailer(false)}>×</button>
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/s13Fnj8LzD8?autoplay=1"
                title="A Street Cat Named Bob Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="content-row reveal" id="story">
        <h2>Bob's Journey</h2>
        <div className="story-cards">
          {[
            {
              title: "The Meeting",
              text: "In 2007, James Bowen found an injured ginger cat curled up in the hallway of his sheltered accommodation."
            },
            {
              title: "Recovery",
              text: "James nursed Bob back to health and slowly, the pair formed an unbreakable bond."
            },
            {
              title: "Street Performance",
              text: "Bob began following James to his busking spots in Covent Garden and Piccadilly Circus."
            }
          ].map((item, index) => (
            <div key={index} className="story-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-row reveal" id="gallery">
        <h2>Bob's Gallery</h2>
        <div className="gallery-grid">
          {[
            {
              img: '/images/bob1.jpg',
              alt: 'Bob on James shoulder',
              caption: 'Bob and James on the streets of London'
            },
            {
              img: '/images/bob2.jpg',
              alt: 'Bob wearing his scarf',
              caption: 'Bob in his famous scarf'
            },
            {
              img: '/images/bob3.jpg',
              alt: 'Bob and James performing',
              caption: 'Street performance days'
            },
            {
              img: '/images/bob4.jpg',
              alt: 'Bob on the red carpet',
              caption: 'Movie premiere'
            }
          ].map((item, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={item.img} 
                alt={item.alt}
                onError={(e) => {
                  e.target.src = 'https://source.unsplash.com/random/400x400/?ginger-cat';
                }}
              />
              <p>{item.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-row reveal" id="books">
        <h2>Books About Bob.</h2>
        <div className="book-list">
          {[
            {
              title: "A Street Cat Named Bob",
              img: '/images/book1.jpg',
              year: "2012"
            },
            {
              title: "The World According to Bob",
              img: '/images/book2.jpg',
              year: "2013"
            },
            {
              title: "A Gift from Bob",
              img: '/images/book3.jpg',
              year: "2014"
            },
            {
              title: "Bob: No Ordinary Cat",
              img: '/images/book4.jpg',
              year: "2013"
            }
          ].map((item, index) => (
            <div key={index} className="book-card">
              <div className="book-cover">
                <img 
                  src={item.img} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x300/ff6b6b/ffffff?text=${encodeURIComponent(item.title)}`;
                  }}
                />
              </div>
              <p>{item.title}</p>
              <span className="book-year">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
