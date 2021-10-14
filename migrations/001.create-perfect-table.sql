create table perfect(
id integer primary key AUTOINCREMENT,
OrderStatus text not null,
orderNo integer default 0,
pizzaQty integer default 0,
pizzaPrize integer default 0
);