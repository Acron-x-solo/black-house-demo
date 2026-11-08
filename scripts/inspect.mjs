import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('docs/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto('http://localhost:5174/',{waitUntil:'networkidle'});
  await expect(page.locator('.wheel-scene')).toHaveClass(/scene-ready/);
  await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(800);
  await page.screenshot({path:'docs/screenshots/desktop-hero.png'});
  await page.getByRole('button',{name:'Разобрать колесо'}).click();await page.waitForTimeout(1000);
  await page.screenshot({path:'docs/screenshots/desktop-exploded.png'});
  await page.getByRole('button',{name:'Собрать колесо'}).click();
  for(const selector of ['#services','.process-section','#prices','#gallery','#faq','#contacts']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(700)}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(700);
  await page.screenshot({path:'docs/screenshots/desktop-full.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:5174/',{waitUntil:'networkidle'});await expect(page.locator('.wheel-scene')).toHaveClass(/scene-ready/);await page.waitForTimeout(800);
  await page.screenshot({path:'docs/screenshots/mobile-hero.png'});
  await page.locator('.wheel-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(600);
  const targets=await page.locator('.wheel-controls button').evaluateAll(buttons=>buttons.map(button=>({name:button.getAttribute('aria-label')||button.textContent,width:button.getBoundingClientRect().width,height:button.getBoundingClientRect().height})));
  console.log(JSON.stringify({targets,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
  await page.screenshot({path:'docs/screenshots/mobile-wheel.png'});
}finally{await browser.close()}
