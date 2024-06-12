import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sign } from "../src/util.js";

import process from "process";

const { HMAC_SHA1_KEY: hmacSha1Key } = process.env;

const stuempno = '20160019';

describe('utli test', () => {
    it('sign test with hexString format key input', async () => {
        const signedStr = await sign({ stuempno }, hmacSha1Key, 'hexString');
        assert.strictEqual(signedStr, `c056d5230bd3a4068a456ffbf27b37ace7e389a2`);
    });
    it('sign test with textString format key input', async () => {
        const signedStr = await sign({ stuempno }, hmacSha1Key, 'textString');
        assert.strictEqual(signedStr, `10bbb9143f3c6fd03c41a25440b1dc4958c8221d`);
    });

}); 