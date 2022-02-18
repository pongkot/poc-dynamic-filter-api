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

|  #  | httpStatus | code | message | description |
|:---:|:----------:|:----:|:-------:|:-----------:|
|  1  |    200     |  1   |    1    |      1      |
|  1  |    200     |  1   |    1    |      1      |
|  1  |    200     |  1   |    1    |      1      |
|  1  |    200     |  1   |    1    |      1      |
|  1  |    200     |  1   |    1    |      1      |
|  1  |    200     |  1   |    1    |      1      |

*code that mean code of message, not http code

### Changes

|  #  | httpStatus | statusCode |        message        |                                  description                                   |
|:---:|:----------:|:----------:|:---------------------:|:------------------------------------------------------------------------------:|
|  1  |    200     |    200     |           1           |                                       1                                        |
|  1  |    200     |    200     |           1           |                                       1                                        |
|  1  |    200     |    200     |           1           |                                       1                                        |
|  1  |    200     |    200     |           1           |                                       1                                        |
|  1  |    200     |    200     |           1           |                                       1                                        |
|  1  |    200     |    200     |           1           |                                       1                                        |
|  1  |    500     |    500     | Internal server error | Something wrong about operator or application. please look up at error message |
