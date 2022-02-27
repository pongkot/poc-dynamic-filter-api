# poc-dynamic-filter

A proof of concept dynamic filter web service

## System requirement

- Node.js 16.14.0 or higher
- Nest.js 8 or higher

## Limitation

- ???

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
