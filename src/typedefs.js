/**
 * @typedef SingleCustcardinfoInput
 * @prop {string} stuempno the student employee id
 * @prop {string} [cardphyid] the card physical id
 * 
 * @typedef _BatchCustcardinfoInput
 * @prop {string} [pageno] the page number
 * @prop {string} [pagesize] the page size
 * @prop {string} [cardupdtime] the update time of the card
 * @prop {string} [custupdtime] the update time of the customer
 * @typedef {_BatchCustcardinfoInput & ({cardupdtime: string, custupdtime?: never} | {cardupdtime?: never, custupdtime: string})} BatchCustcardinfoInput
 * 
 * @typedef CommonGetbilldataInput
 * @prop {string} stuempno the student employee id
 * @prop {string} pageno the page number
 * @prop {string} pagesize the page size
 * @prop {string} [startdate] the start date, format: yyyyMMdd
 * @prop {string} [enddate] the end date, format: yyyyMMdd
 * 
 * @typedef CommonCardlossInput
 * @prop {string} [stuempno] the student employee id
 * @prop {string} [cardphyid] the card physical id
 * 
 * @typedef CommonAccountqueryInput
 * @prop {string} [stuempno] the student employee id
 * @prop {string} [cardphyid] the card physical id
 * 
 * @typedef _CommonVerifyInput
 * @prop {string} cardpwd the card password
 * @typedef {_CommonVerifyInput & ({stuempno: string, cardphyid?: never} | {stuempno?: never, cardphyid: string})} CommonVerifyInput
 * 
 * @typedef CommonCardfrozeInput
 * @prop {string} student_id the student id, 用户标识, 现支持卡号、物理卡号、学工号、客户号、身份证号
 * @prop {"cardno"|"cardphyid"|"stuempno"|"custid"|"idno"} student_idtype the student id type, 表明用户标识传值类型，不区分大小写
 * @prop {'1'|'2'} [frozen] the frozen status, 1:冻结 2:解冻
 * 
 * @typedef CommonGetphotoInput
 * @prop {string} student_id the student id, 学生对应的唯一号。对应证件类型传学工号，客户号，身份证号
 * @prop {"stuempno"|"custid"|"idno"} student_idtype the student id type, 学生证件类型，不区分大小写
 *
 * 
 * @typedef _BasicInfo
 * @prop {string} [partner_id] the partner id
 * @prop {string} [timestamp] the timestamp of the request
 * @prop {string} [sign] the signature of the request
 * @prop {string} [sign_method='HMAC'] the signature method
 * @prop {string} [pageno] the page number
 * @prop {string} [pagesize] the page size
 * 
 * @typedef {_BasicInfo | SingleCustcardinfoInput | BatchCustcardinfoInput} BasicInfo
 * 
 * @typedef {BasicInfo|Object<string, string>} T
 * @typedef CommonResponse<T>
 * @prop {string} retcode the response code
 * @prop {string} retmsg the response message
 * @prop {T} data the response data
 *
 * @typedef CustCardInfo
 * @prop {string} [stuempno] the student employee id
 * @prop {string} [custname] the student name
 * @prop {string} [cardno] the card number
 * @prop {number} [cardstatus] the card status
 * @prop {string} [showcardno] the card number to show
 * @prop {string} [cardphyid] the card physical id
 * @prop {string} [expiredate] the card expiration date
 * @prop {string} [opendate] the card open date
 * @prop {string} [cardverno] the card version number
 * @prop {string} [cardtype] the card type
 * @prop {string} [cardtypename] the card type name
 * @prop {string} [custid] the customer id
 * @prop {string} [custtype] the customer type 
 * @prop {string} [custtypename] the customer type name
 * @prop {string} [deptcode] the department code
 * @prop {string} [deptname] the department name
 * @prop {string} [specialtycode] the specialty code
 * @prop {string} [specialtyname] the specialty name
 * @prop {string} [sex] the sex
 * @prop {string} [idtype] the type of the id
 * @prop {string} [idtypename] the type name of the id
 * @prop {string} [idno] the number of the id
 * @prop {string} [areacode] the code of the area
 * @prop {string} [areaname] the name of the area
 * @prop {string} [classcode] the code of the class
 * @prop {string} [countrycode] the code of the country
 * @prop {string} [country] the country
 * @prop {string} [email] the email
 * @prop {string} [nationcode] the code of the nation
 * @prop {string} [nation] the nation
 * @prop {string} [tel] the telephone number
 * @prop {string} [mobile] the mobile number
 * @prop {string} [zipcode] the code of the zip
 * @prop {string} [cardupdtime] the update time of the card
 * @prop {string} [custupdtime] the update time of the customer  
 */