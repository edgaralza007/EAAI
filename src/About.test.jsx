import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("About", () => {
  it("renders the About page heading", () => {
    renderWithRouter(<About />);
    expect(
      screen.getByText(/A practical AI partner for teams that want real outcomes/i)
    ).toBeInTheDocument();
  });

  it("renders mission section", () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Help small and mid-sized businesses adopt AI responsibly/i)
    ).toBeInTheDocument();
  });

  it("does not render the removed 'What you can expect' section", () => {
    renderWithRouter(<About />);
    expect(screen.queryByText(/What you can expect/i)).not.toBeInTheDocument();
  });

  it("renders team members with photo placeholders", () => {
    const { container } = renderWithRouter(<About />);

    // Heading text can change; just assert that some "team" heading exists.
    expect(screen.getAllByText(/team/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Edgar Alza")).toBeInTheDocument();
    expect(screen.getByText("Clarem Gonzalez")).toBeInTheDocument();

    expect(container.querySelector('[data-testid="photo-edgar"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="photo-clarem"]')).toBeInTheDocument();
  });

  it("includes the Header component", () => {
    renderWithRouter(<About />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
