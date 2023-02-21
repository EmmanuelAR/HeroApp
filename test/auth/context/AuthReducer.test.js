import { authReducer } from "../../../src/auth/context/AuthReducer";
import { types } from "../../../src/auth/types/types";

describe("Pruebas del <AuthReducer/>", () => {
  test("Debe de retornar el estado por defecto", () => {
    const newState = authReducer({ logged: false }, {});
    expect(newState).toEqual({ logged: false });
  });

  test("Debe de llamar al (LOGIN) y establecer un usuario", () => {
    const name = "Emmanuel";
    const user = { id: "117790953", name };
    const action = {
      type: types.login,
      payload: user,
    };
    const newState = authReducer({}, action);
    expect(newState.user).toBe(action.payload);
    expect(newState.logged).toBe(true);
    expect(newState).toEqual({ logged: true, user: action.payload });
  });

  test("Debe de llamar al (LOGOUT) y remover un usuario", () => {
    const action = {
      type: types.logout,
    };
    const newState = authReducer({}, action);
    expect(newState.logged).toBe(false);
  });
});
