import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);
});

test('products page loads successfully', async ({ page }) => {
  await expect(page.getByText('Products')).toBeVisible();
});

test('inventory contains products', async ({ page }) => {
  const productItems = page.locator('.inventory_item');

  await expect(productItems).toHaveCount(6);
});

test('all products have a name and price', async ({ page }) => {
  const productItems = page.locator('.inventory_item');

  const count = await productItems.count();

  for (let i = 0; i < count; i++) {
    const product = productItems.nth(i);

    await expect(product.locator('.inventory_item_name')).toBeVisible();
    await expect(product.locator('.inventory_item_price')).toBeVisible();
  }
});

test('user can sort products from low price to high price', async ({ page }) => {
  await page.locator('.product_sort_container').selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(price =>
    Number(price.replace('$', ''))
  );

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});

test('user can sort products from high price to low price', async ({ page }) => {
  await page.locator('.product_sort_container').selectOption('hilo');

  const prices = await page.locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(price =>
    Number(price.replace('$', ''))
  );

  const sortedPrices = [...numericPrices].sort((a, b) => b - a);

  expect(numericPrices).toEqual(sortedPrices);
});