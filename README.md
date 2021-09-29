
# Stock Caller
![MIT](https://img.shields.io/badge/license-MIT-yellow)

## Author
Garrett Kegel

## Description
This application presents a graphical user interface which displays a
user's portfolio of stocks and a selection of hedge funds with
their changing positions displayed. A user has only one portfolio
of stocks. The portfolio has many stocks. The user, portfolio, and stock
are all objects that are either created, read, updated, or deleted
depending on the object. For example, a stock has a changing
price which is updated. The price is updated in the mysql
database by sending an API call to a third party API called IEX
which will use a PUT route to update the price of the stock.
Other functionality will include allowing the user to select
specific hedge funds to follow. For example, if a user enters a
CIK of Berkshire Hathaway, then the application makes an API call
to sec-api.io to get the most current positions from the hedge 
fund's form 13-f and also gets the positions from the previous
accounting period, usually quarterly. The application will
calculate the changes in positions for each stock in the hedge fund's
portfolio, will display the top five largest positions from the
previous accounting period, and display how much they have changed in
position. Both of these objects, which are owned by the user, will be
displayed in a template using handlebars.js.
  

  
## Installation
N/A

## Usage
N/A

Screenshot

![alt text](assets/images/screenshot.png)


## License
MIT License

Copyright (c) 2021 Garrett Kegel
    
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
    
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://www.mit.edu/~amini/LICENSE.md

## How To Contribute
N/A

## Tests
N/A

## Questions

Contact the developer and owner of this repository by using the information below : 

GitHub
https://github.com/eigenvalue000

Email
qwxzjkv20946137@gmail.com

