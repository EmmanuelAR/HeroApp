import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { AppRouter } from "../../../src/router/AppRouter";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas sobre el NAVBAR", () => {
  const contextValue = {
    logged: true,
    user: {
      id: "ABC",
      name: "Juan Carlos",
    },
    logout: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el nombre del usuario logueado", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Juan Carlos").length).toBe(1);
  });

  test("Debe de llamar al logout y navigate cuando se hace click en el boton", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const buttonElement = screen.getByText("Logout");
    fireEvent.click(buttonElement);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
