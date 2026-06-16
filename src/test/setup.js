import { vi } from 'vitest';
import '@testing-library/jest-dom';

class LocalStorageMock {
  constructor() {
    this.storage = {};
  }
  getItem(key) {
    return this.storage[key] || null;
  }
  setItem(key, value) {
    this.storage[key] = String(value);
  }
  removeItem(key) {
    delete this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}
global.localStorage = new LocalStorageMock();