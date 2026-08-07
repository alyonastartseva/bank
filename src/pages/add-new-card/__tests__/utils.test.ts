import { describe, expect } from "vitest";
import { getAccountTypeFromCardNumber } from "@/pages/add-new-card/AddNewCardPage";

describe("getAccountTypeFromCardNumber", () => {
  it("возвращает CHECKING для карт, начинающихся с 4", () => {
    expect(getAccountTypeFromCardNumber("4111111111111111")).toBe("CHECKING");
  })

  it("возвращает SAVINGS для карт, начинающихся с 5", () => {
    expect(getAccountTypeFromCardNumber("5111111111111111")).toBe("SAVINGS");
  })

  it("возвращает DEPOSIT для карт, начинающихся с 6", () => {
    expect(getAccountTypeFromCardNumber("6111111111111111")).toBe("DEPOSIT");
  })

  it("возвращает CREDIT для карт, начинающихся с 3", () => {
    expect(getAccountTypeFromCardNumber("3111111111111111")).toBe("CREDIT");
  })

  it('возвращает CHECKING для неизвестной первой цифры', () => {
    expect(getAccountTypeFromCardNumber('1111111111111111')).toBe('CHECKING');
  });
})