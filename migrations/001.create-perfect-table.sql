create table perfect(
id integer primary key AUTOINCREMENT,
orderNo integer default 0,
OrderStatus text NOT NULL,
pizzaQty integer default 0,
pizzaPrize integer default 0
);