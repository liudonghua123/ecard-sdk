/// <reference path="./typedefs.js" />
/**
 * @typedef {import('./typedefs.js').BasicInfo} BasicInfo
 * @typedef {import('./typedefs.js').CommonResponse} CommonResponse
 * @typedef {import('./typedefs.js').SingleCustcardinfoInput} SingleCustcardinfoInput
 * @typedef {import('./typedefs.js').BatchCustcardinfoInput} BatchCustcardinfoInput
 * @typedef {import('./typedefs.js').CommonGetbilldataInput} CommonGetbilldataInput
 * @typedef {import('./typedefs.js').CommonCardlossInput} CommonCardlossInput
 * @typedef {import('./typedefs.js').CommonAccountqueryInput} CommonAccountqueryInput
 * @typedef {import('./typedefs.js').CommonVerifyInput} CommonVerifyInput
 * @typedef {import('./typedefs.js').CommonCardfrozeInput} CommonCardfrozeInput
 * @typedef {import('./typedefs.js').CommonGetphotoInput} CommonGetphotoInput
 */

import { signData } from "./util.js";
import process from "process";

const { BASE_URL: baseUrl, PARTNER_ID: partnerId, HMAC_SHA1_KEY: hmacSha1Key } = process.env;

// check the environment variables
if (typeof baseUrl !== 'string') {
  throw new TypeError('BASE_URL should be a string');
}
if (typeof partnerId !== 'string') {
  throw new TypeError('PARTNER_ID should be a string');
}
if (typeof hmacSha1Key !== 'string') {
  throw new TypeError('HMAC_SHA1_KEY should be a string');
}

/**
 * 通用卡、账户信息查询-单用户接口
 * @param {SingleCustcardinfoInput} input - the input data
 * 
 * // TODO: need to fix {Promise<CommonResponse<BasicInfo>>} Type 'CommonResponse' is not generic.
 * // see also https://docs.joshuatz.com/cheatsheets/js/jsdoc/#generics-in-jsdoc
 * @returns {Promise<CommonResponse>} the card information
 */
export async function singleCustcardinfo({ stuempno, cardphyid }) {
  // check the inputs
  if (typeof stuempno !== 'string') {
    throw new TypeError('stuempno should be a string');
  }
  const body = await generateBody({ stuempno, cardphyid });
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/single/custcardinfo`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}


/**
 * 通用卡、账户信息查询-批量接口
 * cardupdtime和custupdtime传入的时间格式为：yyyyMMddHHmmss，只能二选一
 * @param {BatchCustcardinfoInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function batchCustcardinfo({ pageno, pagesize, cardupdtime, custupdtime }) {
  // check the inputs
  const body = await generateBody(cardupdtime ? { pageno, pagesize, cardupdtime } : { pageno, pagesize, custupdtime });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/batch/custcardinfo`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}


/**
 * 通用账户流水查询
 * @param {CommonGetbilldataInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function commonGetbilldata({ stuempno, pageno, pagesize, startdate, enddate }) {
  // check the inputs
  const body = await generateBody({ stuempno, pageno, pagesize, startdate, enddate });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/getbilldata`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * 卡片挂失
 * @param {CommonCardlossInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function commonCardloss({ stuempno, cardphyid }) {
  // check the inputs
  const body = await generateBody({ stuempno, cardphyid });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/cardloss`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * 账户余额查询
 * @param {CommonAccountqueryInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function commonAccountquery({ stuempno, cardphyid }) {
  // check the inputs
  const body = await generateBody({ stuempno, cardphyid });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/accountquery`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * 验证学工号/卡号和密码
 * @param {CommonVerifyInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function commonVerify({ stuempno, cardphyid, cardpwd }) {
  // check the inputs
  const body = await generateBody({ stuempno, cardphyid, cardpwd });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/verify`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}


/**
 * 卡片冻结、解冻
 * @param {CommonCardfrozeInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function commonCardfrozen({ student_id, student_idtype, frozen }) {
  // check the inputs
  const body = await generateBody({ student_id, student_idtype, frozen });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/cardfrozen`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * 获取照片
 * @param {CommonGetphotoInput} input - the input data
 * @returns {Promise<CommonResponse>} the card information
 */
export async function commonGetphoto({ student_id, student_idtype }) {
  // check the inputs
  const body = await generateBody({ student_id, student_idtype });
  // console.info(`body`, body);
  // send the request
  const response = await fetch(`${baseUrl}/epayapi/services/thirdparty/common/getphoto`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * generate the body for api request
 * @param {SingleCustcardinfoInput|BatchCustcardinfoInput|CommonGetbilldataInput|CommonCardlossInput|CommonAccountqueryInput|CommonVerifyInput|CommonCardfrozeInput|CommonGetphotoInput} initialData - the initial data
 * @returns {Promise<URLSearchParams>} the body for the request
 */
async function generateBody(initialData) {
  const data = await signData({
    partner_id: partnerId,
    ...initialData,
  }, hmacSha1Key);
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    body.append(key, value);
  }
  return body;
}