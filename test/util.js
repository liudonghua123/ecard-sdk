import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sign } from "../src/util.js";

import process from "process";

const { HMAC_SHA1_KEY: hmacSha1Key } = process.env;

const stuempno = '20160019';

describe('utli test', () => {
    it('sign test with hexString format key input', async () => {
        const signedStr = await sign({ stuempno }, hmacSha1Key, 'hexString');
        assert.strictEqual(signedStr, `322b2348f5651d9021b7c2f1199b8014706f7b6a`);
    });
    it('sign test with textString format key input', async () => {
        const signedStr = await sign({ stuempno }, hmacSha1Key, 'textString');
        assert.strictEqual(signedStr, `ce919508e7f95815da7d81ed64193dbdfef16d20`);
    });

}); 