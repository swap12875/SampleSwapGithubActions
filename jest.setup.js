jest.setTimeout(10000);

// Clean up any remaining handles after all tests
afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Small delay to ensure cleanup
});
