import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the hero tagline", () => {
    render(<App />);

    expect(screen.getByText("Elevating Knowledge and Practice")).toBeInTheDocument();
  });
});
