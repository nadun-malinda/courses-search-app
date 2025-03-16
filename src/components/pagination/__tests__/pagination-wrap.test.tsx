import { render, screen } from "@testing-library/react";
import { PaginationWrap } from "../pagination-wrap";
import { usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

// TODO: Runing this test will trigger bellow console error, but test will pass
// [Error: Not implemented: navigation (except hash changes)
// Fix, if have more time
// https://github.com/vitest-dev/vitest/issues/4450

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("PaginationWrap Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/courses");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders pagination component correctly", () => {
    render(<PaginationWrap totalCount={50} pageSize={10} page={1} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument(); // Total pages = 5
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<PaginationWrap totalCount={50} pageSize={10} page={1} />);

    const prevButton = screen.getByLabelText("Go to previous page");
    expect(prevButton).toHaveAttribute("aria-disabled", "true");
  });

  it("disables next button on last page", () => {
    render(<PaginationWrap totalCount={50} pageSize={10} page={5} />);

    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
  });

  it("updates URL correctly when clicking on pagination links", async () => {
    const user = userEvent.setup();
    render(<PaginationWrap totalCount={50} pageSize={10} page={2} />);

    const pageThreeLink = screen.getByText("3");
    expect(pageThreeLink).toHaveAttribute("href", "/courses?page=3");

    await user.click(pageThreeLink);
    expect(pageThreeLink).toHaveAttribute("href", "/courses?page=3");
  });

  it("updates URL correctly when clicking next and previous", async () => {
    const user = userEvent.setup();
    render(<PaginationWrap totalCount={50} pageSize={10} page={2} />);

    const prevButton = screen.getByLabelText("Go to previous page");
    const nextButton = screen.getByLabelText("Go to next page");

    expect(prevButton).toHaveAttribute("href", "/courses?page=1");
    expect(nextButton).toHaveAttribute("href", "/courses?page=3");

    await user.click(nextButton);
    expect(nextButton).toHaveAttribute("href", "/courses?page=3");
  });
});
