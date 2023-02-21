import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Test sobre <SearchPage>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de mostrarse correctamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("Debe de mostrarse a batman y el input con el valor queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");
    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

    const searchDiv = screen.getByLabelText("div_search");
    expect(searchDiv.className).toBe(
      "alert alert-primary animate__animated animate__fadeIn"
    );
    expect(searchDiv.style.display).toBe("none");
  });

  test("Debe de mostar un error sino se encuentra el hero (batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const errorHeroSearch = screen.getByLabelText("div_error_hero_search");
    expect(errorHeroSearch.className).toBe(
      "alert alert-danger animate__animated animate__fadeIn"
    );
    expect(errorHeroSearch.style.display).not.toBe("none");
  });

  test("Debe de llamar al navigate a la pantalla nueva", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { name: "searchText", value: "superman" },
    });

    const form = screen.getByLabelText("form");
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=superman");
  });
});
