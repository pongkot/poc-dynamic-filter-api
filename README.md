# poc-dynamic-filter

A proof of concept dynamic filter web service

## System requirement

- Node.js 16.14.0 or higher

## Feature

- เพิ่ม operator validator ในทุก ๆ ที่ API เริ่มทำงาน จะมีการ query operator จากในฐานข้อมูลมาเช็คเทียบกับในแอพพลิเคชั่นว่าชื่อ operator ที่มี
  สมมาตรหรือไม่ ต้องสมมาตรจึงจะถือว่าผ่านแอพฯ สามารถทำงานต่อได้ แต่ถ้าไม่ แอพฯ จะถูกสั่งให้ตายทันที
- เพิ่มเรื่อง required operator before คือมี option ในการสร้าง operator ว่าถ้าต้องการให้มี operator บางตัวทำงานก่อน แล้ว operator ตัวดังกล่าวจะ
  ทำงานได้ อาจจะด้วยต้องการ data บางอย่างที่ต้องมี operator บางตัว emmit ออกมาจึงจะทำงานได้เป็นต้น feature นี้จะทำการเช็คก่อนว่ามี operator ที่ต้องการ
  อยู่ก่อนรึเปล่า ถ้าไม่มี API จะตายตอบ 500 คืนให้ client

## Limitation

- ยิ่ง action และ filter เยอะเท่าไร operator service จะยิ่งบวม ถ้าไม่ใช่ฟีเจอร์ structure ของ Editor/IDE จะตามหา operator ยากมาก
- ยิ่ง action มีการ emmit ข้อมูลเข้าไปเก็บ store มากเท่าไรความสับสนใจการดึง store/stage มาใช้งานใน operator จะยิ่งมีความสับสน เพราะปัจจุบันโค้ดยังเป็น
  ลักษณะ generic type ใส่อะไรลงไปก็ได้
- ความสับสนในการหยุด workflow การเช็คสิทธิ์ เพราะถ้า flow ทำงานสำเร็จ response message จะเป็น __Operator execute complete__ ดังนั้นต้องมี
  filter เพิ่มมาสำหรับเช็คว่าส่ง eCode หรือเช็คเงื่อนไขสำเร็จแล้วให้ `{ next: false }` เพื่อหยุด flow แต่ `{ statusCode: 200 }` และ
  `{ message: "ล้อตาม operator เช่น ECode sending to mobile เป็นต้น" }` ไม่ก็ต้องปรับโครงสร้างของข้อความ
- เนื่องจากมีการปรับโครงสร้างการ response ทำให้ฝั่งเว็บแอพฯ จะต้องปรับ schema ของ adaptor ให้สอดคล้องกับโครงสร้าง response ใหม่นี้ด้วย
- ยิ่ง flow ยาวเท่าไรการกิน memory จะยิ่งเพิ่มสูงขึ้นตามจำนวน flow เป็นลักษณะ O(n log n) หรือถ้าเขียนไม่ดีในบ้าง action เช่นการสร้างรูปคูปองอาจกลายทำให้
  กลายเป็น O(n^2) ได้
- ยังไม่สามารถทำให้รองรับการเช็คเงื่อนไขตามตารางเงื่อนไขเพื่อสร้าง eCode ได้ *ยังไม่ได้ลองทำ

## Scripts

Please follow nest.js document

## Checkout response

### Original

|  #  | httpStatus | code | message                          | description |
|:---:|:----------:|:----:|----------------------------------|-------------|
|  1  |    200     | 200  | ECode sending to your mobile     |             |
|  2  |    200     | 400  | sorry, checked ECode failed      |             |
|  3  |    200     | 401  | campaign unavailable             |             |
|  4  |    200     | 402  | sorry, ECode out of stock        |             |
|  5  |    200     | 403  | sorry, your policy is invalid    |             |
|  6  |    200     | 404  | sorry, you are checked out ECode |             |

*code that mean code of message, not http code

### Changes

|  #  | httpStatus | statusCode | message                       | description                                                                    |
|:---:|:----------:|:----------:|-------------------------------|--------------------------------------------------------------------------------|
|  1  |    201     |    200     | ECode sending to mobile       |                                                                                |
|  2  |    201     |    400     | Sorry, Check out ECode failed |                                                                                |
|  3  |    201     |    401     | Campaign unavailable          |                                                                                |
|  4  |    201     |    402     | Sorry, ECode are out of stock |                                                                                |
|  5  |    201     |    403     | Sorry, Policy is invalid      |                                                                                |
|  6  |    201     |    404     | Sorry, Policy is checked out  |                                                                                |
|  7  |    500     |    500     | Internal server error         | Something wrong about operator or application. please look up at error message |

*statusCode that mean statusCode of message, not http code

### Example API response

```json
{
  "statusCode": 400,
  "message": "Sorry, Check out ECode failed"
}
```

.
