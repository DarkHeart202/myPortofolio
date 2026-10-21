function Footer() {
  return (
    <section className="c-space py-7  border-t border-navy-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        <a
          href="https://www.instagram.com/aseem202/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src="/assets/instagram.svg"
            alt="instagram"
            className="w-1/2 h-1/2"
          />
        </a>

        <a
          href="https://github.com/DarkHeart202?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
        </a>

        <a
          href="https://www.behance.net/mahmoud_aseem"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src="/assets/behance.svg"
            alt="behance"
            className="w-1/2 h-1/2"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/mahmoud-aseem/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src="/assets/linkedin.svg"
            alt="linkedin"
            className="w-4.5 h-4.5"
          />
        </a>
      </div>

      <p className="text-white-500">© 2026 Aseem. All rights reserved.</p>
    </section>
  );
}

export default Footer;
