# Main Objects
- Products/Items
    - SKU
    - Description
    - Picture/Image
    - Price
    - Quantity Available

- Sale/Transaction
  - {Customer}, Support No Customer aka "Johny Cash"
  - [{item, quantity}]
  - Calculate Sales Tax
  - Calculate Total (Sales Tax + (Item Price * Qty))
  - Tender / Pay for Transaction
      - Cash
      - Credit Card
      - Etc
  - Nice to have support for discounts (Straight percentage or dollar value off)

  - Customer (US Based)
    - First Name
    - Last Name
    - Street Address
    - City
    - State
    - Zip Code
    - Phone Number

# The Process

Clerk is shown POS frontend, clerk adds on items to a transaction by SKU,
clerk finishes adding all items to transaction,
total is displayed along side sales tax,
Clerk ask customer if they have an account in the system,
  Customer says yes
    Clerk types in customer phone number and customer is added to transaction
  Customer says no
    Clerk asks if customer would like to have an account
      Customer says yes
        Clerk clicks add customer, types in required information, customer is added to transaction
      Customer says no
        Clerk leaves customer blank
Clerk clicks pay for transaction and enters customer payment method and amount
Clerk hits submit and transaction is saved within system

## Additional Features
  CRUD on all objects in admin panel
