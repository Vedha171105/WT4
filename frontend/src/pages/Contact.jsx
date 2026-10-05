function Contact() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">05 / SAY HELLO</span>
          <h1>CONTACT<span>.</span></h1>
        </div>
        <p>Questions? Ideas? Just want to say hi? We're listening.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-card blue">
            <span>EMAIL</span>
            <strong>techfest2026@mbcet.ac.in</strong>
            <small>Drop us a line →</small>
          </div>
          <div className="contact-card yellow">
            <span>PHONE</span>
            <strong>+91 98765 43210</strong>
            <small>Mon–Fri / 09:00–17:00</small>
          </div>
          <div className="contact-card green">
            <span>VENUE</span>
            <strong>MBCET CAMPUS</strong>
            <small>Thiruvananthapuram, Kerala</small>
          </div>
        </div>

        <form className="brutal-form contact-form">
          <label>NAME *<input placeholder="YOUR NAME" /></label>
          <label>EMAIL *<input placeholder="YOU@EMAIL.COM" /></label>
          <label>MESSAGE *<textarea rows="6" placeholder="WRITE YOUR MESSAGE..."></textarea></label>
          <button className="black-btn submit-btn" type="button">SEND MESSAGE ↗</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
