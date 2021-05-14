import { render, screen } from "@testing-library/react";
import App from "./App";

test("Title loads", () => {
  render(<App />);
  const linkElement = screen.getByText(/Latest photos from Mars 🚀/i);
  expect(linkElement).toBeInTheDocument();
});
