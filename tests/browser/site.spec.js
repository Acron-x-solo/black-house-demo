import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('appointment links scroll to contacts without opening a new tab',async({page,context})=>{
  await page.goto('/');
  for(const label of ['Записаться в мастерскую','Записаться']){
    const link=page.getByRole('link',{name:label,exact:true}).first();
    await expect(link).toHaveAttribute('href','#contacts');
    await link.click();
    await expect(page).toHaveURL(/#contacts$/);
    await expect(page.locator('#contacts h2')).toBeInViewport();
  }
  expect(context.pages()).toHaveLength(1);
  await expect(page.locator('#contacts a[href="tel:+79537839666"]')).toBeVisible();
});
test('quote selects work and wheels and prepares a truthful WhatsApp request',async({page})=>{
  await page.goto('/');
  const prices=page.locator('#prices');
  await prices.getByRole('button',{name:'Ремонт порезов',exact:true}).click();
  await prices.getByRole('button',{name:'R18',exact:true}).click();
  await prices.getByRole('button',{name:'2 колеса',exact:true}).click();
  const request=prices.getByRole('link',{name:'Отправить запрос'});
  const url=new URL(await request.getAttribute('href'));
  expect(url.origin+url.pathname).toBe('https://wa.me/79693499999');
  expect(url.searchParams.get('text')).toContain('ремонт порезов, R18, 2 колеса');
  await expect(prices.locator('.quote-cost')).toContainText('Уточним стоимость');
  await prices.getByRole('button',{name:'Не знаю размер'}).click();
  await expect(prices.locator('.quote-selection')).toContainText('Размер уточним');
  await prices.locator('.other-prices summary').click();
  await expect(prices.locator('.other-prices-content')).toContainText('2022');
  await expect(prices.locator('.other-prices li')).toHaveCount(6);
});
test('real wheel can explode, rotate and pause',async({page})=>{
  await page.goto('/');
  await expect(page.locator('.wheel-scene')).toHaveClass(/scene-ready/);
  await page.getByRole('button',{name:'Разобрать колесо'}).click();
  await expect(page.getByRole('button',{name:'Собрать колесо'})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Повернуть колесо вправо'}).click();
  await page.getByRole('button',{name:'Приостановить 3D-анимацию'}).click();
  await expect(page.getByRole('button',{name:'Включить 3D-анимацию'})).toHaveAttribute('aria-pressed','true');
  const canvas=page.locator('.wheel-scene canvas');
  await page.waitForTimeout(1500);
  const first=await canvas.screenshot();
  await page.waitForTimeout(350);
  expect((await canvas.screenshot()).equals(first)).toBe(true);
});
test('mobile navigation, reduced motion and WebGL fallback retain useful content',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return kind.includes('webgl')?null:original.call(this,kind,...args)}});
  for(const width of [360,390,768]){
    await page.setViewportSize({width,height:844});
    await page.goto('/');
    await expect(page.locator('.wheel-fallback')).toBeVisible();
    await page.getByRole('button',{name:'Открыть меню'}).click();
    await page.locator('#mobile-menu').getByRole('link',{name:'Услуги'}).click();
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
    for(const id of ['services','prices','gallery','contacts']){
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
    }
  }
});
test('losing and restoring WebGL keeps a paused wheel usable',async({page})=>{
  await page.goto('/');
  await expect(page.locator('.wheel-scene')).toHaveClass(/scene-ready/);
  await page.getByRole('button',{name:'Приостановить 3D-анимацию'}).click();
  await page.evaluate(()=>{window.__wheelLoss=document.querySelector('.wheel-scene canvas').getContext('webgl2').getExtension('WEBGL_lose_context');window.__wheelLoss.loseContext()});
  await expect(page.locator('.wheel-fallback')).toBeVisible();
  await expect(page.locator('.wheel-controls')).toHaveCount(0);
  await page.evaluate(()=>window.__wheelLoss.restoreContext());
  await expect(page.locator('.wheel-scene')).toHaveClass(/scene-ready/);
  await expect(page.getByRole('button',{name:'Включить 3D-анимацию'})).toBeVisible();
});
test('page loads assets without runtime errors and passes automatic accessibility checks',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  for(const id of ['services','prices','gallery','faq','contacts']){await page.locator(`#${id}`).scrollIntoViewIfNeeded();await page.waitForTimeout(650)}
  expect(errors).toEqual([]);
  expect(await page.locator('img').evaluateAll(images=>images.filter(image=>image.complete&&image.naturalWidth===0).map(image=>image.src))).toEqual([]);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});
