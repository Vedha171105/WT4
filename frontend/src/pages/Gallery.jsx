const images = [
  ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80", "OPENING"],
  ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80", "WORKSHOP"],
  ["https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80", "BUILD"],
  ["https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80", "CULTURE"],
  ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80", "TEAMS"],
  ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80", "CONNECT"]
];

function Gallery() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">04 / MOMENTS</span>
          <h1>GALLERY<span>.</span></h1>
        </div>
        <p>A visual archive of people, ideas and late-night builds.</p>
      </div>

      <div className="gallery-grid">
        {images.map(([src, label], index) => (
          <figure className={`gallery-item gallery-${index + 1}`} key={src}>
            <img src={src} alt={label} />
            <figcaption>0{index + 1} / {label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
