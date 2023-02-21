import { types } from "../../../src/auth/types/types";

describe("Pruebas en types", () => {
  test("Debe de regresar nuevos types", () => {
    expect(types).toEqual({ login: "[AUTH] Login", logout: "[AUTH] Logout" });
  });
});
