import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('user cannot login with invalid username', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('wrong_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface')).toBeVisible();
});

test('user cannot login with invalid password', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface')).toBeVisible();
});

test('user cannot login with invalid username and password', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('wrong_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface')).toBeVisible();
});

test('user cannot login with empty username', async ({ page }) => {

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Username is required')).toBeVisible();
});

test('user cannot login with empty password', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Password is required')).toBeVisible();
});