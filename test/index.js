/**
 * @typedef {import('../src//typedefs.js').BasicInfo} BasicInfo
 * @typedef {import('../src/typedefs.js').CommonResponse} CommonResponse
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { singleCustcardinfo, batchCustcardinfo, commonGetbilldata, commonAccountquery, commonGetphoto } from '../src/index.js';

const stuempno = '20160019';

describe('index test', () => {
    it('singleCustcardinfo test', async () => {
        const response = await singleCustcardinfo({ stuempno });
        // console.info(`response`, response);
        assert.strictEqual(response.retcode, '0');
    });

    it('batchCustcardinfo test', async () => {
        // TODO: need to fix: { retcode: '304', retmsg: 'sign check error' } when passed pageno and pagesize
        const response = await batchCustcardinfo({ cardupdtime: '20230101151515' });
        // console.info(`response`, response);
        assert.strictEqual(response.retcode, '0');
    });

    it('commonGetbilldata test', {skip: true}, async () => {
        // TODO: need to fix: { retcode: '1', retmsg: '请求失败，系统错误' }
        const response = await commonGetbilldata({ stuempno, pageno: '1', pagesize: '3', startdate: '20240512', enddate: '20240612' });
        console.info(`response`, response);
        assert.strictEqual(response.retcode, '0');
    });

    it('commonAccountquery test', async () => {
        const response = await commonAccountquery({ stuempno });
        // console.info(`response`, response);
        assert.strictEqual(response.retcode, '0');
    });

    it('commonGetphoto test', async () => {
        const response = await commonGetphoto({ student_idtype: 'stuempno', student_id: stuempno });
        // console.info(`response`, response);
        assert.strictEqual(response.retcode, '0');
    });

}); 