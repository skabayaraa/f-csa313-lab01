import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login and Functionality Tests', () => {

  // 1. Амжилттай нэвтрэх тест
  test('амжилттай нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Playwright locator ашиглах (XPath ашиглахгүй)
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Үр дүнг шалгах (Assertion)
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  // 2. Амжилтгүй нэвтрэх тест (Negative test)
  test('амжилтгүй нэвтрэх - буруу нууц үг', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Алдааны мессеж гарч ирж байгаа эсэхийг шалгах
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface');
  });

  // 3. Нэвтэрсний дараах бараа сагслах үйлдэл
  test('нэвтэрсний дараа бараа сагсанд нэмэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Эхний барааны сагслах товчийг дарж шалгах
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

});