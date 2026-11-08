import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuote } from '../src/data/quote.js';
test('quote requests retain the chosen work, diameter and wheel count without inventing prices', () => {
  const message = buildQuote({service:'tyre',diameter:'R16',count:4});
  assert.equal(message, 'Здравствуйте! Хочу уточнить стоимость и записаться: шиномонтаж, R16, 4 колеса. Подскажите цену и свободное время.');
  assert.ok(!message.includes('₽'));
});
test('unknown diameter has a useful request and invalid inputs cannot create an incorrect quote', () => {
  assert.match(buildQuote({service:'repair',diameter:'unknown',count:1}), /ремонт порезов, размер уточню, 1 колесо/);
  assert.throws(() => buildQuote({service:'fake',diameter:'R16',count:4}), RangeError);
  assert.throws(() => buildQuote({service:'tyre',diameter:'R99',count:4}), RangeError);
  assert.throws(() => buildQuote({service:'tyre',diameter:'R16',count:0}), RangeError);
});
