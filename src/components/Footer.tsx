export default function Footer() {
  return (
    <footer>
      <a href="https://github.com/fedellen/react-mars-photo-app/issues">
        Report Bug
      </a>
      <p>
        All images from the <a href="https://api.nasa.gov/">NASA API portal.</a>{" "}
      </p>
      <p>© {new Date().getFullYear()} Derek R Sonnenberg</p>
    </footer>
  );
}
